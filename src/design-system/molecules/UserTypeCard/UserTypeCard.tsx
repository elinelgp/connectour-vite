import React from "react";
import { Card } from "../../atoms/Card";
import { UserTypeCardProps } from "./UserTypeCard.types";
import { tokens } from "../../tokens";

export const UserTypeCard: React.FC<UserTypeCardProps> = ({
  title,
  icon: Icon,
  description,
  iconColor = "primary",
  onClick,
}) => {
  const iconColors = {
    primary: tokens.colors.primary.main,
    secondary: tokens.colors.secondary.main,
  };

  return (
    <Card
      variant="elevated"
      onClick={onClick}
      className="text-left p-3 sm:p-4"
      style={{
        backgroundColor: tokens.colors.primary.light,
        border: `1px solid ${tokens.colors.neutral.gray}`,
      }}
    >
      <div
        className="flex items-center justify-center mb-2"
        style={{
          width: "40px",
          height: "40px",
          backgroundColor: tokens.colors.neutral.white,
          borderRadius: tokens.borderRadius.xl,
        }}
      >
        <Icon className="w-5 h-5" style={{ color: iconColors[iconColor] }} />
      </div>
      <h3
        className="font-semibold text-xs sm:text-sm mb-1"
        style={{ color: tokens.colors.neutral.brown }}
      >
        {title}
      </h3>
      <p
        className="text-xs line-clamp-2"
        style={{ color: `${tokens.colors.neutral.brown}b3` }}
      >
        {description}
      </p>
    </Card>
  );
};

UserTypeCard.displayName = "UserTypeCard";
