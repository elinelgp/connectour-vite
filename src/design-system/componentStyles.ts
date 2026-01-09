/**
 * Component Styles Mapping
 * Centralise les mappings de tailles et variantes pour tous les composants
 */

import { tokens } from "./tokens";

// ============ BUTTON STYLES ============

export const buttonSizeClasses = {
  sm: {
    padding: `${tokens.spacing.xs} ${tokens.spacing.sm}`,
    fontSize: tokens.typography.fontSizes.sm,
    gap: tokens.spacing.xs,
  },
  md: {
    padding: `${tokens.spacing.sm} ${tokens.spacing.md}`,
    fontSize: tokens.typography.fontSizes.base,
    gap: tokens.spacing.sm,
  },
  lg: {
    padding: `${tokens.spacing.md} ${tokens.spacing.lg}`,
    fontSize: tokens.typography.fontSizes.lg,
    gap: tokens.spacing.md,
  },
} as const;

export const buttonVariantColors = {
  primary: {
    backgroundColor: tokens.colors.primary.main,
    color: "black",
  },
  secondary: {
    backgroundColor: tokens.colors.secondary.main,
    color: "white",
  },
  ghost: {
    backgroundColor: "transparent",
    color: tokens.colors.neutral.brown,
  },
} as const;

// ============ INPUT STYLES ============

export const inputSizeClasses = {
  sm: {
    height: "32px",
    fontSize: tokens.typography.fontSizes.sm,
    paddingTop: "0",
    paddingBottom: "0",
    paddingLeft: tokens.spacing.sm,
    paddingRight: tokens.spacing.sm,
  },
  md: {
    height: "40px",
    fontSize: tokens.typography.fontSizes.base,
    paddingTop: "0",
    paddingBottom: "0",
    paddingLeft: tokens.spacing.md,
    paddingRight: tokens.spacing.md,
  },
  lg: {
    height: "48px",
    fontSize: tokens.typography.fontSizes.lg,
    paddingTop: "0",
    paddingBottom: "0",
    paddingLeft: tokens.spacing.lg,
    paddingRight: tokens.spacing.lg,
  },
};

export const inputVariantColors = {
  default: {
    border: `1px solid ${tokens.colors.neutral.gray}`,
    borderRadius: tokens.borderRadius.md,
  },
  error: {
    border: `1px solid ${tokens.colors.semantic.error}`,
    borderRadius: tokens.borderRadius.md,
  },
  success: {
    border: `1px solid ${tokens.colors.semantic.success}`,
    borderRadius: tokens.borderRadius.md,
  },
};

// ============ CARD STYLES ============

export const cardVariantStyles = {
  default: {
    backgroundColor: tokens.colors.neutral.white,
    boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
  },
  elevated: {
    backgroundColor: tokens.colors.neutral.white,
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
  },
  outlined: {
    backgroundColor: tokens.colors.neutral.white,
    border: `2px solid ${tokens.colors.neutral.gray}`,
  },
} as const;

export const cardBaseStyles = {
  borderRadius: tokens.borderRadius.lg,
  padding: tokens.spacing.lg,
  transition: "all 0.2s ease-in-out",
} as const;

// ============ AVATAR STYLES ============

export const avatarSizeStyles = {
  sm: {
    width: "40px",
    height: "40px",
    fontSize: tokens.typography.fontSizes.sm,
  },
  md: {
    width: "64px",
    height: "64px",
    fontSize: tokens.typography.fontSizes.lg,
  },
  lg: {
    width: tokens.spacing["5xl"],
    height: tokens.spacing["5xl"],
    fontSize: tokens.typography.fontSizes["2xl"],
  },
} as const;

export const avatarBaseStyles = {
  borderRadius: "50%",
  overflow: "hidden",
  background: `linear-gradient(to bottom right, ${tokens.colors.primary.main}, ${tokens.colors.primary.dark})`,
} as const;

// ============ BADGE STYLES ============

export const badgeVariantColors = {
  primary: {
    backgroundColor: tokens.colors.primary.light,
    color: tokens.colors.primary.main,
  },
  secondary: {
    backgroundColor: tokens.colors.secondary.light,
    color: tokens.colors.secondary.main,
  },
  success: {
    backgroundColor: "#dcfce7",
    color: tokens.colors.semantic.success,
  },
  warning: {
    backgroundColor: "#fef3c7",
    color: tokens.colors.semantic.warning,
  },
  error: {
    backgroundColor: "#fee2e2",
    color: tokens.colors.semantic.error,
  },
} as const;

export const badgeBaseStyles = {
  display: "inline-flex",
  alignItems: "center",
  padding: `${tokens.spacing.xs} ${tokens.spacing.sm}`,
  borderRadius: tokens.borderRadius.full,
  fontSize: tokens.typography.fontSizes.xs,
  fontWeight: tokens.typography.fontWeights.medium,
} as const;
