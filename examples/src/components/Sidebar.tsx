import React from "react";

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
  return (
    <div
      style={{
        width: 200,
        borderRight: "1px solid #e0e0e0",
        height: "100%",
        overflowY: "auto",
        backgroundColor: "#fff",
      }}
    >
      <div
        style={{
          height: 60,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderBottom: "1px solid #e0e0e0",
          fontSize: 20,
          fontWeight: "bold",
          color: "#5470c6",
        }}
      >
        HudX Charts
      </div>
      <div style={{ padding: "10px 0" }}>
        {categories.map((cat) => (
          <div
            key={cat.key}
            onClick={() => onSelect(cat.key)}
            style={{
              padding: "12px 24px",
              cursor: "pointer",
              color: activeCategory === cat.key ? "#5470c6" : "#333",
              backgroundColor:
                activeCategory === cat.key ? "#f0f5ff" : "transparent",
              fontWeight: activeCategory === cat.key ? "bold" : "normal",
              display: "flex",
              alignItems: "center",
              gap: 10,
              fontSize: 14,
            }}
          >
            {/* Placeholder for icon */}
            <span
              style={{
                width: 4,
                height: 4,
                borderRadius: "50%",
                backgroundColor:
                  activeCategory === cat.key ? "#5470c6" : "#ccc",
              }}
            />
            {cat.label}
          </div>
        ))}
      </div>
    </div>
  );
};
