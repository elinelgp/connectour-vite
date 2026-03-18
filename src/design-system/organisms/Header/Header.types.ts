export interface HeaderProps {
  title: string;
  subtitle: string;
  searchValue: string;
  onSearchChange: (value: string) => void;
  /**
   * @default 'Search...'
   */
  searchPlaceholder?: string;
}
