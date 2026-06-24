import { ReactNode } from "react";

export type EmptyStateVariant = "compact" | "full";

export interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  subtitle?: string;
  action?: ReactNode;
  variant?: EmptyStateVariant;
  className?: string;
}