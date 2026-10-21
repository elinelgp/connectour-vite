import type { Meta, StoryObj } from "@storybook/react";
import { Building2, Music4 } from "lucide-react";
import { UserTypeGrid } from "./UserTypeGrid";

const meta = {
  title: "Design System/Organisms/UserTypeGrid",
  component: UserTypeGrid,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof UserTypeGrid>;

export default meta;
type Story = StoryObj<typeof meta>;

const userTypes = [
  {
    id: "artist",
    title: "Je suis artiste",
    icon: Music4,
    description: "Je cherche des salles et des opportunités de performance.",
    iconColor: "primary" as const,
  },
  {
    id: "venue",
    title: "Je représente une salle",
    icon: Building2,
    description: "Je souhaite recevoir des artistes et gérer mes réservations.",
    iconColor: "secondary" as const,
  },
];

export const Default: Story = {
  args: {
    userTypes,
  },
};

export const ArtistOnly: Story = {
  args: {
    userTypes: [userTypes[0]],
  },
};
