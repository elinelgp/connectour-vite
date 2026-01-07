import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';
import { Heart, Download, Mail } from 'lucide-react';

/**
 * Le composant Button est un élément atomique réutilisable
 * permettant aux utilisateurs d'effectuer des actions.
 * 
 * ## Quand utiliser ce composant ?
 * - Actions primaires (soumission de formulaire, confirmation)
 * - Actions secondaires (annulation, navigation)
 * - Actions légères (ghost variant)
 * 
 * ## Accessibilité
 * - Supporte les attributs ARIA standard
 * - Focus visible avec ring
 * - État désactivé géré automatiquement
 */
const meta = {
  title: 'Design System/Atoms/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Un bouton versatile avec plusieurs variantes et tailles.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'ghost'],
      description: 'Variante visuelle du bouton',
      table: {
        type: { summary: 'primary | secondary | ghost' },
        defaultValue: { summary: 'primary' },
      },
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Taille du bouton',
      table: {
        type: { summary: 'sm | md | lg' },
        defaultValue: { summary: 'md' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Désactiver le bouton',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Afficher en pleine largeur',
    },
    children: {
      control: 'text',
      description: 'Contenu du bouton',
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// Story par défaut
export const Default: Story = {
  args: {
    children: 'Button',
    variant: 'primary',
    size: 'md',
  },
};

// Variantes
export const Primary: Story = {
  args: {
    children: 'Primary Button',
    variant: 'primary',
  },
};

export const Secondary: Story = {
  args: {
    children: 'Secondary Button',
    variant: 'secondary',
  },
};

export const Ghost: Story = {
  args: {
    children: 'Ghost Button',
    variant: 'ghost',
  },
};

// Tailles
export const Small: Story = {
  args: {
    children: 'Small Button',
    size: 'sm',
  },
};

export const Medium: Story = {
  args: {
    children: 'Medium Button',
    size: 'md',
  },
};

export const Large: Story = {
  args: {
    children: 'Large Button',
    size: 'lg',
  },
};

// États
export const Disabled: Story = {
  args: {
    children: 'Disabled Button',
    disabled: true,
  },
};

export const FullWidth: Story = {
  args: {
    children: 'Full Width Button',
    fullWidth: true,
  },
  parameters: {
    layout: 'padded',
  },
};

// Avec icônes
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
    variant: 'secondary',
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


