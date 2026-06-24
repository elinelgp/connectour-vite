import React from "react";
import { Search, RotateCcw, MapPin, Users, Music4, CalendarDays } from "lucide-react";
import { Card } from "../../atoms/Card";
import { Button } from "../../atoms/Button";
import { Input } from "../../atoms/Input";
import { tokens } from "../../tokens";
import { FilterBarProps } from "./FilterBar.types";

export const FilterBar: React.FC<FilterBarProps> = ({
  location = "",
  capacity = "",
  genre = "",
  startDate = "",
  endDate = "",
  period = "",
  onLocationChange,
  onCapacityChange,
  onGenreChange,
  onStartDateChange,
  onEndDateChange,
  onPeriodChange,
  onSearch,
  onReset,
  searchLabel = "Rechercher",
  resetLabel = "Effacer",
  className = "",
  children,
}) => {
  const inputClassName =
    "w-full rounded-full border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:border-orange-300";

  return (
    <Card variant="elevated" className={["w-full", className].filter(Boolean).join(" ")}>
      <div className="flex flex-col gap-3 lg:flex-row lg:items-end">
        <div className="flex-1 text-sm" style={{ color: tokens.colors.primary.dark }}>
          <Input
            label="Localisation"
            labelClassName="text-sm"
            labelStyle={{ color: tokens.colors.primary.dark }}
            leftIcon={<MapPin className="h-4 w-4" />}
            value={location}
            onChange={(event) => onLocationChange?.(event.target.value)}
            placeholder="Paris, Lyon..."
            className={inputClassName}
            fullWidth
          />
        </div>

        <div className="flex-1 text-sm" style={{ color: tokens.colors.primary.dark }}>
          <Input
            label="Capacité"
            labelClassName="text-sm"
            labelStyle={{ color: tokens.colors.primary.dark }}
            leftIcon={<Users className="h-4 w-4" />}
            value={capacity}
            onChange={(event) => onCapacityChange?.(event.target.value)}
            placeholder="80+"
            className={inputClassName}
            fullWidth
          />
        </div>

        <div className="flex-1 text-sm" style={{ color: tokens.colors.primary.dark }}>
          <Input
            label="Genre musical"
            labelClassName="text-sm"
            labelStyle={{ color: tokens.colors.primary.dark }}
            leftIcon={<Music4 className="h-4 w-4" />}
            value={genre}
            onChange={(event) => onGenreChange?.(event.target.value)}
            placeholder="Rock, Metal..."
            className={inputClassName}
            fullWidth
          />
        </div>

        <div className="flex flex-1 flex-col gap-2 sm:flex-row sm:gap-2">
          <div className="flex-1 text-sm" style={{ color: tokens.colors.primary.dark }}>
            <Input
              label="Date de début"
              labelClassName="text-sm"
              labelStyle={{ color: tokens.colors.primary.dark }}
              leftIcon={<CalendarDays className="h-4 w-4" />}
              type="date"
              min={new Date().toISOString().split("T")[0]}
              lang="fr"
              value={startDate || period}
              onChange={(event) => onStartDateChange?.(event.target.value)}
              onBlur={() => onPeriodChange?.(startDate || period)}
              className={inputClassName}
              fullWidth
            />
          </div>

          <div className="flex-1 text-sm" style={{ color: tokens.colors.primary.dark }}>
            <Input
              label="Date de fin"
              labelClassName="text-sm"
              labelStyle={{ color: tokens.colors.primary.dark }}
              leftIcon={<CalendarDays className="h-4 w-4" />}
              type="date"
              min={new Date().toISOString().split("T")[0]}
              lang="fr"
              value={endDate}
              onChange={(event) => onEndDateChange?.(event.target.value)}
              className={inputClassName}
              fullWidth
            />
          </div>
        </div>

        <div className="flex gap-2">
          <Button variant="secondary" onClick={onSearch}>
            <span className="flex items-center gap-2">
              <Search className="h-4 w-4" />
              {searchLabel}
            </span>
          </Button>
          <Button variant="ghost" onClick={onReset}>
            <span className="flex items-center gap-2">
              <RotateCcw className="h-4 w-4" />
              {resetLabel}
            </span>
          </Button>
        </div>
      </div>

      {children ? <div className="mt-4">{children}</div> : null}
    </Card>
  );
};

FilterBar.displayName = "FilterBar";
