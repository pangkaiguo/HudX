import React from 'react';
import { Markdown } from '@storybook/blocks';
import { useLocale } from '../contexts/LocaleContext';

interface I18nMarkdownProps {
  en: string;
  zh: string;
}

export const I18nMarkdown: React.FC<I18nMarkdownProps> = ({ en, zh }) => {
  const locale = useLocale();
  return <Markdown>{locale === 'zh' ? zh : en}</Markdown>;
};
