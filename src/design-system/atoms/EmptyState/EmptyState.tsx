import React from "react";
import { EmptyStateProps } from "./EmptyState.types";

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  subtitle,
  action,
  variant = "full",
  className = "",
}) => {
  const isCompact = variant === "compact";

  const containerClasses = [
    "flex flex-col items-center justify-center text-center",
    isCompact ? "gap-2 py-4" : "gap-4 py-8 md:py-12",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const iconContainerClasses = [
    "flex items-center justify-center rounded-full bg-[#FFF4E6] text-[#8B5A2B] shadow-sm",
    isCompact ? "h-10 w-10" : "h-14 w-14 md:h-16 md:w-16",
  ]
    .filter(Boolean)
    .join(" ");

  const titleClasses = [
    "font-semibold text-black",
    isCompact ? "text-base" : "text-lg md:text-xl",
  ]
    .filter(Boolean)
    .join(" ");

  const subtitleClasses = [
    "max-w-md text-sm leading-6 text-gray-600",
    isCompact ? "text-sm" : "text-base",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={containerClasses} role="status" aria-live="polite">
      {icon ? (
        <div className={iconContainerClasses} aria-hidden="true">
          <div className={isCompact ? "scale-90" : "scale-100"}>{icon}</div>
        </div>
      ) : null}

      <div className="flex flex-col items-center gap-2">
        <h3 className={titleClasses}>{title}</h3>
        {subtitle ? <p className={subtitleClasses}>{subtitle}</p> : null}
      </div>

      {action ? <div className={isCompact ? "mt-1" : "mt-2"}>{action}</div> : null}
    </div>
  );
};

EmptyState.displayName = "EmptyState";