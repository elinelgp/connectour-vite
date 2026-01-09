import React from "react";
import { Search } from "lucide-react";
import { Input } from "../../atoms/Input";
import { HeaderProps } from "./Header.types";
import { tokens } from "../../tokens";

export const Header: React.FC<HeaderProps> = ({
  title,
  subtitle,
  searchValue,
  onSearchChange,
  searchPlaceholder = "Search...",
}) => {
  return (
    <header
      className="
        relative
        w-full
        rounded-b-3xl
        px-4 sm:px-6 md:px-8
        pt-6 sm:pt-8 md:pt-10
        pb-5 sm:pb-6 md:pb-8
        overflow-hidden
      "
      style={{
        background: `linear-gradient(to bottom, ${tokens.colors.primary.main}, ${tokens.colors.primary.dark})`,
      }}
    >
      {/* Titre et sous-titre */}
      <div className="mb-5 sm:mb-6 md:mb-8 max-w-full">
        <h1
          className="text-xl sm:text-2xl md:text-3xl font-bold mb-1 sm:mb-2 break-words leading-tight"
          style={{ color: tokens.colors.neutral.white }}
        >
          {title}
        </h1>
        <p
          className="sm:text-sm md:text-base max-w-full break-words leading-relaxed pr-2"
          style={{ color: tokens.colors.neutral.brown }}
        >
          {subtitle}
        </p>
      </div>

      {/* Barre de recherche */}
      <Input
        fullWidth
        placeholder={searchPlaceholder}
        value={searchValue}
        onChange={(e) => onSearchChange(e.target.value)}
        leftIcon={<Search className="w-5 h-5" />}
        className="bg-white text-gray-800 placeholder:text-gray-400"
      />
    </header>
  );
};

Header.displayName = "Header";
