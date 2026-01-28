import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Markdown } from '@storybook/blocks';

type ApiEntry = {
  key: string;
  label: string;
};

const markdownFiles = import.meta.glob('../docs/api/**/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>;

const normalizeLabel = (key: string) => {
  const cleaned = key.replace('../docs/api/', '').replace(/\.md$/, '');
  if (cleaned.endsWith('/README')) {
    return cleaned.replace(/\/README$/, '');
  }
  return cleaned;
};

const stripGroupPrefix = (label: string, prefix: string) => {
  if (!label.startsWith(prefix)) return label;
  const next = label.slice(prefix.length);
  return next.startsWith('/') ? next.slice(1) : next;
};

const getIndentedLabel = (label: string, prefix?: string) => {
  const cleaned = prefix ? stripGroupPrefix(label, prefix) : label;
  const segments = cleaned.split('/').filter(Boolean);
  const depth = Math.max(0, segments.length - 1);
  return { text: cleaned, depth };
};

const useDebounce = <T,>(value: T, delay = 200) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const timer = window.setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => window.clearTimeout(timer);
  }, [value, delay]);
  return debouncedValue;
};

const useDelay = <T,>(value: T, delay = 120) => {
  const [delayedValue, setDelayedValue] = useState(value);
  useEffect(() => {
    const timer = window.setTimeout(() => {
      setDelayedValue(value);
    }, delay);
    return () => window.clearTimeout(timer);
  }, [value, delay]);
  return delayedValue;
};

const resolvePath = (baseDir: string, relativePath: string) => {
  if (relativePath.startsWith('/')) return relativePath;
  const baseParts = baseDir.split('/').filter(Boolean);
  const relParts = relativePath.split('/').filter(Boolean);
  const stack = [...baseParts];
  for (const part of relParts) {
    if (part === '.') continue;
    if (part === '..') {
      stack.pop();
      continue;
    }
    stack.push(part);
  }
  return `/${stack.join('/')}`.replace(/\/\//g, '/');
};

const stripDefinedIn = (markdown: string) => {
  return markdown
    .split('\n')
    .filter((line) => !/^Defined in:\s*/i.test(line.trim()))
    .join('\n');
};

const buildLinkRewriter = (keys: string[]) => {
  const keySet = new Set(keys);
  return (currentKey: string, href: string) => {
    if (!href || href.startsWith('http')) return href;
    if (href.startsWith('mailto:')) return href;
    if (href.startsWith('#')) {
      const anchor = href.slice(1);
      if (!anchor) return href;
      return `#api=${encodeURIComponent(currentKey)}&anchor=${encodeURIComponent(
        anchor,
      )}`;
    }
    if (!href.includes('.md')) return href;
    const [pathPart, anchorPart] = href.split('#');
    const baseDir = currentKey.replace(/[^/]+$/, '');
    const resolvedPath = resolvePath(baseDir, pathPart).replace(
      /^\/?/,
      '',
    );
    const fullPath = resolvedPath.startsWith('..')
      ? resolvedPath
      : `../docs/api/${resolvedPath.replace(/^docs\/api\//, '')}`;
    const targetKey = keySet.has(fullPath)
      ? fullPath
      : keySet.has(`../docs/api/${resolvedPath}`) ? `../docs/api/${resolvedPath}` : '';
    if (!targetKey) return href;
    const nextHash = anchorPart
      ? `#api=${encodeURIComponent(targetKey)}&anchor=${encodeURIComponent(
        anchorPart,
      )}`
      : `#api=${encodeURIComponent(targetKey)}`;
    return nextHash;
  };
};

const transformMarkdown = (
  raw: string,
  currentKey: string,
  rewriteLink: (currentKey: string, href: string) => string,
) => {
  const cleaned = stripDefinedIn(raw);
  return cleaned.replace(/\]\(([^)]+)\)/g, (match, href) => {
    const nextHref = rewriteLink(currentKey, href);
    if (nextHref === href) return match;
    return `](${nextHref})`;
  });
};

