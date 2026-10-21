import type { Meta, StoryObj } from "@storybook/react";
import { FeaturedProfiles } from "./FeaturedProfiles";

const meta = {
  title: "Design System/Organisms/FeaturedProfiles",
  component: FeaturedProfiles,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof FeaturedProfiles>;

export default meta;
type Story = StoryObj<typeof meta>;

const profiles = [
  {
    id: "mina-laurent",
    name: "Mina Laurent",
    type: "Artiste",
    location: "Paris, 10e",
    rating: 4.8,
    genre: "Hard rock",
    avatarUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80",
  },
  {
    id: "studio-nova",
    name: "Studio Nova",
    type: "Salle",
    location: "Lyon, 1er",
    rating: 4.6,
    genre: "Concerts live",
  },
  {
    id: "collectif-echo",
    name: "Collectif Echo",
    type: "Artiste",
    location: "Bordeaux",
    rating: 4.9,
    genre: "Electro",
  },
];

export const Default: Story = {
  args: {
    profiles,
  },
};

export const SingleProfile: Story = {
  args: {
    profiles: [profiles[0]],
  },
};
