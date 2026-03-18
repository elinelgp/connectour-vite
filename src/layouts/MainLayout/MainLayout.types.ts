export type ActiveTab = "home" | "messages" | "notifications" | "profile";

export interface MainLayoutProps {
  /**
   * @default 'home'
   */
  activeTab?: ActiveTab;

  onTabChange?: (tab: ActiveTab) => void;
}
