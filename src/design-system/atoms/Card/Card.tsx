import React from "react";
import { CardProps } from "./Card.types";
import { cardBaseStyles, cardVariantStyles } from "../../componentStyles";

export const Card: React.FC<CardProps> = ({
  children,
  variant = "default",
  onClick,
  className = "",
  ...props
}) => {
  const interactiveStyles = onClick ? "cursor-pointer" : "";

  const cardClasses = [interactiveStyles, className].filter(Boolean).join(" ");

  const combinedStyles: React.CSSProperties = {
    ...cardBaseStyles,
    ...cardVariantStyles[variant],
  };

  return (
    <div
      className={cardClasses}
      style={combinedStyles}
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      {...props}
    >
      {children}
    </div>
  );
};

Card.displayName = "Card";
