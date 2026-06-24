export const colors = {
  primary: {
    main: "#FF9F5A",
    muted: "#ff8a3d",
    dark: "#8B5A2B",
    light: "#FFF4E6",
    contrast: "#FFFFFF",
  },
  secondary: {
    main: "#4A7E7E",
    muted: "#365c5cff",
    dark: "#2a4a4a",
    light: "#E8F4F4",
    contrast: "#FFFFFF",
  },
  neutral: {
    gray: "#E5E5E5",
    lightGray: "#F9FAFB",
    white: "#FFFFFF",
    black: "#000000",
  },
  accent: {
    yellow: "#FBBF24",
    green: "#A8C997",
    red: "#EF4444",
  },
  semantic: {
    success: "#10B981",
    warning: "#fb9724",
    error: "#c13434",
    info: "#3B82F6",
  },
  status: {
    draft: "#9CA3AF",
    published: "#3B82F6",
    ongoing: "#22C55E",
    pending: "#FBBF24",
    confirmed: "#10B981",
    completed: "#22C55E",
    cancelled: "#EF4444",
    noShow: "#B91C1C",
  },
} as const;

export type ColorToken = typeof colors;
