export interface HeaderProps {
  /**
   * Titre principal
   */
  title: string;

  /**
   * Sous-titre
   */
  subtitle: string;

  /**
   * Valeur de recherche
   */
  searchValue: string;

  /**
   * Callback lors du changement de recherche
   */
  onSearchChange: (value: string) => void;

  /**
   * Placeholder de recherche
   * @default 'Search...'
   */
  searchPlaceholder?: string;
}
