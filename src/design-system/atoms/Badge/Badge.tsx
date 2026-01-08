import React from "react";
import { BadgeProps } from "./Badge.types";
import { badgeBaseStyles, badgeVariantColors } from "../../componentStyles";

export const Badge: React.FC<BadgeProps> = ({ children, variant = "primary", className = "" }) => {
  const badgeClasses = [className].filter(Boolean).join(" ");

  const combinedStyles: React.CSSProperties = {
    ...badgeBaseStyles,
    ...badgeVariantColors[variant],
  };

  return (
    <span className={badgeClasses} style={combinedStyles}>
      {children}
    </span>
  );
};

Badge.displayName = "Badge";
