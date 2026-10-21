import { renderHook } from "@testing-library/react";
import { useVenueSearch } from "./useVenueSearch";
import { Venue, VenueType } from "../domain";
import { describe, expect, it } from "vitest";

function makeVenue(overrides: Partial<ConstructorParameters<typeof Venue>[0]> = {}): Venue {
  return new Venue({
    id: crypto.randomUUID(),
    name: "Salle Test",
    description: "Une salle",
    type: VenueType.CLUB,
    address: "1 rue du Test",
    city: "Nantes",
    country: "France",
    capacity: 150,
    managerId: "manager-1",
    rating: 4,
    reviewCount: 10,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overrides,
  });
}

describe("useVenueSearch", () => {
  const venues = [
    makeVenue({ name: "Le Bikini", city: "Toulouse", capacity: 180, type: VenueType.CLUB }),
    makeVenue({ name: "La Manufacture", city: "Avignon", capacity: 100, type: VenueType.THEATER }),
    makeVenue({ name: "L'Usine", city: "Marseille", capacity: 150, type: VenueType.CLUB }),
    makeVenue({ name: "Le Comptoir", city: "Gap", capacity: 80, type: VenueType.BAR }),
  ];

  it("retourne toutes les salles quand aucun filtre n'est actif", () => {
    const { result } = renderHook(() =>
      useVenueSearch(venues, { location: "", capacity: "", type: "" })
    );
    expect(result.current).toHaveLength(4);
  });

  it("filtre par localisation, insensible à la casse", () => {
    const { result } = renderHook(() =>
      useVenueSearch(venues, { location: "toulouse", capacity: "", type: "" })
    );
    expect(result.current).toHaveLength(1);
    expect(result.current[0].name).toBe("Le Bikini");
  });

  it("filtre par localisation partielle", () => {
    const { result } = renderHook(() =>
      useVenueSearch(venues, { location: "marse", capacity: "", type: "" })
    );
    expect(result.current.map((v) => v.name)).toEqual(["L'Usine"]);
  });

  it.each([
    ["0-100", ["La Manufacture", "Le Comptoir"]],
    ["100-300", ["Le Bikini", "La Manufacture", "L'Usine"]],
    ["300+", []],
  ])("filtre par tranche de capacité %s", (range, expectedNames) => {
    const { result } = renderHook(() =>
      useVenueSearch(venues, { location: "", capacity: range, type: "" })
    );
    expect(result.current.map((v) => v.name).sort()).toEqual([...expectedNames].sort());
  });

  it("filtre par type de salle", () => {
    const { result } = renderHook(() =>
      useVenueSearch(venues, { location: "", capacity: "", type: VenueType.CLUB })
    );
    expect(result.current.map((v) => v.name).sort()).toEqual(["L'Usine", "Le Bikini"].sort());
  });

  it("combine plusieurs filtres à la fois", () => {
    const { result } = renderHook(() =>
      useVenueSearch(venues, { location: "", capacity: "100-300", type: VenueType.CLUB })
    );
    expect(result.current.map((v) => v.name)).toEqual(["Le Bikini", "L'Usine"]);
  });

  it("retourne un tableau vide si aucune salle ne correspond", () => {
    const { result } = renderHook(() =>
      useVenueSearch(venues, { location: "paris", capacity: "", type: "" })
    );
    expect(result.current).toEqual([]);
  });
});
