import type { Meta, StoryObj } from '@storybook/react';
import { Card } from './Card';
import { Music } from 'lucide-react';

/**
 * Le composant Card est un conteneur versatile.
 * 
 * ## Quand l'utiliser ?
 * - Grouper du contenu lié
 * - Afficher des informations structurées
 * - Créer des layouts modulaires
 * - Éléments cliquables
 */
const meta = {
  title: 'Design System/Atoms/Card',
  component: Card,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Un conteneur flexible avec différentes élévations et styles.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'elevated', 'outlined'],
      description: 'Style visuel de la carte',
      table: {
        type: { summary: 'default | elevated | outlined' },
        defaultValue: { summary: 'default' },
      },
    },
    children: {
      control: 'text',
      description: 'Contenu de la carte',
    },
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

// Variantes
export const Default: Story = {
  args: {
    variant: 'default',
    children: 'This is a default card',
  },
};

export const Elevated: Story = {
  args: {
    variant: 'elevated',
    children: 'This is an elevated card with shadow',
  },
};

export const Outlined: Story = {
  args: {
    variant: 'outlined',
    children: 'This is an outlined card with border',
  },
};

// Avec contenu riche
export const WithRichContent: Story = {
  args: {
    variant: 'elevated',
    children: (
      <div>
        <h3 className="text-lg font-semibold mb-2">Card Title</h3>
        <p className="text-gray-600">
          This card contains rich content with multiple elements.
        </p>
      </div>
    ),
  },
};

// Cliquable
export const Clickable: Story = {
  args: {
    variant: 'elevated',
    onClick: () => alert('Card clicked!'),
    children: (
      <div>
        <h3 className="text-lg font-semibold mb-2">Clickable Card</h3>
        <p className="text-gray-600">Click me!</p>
      </div>
    ),
  },
};

// Avec icône
export const WithIcon: Story = {
  args: {
    variant: 'elevated',
    children: (
      <div className="flex items-start gap-3">
        <div className="w-12 h-12 bg-[#FF9F5A] rounded-xl flex items-center justify-center">
          <Music className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-1">Artists</h3>
          <p className="text-sm text-gray-600">
            Find and connect with musicians
          </p>
        </div>
      </div>
    ),
  },
};

