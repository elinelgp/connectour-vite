import React from "react";
import { Search } from "lucide-react";
import { Input } from "../../atoms/Input";
import { HeaderProps } from "./Header.types";

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
        bg-gradient-to-b from-[#FF9F5A] to-[#ff8a3d]
        rounded-b-3xl
        px-4 sm:px-6 md:px-8
        pt-6 sm:pt-8 md:pt-10
        pb-5 sm:pb-6 md:pb-8
        overflow-hidden
      "
    >
      {/* Titre et sous-titre */}
      <div className="mb-5 sm:mb-6 md:mb-8 max-w-full">
        <h1 className="text-white text-xl sm:text-2xl md:text-3xl font-bold mb-1 sm:mb-2 break-words leading-tight">
          {title}
        </h1>
        <p className="text-[#8B5A2B] sm:text-sm md:text-base max-w-full break-words leading-relaxed pr-2">
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