const getEntryAnchorId = (key: string) => {
  const cleaned = key
    .replace('../docs/api/', '')
    .replace(/\.md$/, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
  return `api-doc-${cleaned || 'root'}`;
};

const ContentPanel = React.memo(
  ({
    entries,
    entryContentMap,
    onContentClick,
  }: {
    entries: ApiEntry[];
    entryContentMap: Record<string, string>;
    onContentClick: (event: React.MouseEvent<HTMLDivElement>) => void;
  }) => {
    return (
      <div style={{ minWidth: 0 }} onClick={onContentClick}>
        {entries.map((entry) => (
          <section
            key={entry.key}
            id={getEntryAnchorId(entry.key)}
            data-api-key={entry.key}
            style={{ marginBottom: 32 }}
          >
            <Markdown>{entryContentMap[entry.key]}</Markdown>
          </section>
        ))}
      </div>
    );
  },
);

export const ApiDocsBrowser: React.FC = () => {
  const fileKeys = useMemo(() => Object.keys(markdownFiles), []);
  const entries = useMemo<ApiEntry[]>(() => {
    return fileKeys
      .map((key) => ({
        key,
        label: normalizeLabel(key),
      }))
      .sort((a, b) => a.label.localeCompare(b.label));
  }, [fileKeys]);

  const rewriteLink = useMemo(() => buildLinkRewriter(fileKeys), [fileKeys]);

  const rootReadmeKey = useMemo(
    () => fileKeys.find((key) => key === '../docs/api/README.md'),
    [fileKeys],
  );
  const defaultKey = rootReadmeKey || entries[0]?.key;
  const [activeKey, setActiveKey] = useState<string | undefined>(defaultKey);
  const [searchValue, setSearchValue] = useState('');
  const debouncedSearch = useDebounce(searchValue, 200);
  const delayedSearch = useDelay(debouncedSearch, 120);

  const entryContentMap = useMemo(() => {
    const next: Record<string, string> = {};
    for (const key of fileKeys) {
      const raw = markdownFiles[key] || '';
      next[key] = transformMarkdown(raw, key, rewriteLink);
    }
    return next;
  }, [fileKeys, rewriteLink]);

  const groupedEntries = useMemo(() => {
    const readmeEntry = entries.find((entry) => entry.key === rootReadmeKey);
    const renderEntries = entries
      .filter((entry) => entry.label.startsWith('render/'))
      .sort((a, b) => a.label.localeCompare(b.label));
    const chartsEntries = entries
      .filter((entry) => entry.label.startsWith('charts/'))
      .sort((a, b) => a.label.localeCompare(b.label));
    const otherEntries = entries
      .filter(
        (entry) =>
          entry.key !== rootReadmeKey &&
          !entry.label.startsWith('render/') &&
          !entry.label.startsWith('charts/'),
      )
      .sort((a, b) => a.label.localeCompare(b.label));
    return { readmeEntry, renderEntries, chartsEntries, otherEntries };
  }, [entries, rootReadmeKey]);

  const orderedEntries = useMemo(() => {
    const list: ApiEntry[] = [];
    if (groupedEntries.readmeEntry) list.push(groupedEntries.readmeEntry);
    list.push(...groupedEntries.renderEntries);
    list.push(...groupedEntries.chartsEntries);
    list.push(...groupedEntries.otherEntries);
    return list;
  }, [groupedEntries]);

  const matchesKeyword = (entry: ApiEntry, keyword: string) =>
    entry.label.toLowerCase().includes(keyword);

  const listGroups = useMemo(() => {
    const keyword = delayedSearch.trim().toLowerCase();
    const filter = (entry: ApiEntry) =>
      keyword ? matchesKeyword(entry, keyword) : true;
    const overview = groupedEntries.readmeEntry
      ? [groupedEntries.readmeEntry].filter(filter)
      : [];
    const renderItems = groupedEntries.renderEntries.filter(filter);
    const chartsItems = groupedEntries.chartsEntries.filter(filter);
    const otherItems = groupedEntries.otherEntries.filter(filter);
    return {
      overview,
      renderItems,
      chartsItems,
      otherItems,
    };
  }, [groupedEntries, delayedSearch]);

  const scrollToEntry = useCallback((key: string, anchor?: string | null) => {
    const entryId = getEntryAnchorId(key);
    const entryEl = document.getElementById(entryId);
    if (entryEl) {
      entryEl.scrollIntoView({ block: 'start' });
      if (anchor) {
        const anchorEl = entryEl.querySelector(`[id="${anchor}"]`);
        if (anchorEl instanceof HTMLElement) {
          anchorEl.scrollIntoView({ block: 'start' });
        }
      }
    }
  }, []);

  const handleContentClick = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      const target = event.target as HTMLElement;
      const link = target.closest('a') as HTMLAnchorElement | null;
      if (!link) return;
      const href = link.getAttribute('href') || '';
      if (!href.startsWith('#api=')) return;
      event.preventDefault();
      const params = new URLSearchParams(href.replace(/^#/, ''));
      const keyParam = params.get('api');
      const anchorParam = params.get('anchor');
      if (keyParam && markdownFiles[keyParam]) {
        setActiveKey(keyParam);
        setTimeout(() => {
          scrollToEntry(keyParam, anchorParam);
        }, 0);
      }
      window.location.hash = href;
    },
    [scrollToEntry],
  );

  useEffect(() => {
    const applyHash = () => {
      const hash = window.location.hash.replace(/^#/, '');
      if (!hash.startsWith('api=')) return;
      const params = new URLSearchParams(hash);
      const keyParam = params.get('api');
      const anchorParam = params.get('anchor');
      if (keyParam && markdownFiles[keyParam]) {
        setActiveKey(keyParam);
        setTimeout(() => {
          scrollToEntry(keyParam, anchorParam);
        }, 0);
      }
    };
    applyHash();
    window.addEventListener('hashchange', applyHash);
    return () => window.removeEventListener('hashchange', applyHash);
  }, []);

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 1fr) 320px',
        gap: 20,
        alignItems: 'start',
      }}
    >
      <ContentPanel
        entries={orderedEntries}
        entryContentMap={entryContentMap}
        onContentClick={handleContentClick}
      />
      <div
        style={{
          position: 'sticky',
          top: 12,
          height: 'calc(100vh - 24px)',
          display: 'flex',
          flexDirection: 'column',
          border: '1px solid #e5e7eb',
          borderRadius: 8,
          padding: 12,
          background: '#fff',
        }}
      >
        <div style={{ marginBottom: 12, fontWeight: 600 }}>HudX API</div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 8,
          }}
        >
          <a
            href="/?path=/docs/api-overview--docs"
            style={{
              fontSize: 12,
              textDecoration: 'none',
              fontWeight: 600,
            }}
          >
            Back to Home
          </a>
          <div style={{ fontSize: 12, color: '#6b7280' }}>
            Total: {entries.length}
          </div>
        </div>
        <input
          type="search"
          value={searchValue}
          placeholder="Search API"
          onChange={(event) => setSearchValue(event.target.value)}
          style={{
            width: '100%',
            padding: '6px 8px',
            borderRadius: 6,
            border: '1px solid #d1d5db',
          }}
        />
        <div
          style={{
            marginTop: 12,
            flex: 1,
            overflow: 'auto',
            paddingRight: 4,
          }}
        >
          {listGroups.overview.length === 0 &&
            listGroups.renderItems.length === 0 &&
            listGroups.chartsItems.length === 0 &&
            listGroups.otherItems.length === 0 && (
              <div style={{ fontSize: 12, color: '#9ca3af' }}>
                No results found
              </div>
            )}
          {listGroups.overview.length > 0 && (
            <div style={{ marginBottom: 12 }}>
              <div
                style={{
                  fontSize: 12,
                  textTransform: 'uppercase',
                  letterSpacing: 0.6,
                  color: '#6b7280',
                  marginBottom: 6,
                }}
              >
                Overview
              </div>
              {listGroups.overview.map((entry) => {
                const hash = `#api=${encodeURIComponent(entry.key)}`;
                const isActive = entry.key === activeKey;
                return (
                  <div key={entry.key} style={{ marginBottom: 8 }}>
                    <a
                      href={hash}
                      onClick={(event) => {
                        event.preventDefault();
                        setActiveKey(entry.key);
                        scrollToEntry(entry.key, null);
                        window.location.hash = hash;
                      }}
                      style={{
                        display: 'block',
                        color: isActive ? '#111827' : '#374151',
                        fontWeight: isActive ? 600 : 400,
                        textDecoration: 'none',
                      }}
                    >
                      README
                    </a>
                  </div>
                );
              })}
            </div>
          )}
          {listGroups.renderItems.length > 0 && (
            <div style={{ marginBottom: 12 }}>
              <div
                style={{
                  fontSize: 12,
                  textTransform: 'uppercase',
                  letterSpacing: 0.6,
                  color: '#6b7280',
                  marginBottom: 6,
                }}
              >
                Render
              </div>
              {listGroups.renderItems.map((entry) => {
                const hash = `#api=${encodeURIComponent(entry.key)}`;
                const isActive = entry.key === activeKey;
                const { text, depth } = getIndentedLabel(entry.label, 'render');
                return (
                  <div key={entry.key} style={{ marginBottom: 8 }}>
                    <a
                      href={hash}
                      onClick={(event) => {
                        event.preventDefault();
                        setActiveKey(entry.key);
                        scrollToEntry(entry.key, null);
                        window.location.hash = hash;
                      }}
                      style={{
                        display: 'block',
                        color: isActive ? '#111827' : '#374151',
                        fontWeight: isActive ? 600 : 400,
                        textDecoration: 'none',
                        paddingLeft: depth * 12,
                      }}
                    >
                      {text}
                    </a>
                  </div>
                );
              })}
            </div>
          )}
          {listGroups.chartsItems.length > 0 && (
            <div style={{ marginBottom: 12 }}>
              <div
                style={{
                  fontSize: 12,
                  textTransform: 'uppercase',
                  letterSpacing: 0.6,
                  color: '#6b7280',
                  marginBottom: 6,
                }}
              >
                Charts
              </div>
              {listGroups.chartsItems.map((entry) => {
                const hash = `#api=${encodeURIComponent(entry.key)}`;
                const isActive = entry.key === activeKey;
                const { text, depth } = getIndentedLabel(entry.label, 'charts');
                return (
                  <div key={entry.key} style={{ marginBottom: 8 }}>
                    <a
                      href={hash}
                      onClick={(event) => {
                        event.preventDefault();
                        setActiveKey(entry.key);
                        scrollToEntry(entry.key, null);
                        window.location.hash = hash;
                      }}
                      style={{
                        display: 'block',
                        color: isActive ? '#111827' : '#374151',
                        fontWeight: isActive ? 600 : 400,
                        textDecoration: 'none',
                        paddingLeft: depth * 12,
                      }}
                    >
                      {text}
                    </a>
                  </div>
                );
              })}
            </div>
          )}
          {listGroups.otherItems.length > 0 && (
            <div style={{ marginBottom: 12 }}>
              <div
                style={{
                  fontSize: 12,
                  textTransform: 'uppercase',
                  letterSpacing: 0.6,
                  color: '#6b7280',
                  marginBottom: 6,
                }}
              >
                Other
              </div>
              {listGroups.otherItems.map((entry) => {
                const hash = `#api=${encodeURIComponent(entry.key)}`;
                const isActive = entry.key === activeKey;
                const { text, depth } = getIndentedLabel(entry.label);
                return (
                  <div key={entry.key} style={{ marginBottom: 8 }}>
                    <a
                      href={hash}
                      onClick={(event) => {
                        event.preventDefault();
                        setActiveKey(entry.key);
                        scrollToEntry(entry.key, null);
                        window.location.hash = hash;
                      }}
                      style={{
                        display: 'block',
                        color: isActive ? '#111827' : '#374151',
                        fontWeight: isActive ? 600 : 400,
                        textDecoration: 'none',
                        paddingLeft: depth * 12,
                      }}
                    >
                      {text}
                    </a>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
