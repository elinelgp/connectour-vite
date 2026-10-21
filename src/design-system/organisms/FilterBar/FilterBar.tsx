import React from "react";
import { Search, RotateCcw, MapPin, Users, Building2 } from "lucide-react";
import { Card } from "../../atoms/Card";
import { Button } from "../../atoms/Button";
import { Input } from "../../atoms/Input";
import { Select } from "../../atoms/Select";
import { FilterBarProps } from "./FilterBar.types";
import { VenueType } from "../../../domain";

const CAPACITY_RANGES = [
  { value: "0-100", label: "Jusqu'à 100 places" },
  { value: "100-300", label: "100 à 300 places" },
  { value: "300+", label: "300 places et plus" },
];

export const FilterBar: React.FC<FilterBarProps> = ({
  location = "",
  capacity = "",
  type = "",
  startDate = "",
  endDate = "",
  onLocationChange,
  onCapacityChange,
  onTypeChange,
  onStartDateChange,
  onEndDateChange,
  onSearch,
  onReset,
  isSearching = false,
  searchLabel = "Rechercher",
  resetLabel = "Effacer",
  className = "",
  children,
}) => {
  const today = new Date().toISOString().split("T")[0];

  return (
    <Card
      variant="elevated"
      className={["w-full overflow-visible", className].filter(Boolean).join(" ")}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 items-end">
        <div className="lg:col-span-1">
          <Input
            label="Localisation"
            leftIcon={<MapPin className="h-4 w-4" />}
            value={location}
            onChange={(event) => onLocationChange?.(event.target.value)}
            placeholder="Paris, Lyon..."
            fullWidth
          />
        </div>

        <div className="lg:col-span-1">
          <Select
            label="Capacité"
            leftIcon={<Users className="h-4 w-4" />}
            value={capacity}
            onChange={(event) => onCapacityChange?.(event.target.value)}
            options={CAPACITY_RANGES}
            placeholder="Toutes"
            fullWidth
          />
        </div>

        <div className="lg:col-span-1">
          <Select
            label="Type de salle"
            leftIcon={<Building2 className="h-4 w-4" />}
            value={type}
            onChange={(event) => onTypeChange?.(event.target.value as VenueType | "")}
            options={Object.values(VenueType).map((t) => ({ value: t, label: t }))}
            placeholder="Tous"
            fullWidth
          />
        </div>

        <div className="lg:col-span-2 flex gap-2 min-w-0">
          <div className="min-w-0 flex-1">
            <Input
              label="Date de début"
              type="date"
              min={today}
              lang="fr"
              value={startDate}
              onChange={(event) => onStartDateChange?.(event.target.value)}
              fullWidth
            />
          </div>
          <div className="min-w-0 flex-1">
            <Input
              label="Date de fin"
              type="date"
              min={startDate || today}
              lang="fr"
              value={endDate}
              onChange={(event) => onEndDateChange?.(event.target.value)}
              fullWidth
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-2 mt-4">
        <div className="lg:col-span-1 flex gap-2 flex-shrink-0">
          <Button variant="primary" onClick={onSearch} loading={isSearching}>
            <span className="flex items-center gap-2">
              <Search className="h-4 w-4" />
              {searchLabel}
            </span>
          </Button>
          <Button variant="ghost" onClick={onReset} disabled={isSearching}>
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
