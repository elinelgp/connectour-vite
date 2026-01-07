/**
 * Component Styles Mapping
 * Centralise les mappings de tailles et variantes pour tous les composants
 */

import { tokens } from './tokens';

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
    color: 'black',
  },
  secondary: {
    backgroundColor: tokens.colors.secondary.main,
    color: 'white',
  },
  ghost: {
    backgroundColor: 'transparent',
    color: tokens.colors.neutral.brown,
  },
} as const;

// ============ INPUT STYLES ============

export const inputSizeClasses = {
  sm: { height: '32px', fontSize: '14px', padding: '0 8px' },
  md: { height: '40px', fontSize: '16px', padding: '0 12px' },
  lg: { height: '48px', fontSize: '18px', padding: '0 16px' },
};

export const inputVariantColors = {
  default: {
    border: '1px solid #d1d5db',
  },
  error: {
    border: '1px solid #ef4444',
  },
  success: {
    border: '1px solid #22c55e',
  },
};

