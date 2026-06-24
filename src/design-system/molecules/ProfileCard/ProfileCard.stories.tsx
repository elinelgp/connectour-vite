import type { Meta, StoryObj } from "@storybook/react";
import { ProfileCard } from "./ProfileCard";

const meta = {
  title: "Design System/Molecules/ProfileCard",
  component: ProfileCard,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "Carte de profil réutilisable pour présenter un artiste ou un profil utilisateur.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    name: { control: "text" },
    type: { control: "text" },
    location: { control: "text" },
    rating: { control: "number" },
    genre: { control: "text" },
    avatarUrl: { control: "text" },
  },
} satisfies Meta<typeof ProfileCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: "Mina Laurent",
    type: "Artiste",
    location: "Paris, 10e",
    rating: 4.8,
    genre: "hard rock",
    avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80",
  },
};
