import type { Meta, StoryObj } from "@storybook/react";
import { UserTypeCard } from "./UserTypeCard";
import { Music4, Building2 } from "lucide-react";

const meta = {
  title: "Design System/Molecules/UserTypeCard",
  component: UserTypeCard,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Carte de choix de type d’utilisateur pour les parcours d’onboarding ou de sélection.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    title: { control: "text" },
    description: { control: "text" },
    iconColor: { control: "select", options: ["primary", "secondary"] },
  },
} satisfies Meta<typeof UserTypeCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Artist: Story = {
  args: {
    title: "Je suis artiste",
    description: "Je cherche des salles et des opportunités de performance.",
    icon: Music4,
  },
};

export const Venue: Story = {
  args: {
    title: "Je représente une salle",
    description: "Je souhaite recevoir des artistes et gérer mes réservations.",
    icon: Building2,
    iconColor: "secondary",
  },
};
