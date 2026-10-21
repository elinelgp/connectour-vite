import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";
import { Heart, Download, Mail, Trash2 } from "lucide-react";

const meta = {
  title: "Design System/Atoms/Button",
  component: Button,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Bouton avec variantes, tailles, états disabled/loading, et slots d’icônes (`leftIcon` / `rightIcon`) pour un alignement horizontal fiable.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "ghost"],
      description: "Variante visuelle du bouton",
      table: {
        type: { summary: "primary | secondary | ghost" },
        defaultValue: { summary: "primary" },
      },
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Taille du bouton",
      table: {
        type: { summary: "sm | md | lg" },
        defaultValue: { summary: "md" },
      },
    },
    disabled: {
      control: "boolean",
      description: "Désactive le bouton",
    },
    loading: {
      control: "boolean",
      description: "Affiche un spinner et bloque les clics",
    },
    loadingText: {
      control: "text",
      description: "Texte affiché pendant le chargement",
    },
    fullWidth: {
      control: "boolean",
      description: "Pleine largeur",
    },
    children: {
      control: "text",
      description: "Libellé du bouton",
    },
    leftIcon: {
      control: false,
      description: "Icône à gauche (ReactNode)",
    },
    rightIcon: {
      control: false,
      description: "Icône à droite (ReactNode)",
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Button",
    variant: "primary",
    size: "md",
  },
};

export const Primary: Story = {
  args: {
    children: "Primary Button",
    variant: "primary",
  },
};

export const Secondary: Story = {
  args: {
    children: "Secondary Button",
    variant: "secondary",
  },
};

export const Ghost: Story = {
  args: {
    children: "Ghost Button",
    variant: "ghost",
  },
};

export const Disabled: Story = {
  args: {
    children: "Disabled Button",
    disabled: true,
  },
};

export const Loading: Story = {
  args: {
    children: "Se connecter",
    loading: true,
    loadingText: "Connexion en cours...",
  },
};

export const FullWidth: Story = {
  args: {
    children: "Full Width Button",
    fullWidth: true,
  },
  parameters: {
    layout: "padded",
  },
};

export const WithIcon: Story = {
  args: {
    children: "Like",
    leftIcon: <Heart className="h-5 w-5" />,
  },
};

export const WithIconLeft: Story = {
  args: {
    children: "Download",
    variant: "secondary",
    leftIcon: <Download className="h-5 w-5" />,
  },
};

export const WithIconRight: Story = {
  args: {
    children: "Send Message",
    rightIcon: <Mail className="h-5 w-5" />,
  },
};

export const IconOnly: Story = {
  args: {
    leftIcon: <Trash2 className="h-5 w-5" />,
    "aria-label": "Supprimer",
    variant: "ghost",
  },
};
