import type { Meta, StoryObj } from "@storybook/react";
import { VenueCard } from "./VenueCard";

const meta = {
  title: "Design System/Molecules/VenueCard",
  component: VenueCard,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Carte de salle pour l’écran de recherche avec informations essentielles et CTA de contact.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    name: { control: "text" },
    location: { control: "text" },
    capacity: { control: "number" },
    genres: { control: "object" },
    responseTime: { control: "text" },
    avatarUrl: { control: "text" },
  },
} satisfies Meta<typeof VenueCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: "Le Petit Echo",
    location: "Paris, 11e",
    capacity: 180,
    genres: ["rock", "metal", "punk"],
    responseTime: "Réponse en 2h",
    avatarUrl:
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=300&q=80",
    onContact: () => console.log("Contact venue"),
  },
};

export const WithoutContact: Story = {
  args: {
    name: "La Scène Moderne",
    location: "Lyon",
    capacity: 90,
    genres: ["rock", "metal"],
  },
};
