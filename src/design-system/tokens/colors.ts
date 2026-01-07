export const colors = {
  primary: {
    main: '#FF9F5A',
    dark: '#ff8a3d',
    light: '#FFF4E6',
    contrast: '#FFFFFF'
  },
  secondary: {
    main: '#4A7E7E',
    dark: '#365c5cff',
    light: '#E8F4F4',
    contrast: '#FFFFFF'
  },
  neutral: {
    brown: '#8B5A2B',
    gray: '#E5E5E5',
    lightGray: '#F9FAFB',
    white: '#FFFFFF',
    black: '#000000'
  },
  accent: {
    yellow: '#FBBF24',
    green: '#A8C997',
    red: '#EF4444'
  },
  semantic: {
    success: '#10B981',
    warning: '#FBBF24',
    error: '#EF4444',
    info: '#3B82F6'
  }
} as const;

export type ColorToken = typeof colors;