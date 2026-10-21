import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { SearchVenuesPage } from "./SearchVenuesPage";
import { Venue, VenueType } from "../../domain";
import { useVenues } from "../../hooks";

vi.mock("../../hooks/useVenues", () => ({
  useVenues: vi.fn(),
}));

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

describe("SearchVenuesPage", () => {
  beforeEach(() => {
    vi.mocked(useVenues).mockReturnValue({
      venues: [
        makeVenue({ name: "Le Bikini", city: "Toulouse", capacity: 180 }),
        makeVenue({ name: "La Manufacture", city: "Avignon", capacity: 100 }),
      ],
      loading: false,
      error: null,
    } as ReturnType<typeof useVenues>);
  });

  afterEach(() => vi.clearAllMocks());

  it("affiche toutes les salles au chargement initial", () => {
    render(<SearchVenuesPage />);
    expect(screen.getByText("Le Bikini")).toBeInTheDocument();
    expect(screen.getByText("La Manufacture")).toBeInTheDocument();
  });

  it("filtre les résultats après avoir saisi une localisation et cliqué sur Rechercher", () => {
    render(<SearchVenuesPage />);
    fireEvent.change(screen.getByLabelText("Localisation"), { target: { value: "Toulouse" } });
    fireEvent.click(screen.getByRole("button", { name: /rechercher/i }));
    expect(screen.getByText("Le Bikini")).toBeInTheDocument();
  });

  it("ne filtre pas tant que Rechercher n'a pas été cliqué", () => {
    render(<SearchVenuesPage />);
    fireEvent.change(screen.getByLabelText("Localisation"), { target: { value: "Toulouse" } });
    expect(screen.getByText("La Manufacture")).toBeInTheDocument();
  });

  it("affiche l'EmptyState quand aucune salle ne correspond", () => {
    render(<SearchVenuesPage />);
    fireEvent.change(screen.getByLabelText("Localisation"), { target: { value: "Paris" } });
    fireEvent.click(screen.getByRole("button", { name: /rechercher/i }));
    expect(screen.getByText("Aucune salle ne correspond à ces critères")).toBeInTheDocument();
  });

  it("réinitialise les filtres et les résultats au clic sur Effacer", () => {
    render(<SearchVenuesPage />);
    fireEvent.change(screen.getByLabelText("Localisation"), { target: { value: "Toulouse" } });
    fireEvent.click(screen.getByRole("button", { name: /rechercher/i }));
    fireEvent.click(screen.getByRole("button", { name: /effacer/i }));
    expect(screen.getByLabelText("Localisation")).toHaveValue("");
    expect(screen.getByText("La Manufacture")).toBeInTheDocument();
  });

  it("affiche un état de chargement quand loading est true", () => {
    vi.mocked(useVenues).mockReturnValue({
      venues: [],
      loading: true,
      error: null,
    } as unknown as ReturnType<typeof useVenues>);
    render(<SearchVenuesPage />);
    expect(screen.getByText("Chargement des salles...")).toBeInTheDocument();
  });

  it("affiche l'erreur si useVenues en retourne une", () => {
    vi.mocked(useVenues).mockReturnValue({
      venues: [],
      loading: false,
      error: "Erreur lors du chargement des venues",
    } as unknown as ReturnType<typeof useVenues>);
    render(<SearchVenuesPage />);
    expect(screen.getByText("Une erreur est survenue")).toBeInTheDocument();
  });
});
