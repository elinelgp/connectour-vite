import type { Meta, StoryObj } from "@storybook/react";
import { EmptyState } from "./EmptyState";
import { Button } from "../Button";
import { SearchX, Inbox, UserCircle2 } from "lucide-react";

const meta = {
  title: "Design System/Atoms/EmptyState",
  component: EmptyState,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof EmptyState>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Full: Story = {
  args: {
    variant: "full",
    icon: <SearchX className="h-7 w-7" />,
    title: "0 salle trouvée",
    subtitle: "Essayez une autre période ou élargissez votre zone de recherche.",
    action: <Button variant="secondary">Réessayer</Button>,
  },
};

export const Compact: Story = {
  args: {
    variant: "compact",
    icon: <Inbox className="h-5 w-5" />,
    title: "Aucune demande reçue",
    subtitle: "Les nouvelles demandes apparaîtront ici.",
  },
};

export const ProfileIncomplete: Story = {
  args: {
    variant: "full",
    icon: <UserCircle2 className="h-7 w-7" />,
    title: "Profil non complété",
    subtitle: "Ajoutez vos informations pour pouvoir recevoir des demandes pertinentes.",
    action: <Button>Compléter mon profil</Button>,
  },
};
