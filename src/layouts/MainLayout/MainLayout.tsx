import React from "react";
import { Outlet } from "react-router-dom";
import { Home, MessageCircle, Bell, User } from "lucide-react";
import { MainLayoutProps, ActiveTab } from "./MainLayout.types";

export const MainLayout: React.FC<MainLayoutProps> = ({ activeTab = "home", onTabChange }) => {
  const navItems = [
    { id: "home" as ActiveTab, icon: Home, label: "Home" },
    { id: "messages" as ActiveTab, icon: MessageCircle, label: "Messages" },
    { id: "notifications" as ActiveTab, icon: Bell, label: "Alerts", hasNotification: true },
    { id: "profile" as ActiveTab, icon: User, label: "Profile" },
  ];

  return (
    <div className="min-h-screen overflow-x-hidden bg-[var(--color-light-gray)]">
      {/* Main content */}
      <main className="pb-24 overscroll-contain">
        <div className="mx-auto max-w-7xl">
          <Outlet />
        </div>
      </main>

      {/* Bottom navigation (mobile only) */}
      <nav
        className="
          fixed bottom-0 left-0 right-0
          z-50
          bg-white
          border-t border-[#E5E5E5]
          px-4 pt-2 pb-[env(safe-area-inset-bottom)]
          md:hidden
        "
      >
        <div className="flex justify-around items-center max-w-md mx-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => onTabChange?.(item.id)}
                className={`
                  flex flex-col items-center gap-1
                  text-xs
                  transition-colors
                  relative
                  ${isActive ? "text-[#FF9F5A]" : "text-[#5C9C9C]"}
                `}
              >
                <Icon className="w-6 h-6" />

                <span>{item.label}</span>

                {item.hasNotification && (
                  <span className="absolute top-0 right-2 w-2 h-2 bg-[#FBBF24] rounded-full" />
                )}
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
};

MainLayout.displayName = "MainLayout";
