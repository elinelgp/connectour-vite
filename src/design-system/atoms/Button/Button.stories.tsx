import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";
import { Heart, Download, Mail } from "lucide-react";

const meta = {
  title: "Design System/Atoms/Button",
  component: Button,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Un bouton versatile avec plusieurs variantes et tailles. Gère les états disabled et loading pour les formulaires et les appels asynchrones.",
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
      description: "Désactive le bouton pour les formulaires incomplets",
    },
    loading: {
      control: "boolean",
      description: "Affiche un état de chargement et empêche les clics répétés",
    },
    loadingText: {
      control: "text",
      description: "Texte affiché pendant le chargement",
    },
    fullWidth: {
      control: "boolean",
      description: "Afficher en pleine largeur",
    },
    children: {
      control: "text",
      description: "Contenu du bouton",
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
    children: (
      <>
        <Heart className="w-5 h-5" />
        Like
      </>
    ),
  },
};

export const WithIconLeft: Story = {
  args: {
    children: (
      <>
        <Download className="w-5 h-5" />
        Download
      </>
    ),
    variant: "secondary",
  },
};

export const WithIconRight: Story = {
  args: {
    children: (
      <>
        Send Message
        <Mail className="w-5 h-5" />
      </>
    ),
  },
};