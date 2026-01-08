import type { Meta, StoryObj } from '@storybook/react';
import { Avatar } from './Avatar';

/**
 * Le composant Avatar affiche une image de profil circulaire.
 * Si aucune image n'est fournie, il affiche l'initiale du nom.
 * 
 * ## Quand l'utiliser ?
 * - Profils utilisateurs
 * - Listes de contacts
 * - Commentaires
 * - Notifications
 */
const meta = {
  title: 'Design System/Atoms/Avatar',
  component: Avatar,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Un avatar circulaire avec support d\'image ou d\'initiale.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Taille de l\'avatar',
      table: {
        type: { summary: 'sm | md | lg' },
        defaultValue: { summary: 'md' },
      },
    },
    src: {
      control: 'text',
      description: 'URL de l\'image',
    },
    alt: {
      control: 'text',
      description: 'Nom de la personne (utilisé pour l\'initiale)',
    },
  },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

// Avec initiale (pas d'image)
export const Default: Story = {
  args: {
    alt: 'John Doe',
    size: 'md',
  },
};

// Avec image
export const WithImage: Story = {
  args: {
    src: 'https://i.pravatar.cc/150?img=1',
    alt: 'Sarah Johnson',
    size: 'md',
  },
};

// Tailles
export const Small: Story = {
  args: {
    alt: 'Jane Smith',
    size: 'sm',
  },
};

export const Medium: Story = {
  args: {
    alt: 'John Doe',
    size: 'md',
  },
};

export const Large: Story = {
  args: {
    alt: 'Bob Wilson',
    size: 'lg',
  },
};

// Avec images de différentes tailles
export const SmallWithImage: Story = {
  args: {
    src: 'https://i.pravatar.cc/150?img=2',
    alt: 'Alice Brown',
    size: 'sm',
  },
};

export const LargeWithImage: Story = {
  args: {
    src: 'https://i.pravatar.cc/150?img=3',
    alt: 'Charlie Davis',
    size: 'lg',
  },
};

