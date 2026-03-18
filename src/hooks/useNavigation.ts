import { useState, useCallback } from "react";
import { ActiveTab } from "../layouts/MainLayout/MainLayout.types";

export const useNavigation = (initialTab: ActiveTab = "home") => {
  const [activeTab, setActiveTab] = useState<ActiveTab>(initialTab);

  const handleTabChange = useCallback((tab: ActiveTab) => {
    setActiveTab(tab);
    console.log(`Navigating to: ${tab}`);
  }, []);

  return {
    activeTab,
    handleTabChange,
  };
};
