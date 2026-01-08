export type ActiveTab = "home" | "messages" | "notifications" | "profile";

export interface MainLayoutProps {
  /**
   * Onglet actif dans la navigation
   * @default 'home'
   */
  activeTab?: ActiveTab;

  /**
   * Callback lors du changement d'onglet
   */
  onTabChange?: (tab: ActiveTab) => void;
}
