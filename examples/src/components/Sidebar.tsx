import React from 'react';
import { ThemeManager, toRgbaWithOpacity } from 'hudx-render';

interface SidebarProps {
  categories: { key: string; label: string; icon?: React.ReactNode }[];
  activeCategory: string;
  onSelect: (key: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  categories,
  activeCategory,
  onSelect,
}) => {
  const themeObj = ThemeManager.getTheme();
  const ui = themeObj.token as any;
  const border = ui.colorBorderSecondary || themeObj.borderColor;
  const bg = ui.colorFillContainer || themeObj.backgroundColor;
  const primary = ui.colorPrimary || themeObj.seriesColors?.[0] || themeObj.textColor;
  const hoverBg = ui.colorFillHover || ui.colorFillContainerAlt || themeObj.gridColor;

  return (
    <div
      style={{
        width: 200,
        borderRight: `1px solid ${border}`,
        height: '100%',
        overflowY: 'auto',
        backgroundColor: bg,
      }}
    >
      <div
        style={{
          height: 60,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderBottom: `1px solid ${border}`,
          fontSize: 20,
          fontWeight: 'bold',
          color: primary,
        }}
      >
        HudX Charts
      </div>
      <div style={{ padding: '10px 0' }}>
        {categories.map((cat) => (
          <div
            key={cat.key}
            onClick={() => onSelect(cat.key)}
            style={{
              padding: '12px 24px',
              cursor: 'pointer',
              color: activeCategory === cat.key ? primary : themeObj.textColor,
              backgroundColor:
                activeCategory === cat.key
                  ? toRgbaWithOpacity(String(primary), 0.12)
                  : 'transparent',
              fontWeight: activeCategory === cat.key ? 'bold' : 'normal',
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              fontSize: 14,
            }}
            onMouseEnter={(e) => {
              if (activeCategory !== cat.key) {
                e.currentTarget.style.backgroundColor = String(hoverBg);
              }
            }}
            onMouseLeave={(e) => {
              if (activeCategory !== cat.key) {
                e.currentTarget.style.backgroundColor = 'transparent';
              }
            }}
          >
            {/* Placeholder for icon */}
            <span
              style={{
                width: 4,
                height: 4,
                borderRadius: '50%',
                backgroundColor:
                  activeCategory === cat.key ? primary : border,
              }}
            />
            {cat.label}
          </div>
        ))}
      </div>
    </div>
  );
};
