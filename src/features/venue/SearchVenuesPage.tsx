import React, { useState } from "react";
import { SearchX } from "lucide-react";
import { useVenues } from "../../hooks/useVenues";
import { useVenueSearch, VenueSearchFilters } from "../../hooks/useVenueSearch";
import { VenueCard } from "../../design-system/molecules";
import { FilterBar } from "../../design-system/organisms";
import { EmptyState } from "../../design-system/atoms";

const INITIAL_FILTERS: VenueSearchFilters = { location: "", capacity: "", type: "" };

export const SearchVenuesPage: React.FC = () => {
  const { venues, loading, error } = useVenues();

  const [draftFilters, setDraftFilters] = useState<VenueSearchFilters>(INITIAL_FILTERS);
  const [appliedFilters, setAppliedFilters] = useState<VenueSearchFilters>(INITIAL_FILTERS);

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const results = useVenueSearch(venues, appliedFilters);

  const handleSearch = () => setAppliedFilters(draftFilters);

  const handleReset = () => {
    setDraftFilters(INITIAL_FILTERS);
    setAppliedFilters(INITIAL_FILTERS);
    setStartDate("");
    setEndDate("");
  };

  if (loading) {
    return (
      <div className="p-6 text-center text-sm text-gray-500" role="status" aria-live="polite">
        Chargement des salles...
      </div>
    );
  }

  if (error) {
    return (
      <EmptyState
        icon={<SearchX className="h-6 w-6" />}
        title="Une erreur est survenue"
        subtitle={error}
      />
    );
  }

  return (
    <div className="flex flex-col gap-4 p-6">
      <FilterBar
        location={draftFilters.location}
        capacity={draftFilters.capacity}
        type={draftFilters.type}
        startDate={startDate}
        endDate={endDate}
        onLocationChange={(value) => setDraftFilters((f) => ({ ...f, location: value }))}
        onCapacityChange={(value) => setDraftFilters((f) => ({ ...f, capacity: value }))}
        onTypeChange={(value) =>
          setDraftFilters((f) => ({ ...f, type: value as VenueSearchFilters["type"] }))
        }
        onStartDateChange={setStartDate}
        onEndDateChange={setEndDate}
        onSearch={handleSearch}
        onReset={handleReset}
      />

      <p className="text-sm text-gray-600" role="status" aria-live="polite">
        {results.length} salle{results.length > 1 ? "s" : ""} correspond
        {results.length > 1 ? "ent" : ""} à ta recherche
      </p>

      {results.length === 0 ? (
        <EmptyState
          icon={<SearchX className="h-6 w-6" />}
          title="Aucune salle ne correspond à ces critères"
          subtitle="Essaie d'élargir la zone géographique ou la capacité."
          action={
            <button type="button" onClick={handleReset} className="text-sm font-medium underline">
              Réinitialiser les filtres
            </button>
          }
        />
      ) : (
        <div role="list" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {results.map((venue) => (
            <div role="listitem" key={venue.id}>
              <VenueCard
                name={venue.name}
                location={venue.city}
                capacity={venue.capacity}
                type={venue.type}
                avatarUrl={venue.avatarUrl}
                onContact={() => {
                  // TODO
                }}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

SearchVenuesPage.displayName = "SearchVenuesPage";
