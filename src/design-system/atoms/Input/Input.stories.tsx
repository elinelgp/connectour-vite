import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './Input';
import { Mail, Search, AlertCircle } from 'lucide-react';

const meta = {
  title: 'Design System/Atoms/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'error', 'success'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    label: {
      control: 'text',
    },
    helperText: {
      control: 'text',
    },
    disabled: {
      control: 'boolean',
    },
    fullWidth: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Email',
    placeholder: 'example@email.com',
  },
};

export const WithLeftIcon: Story = {
  args: {
    label: 'Search',
    placeholder: 'Search...',
    leftIcon: <Search className="w-5 h-5" />,
  },
};

export const WithRightIcon: Story = {
  args: {
    label: 'Email',
    placeholder: 'example@email.com',
    rightIcon: <Mail className="w-5 h-5" />,
  },
};

export const Error: Story = {
  args: {
    label: 'Email',
    placeholder: 'example@email.com',
    variant: 'error',
    helperText: 'Adresse email invalide',
    rightIcon: <AlertCircle className="w-5 h-5 text-red-500" />,
  },
};

export const Success: Story = {
  args: {
    label: 'Email',
    placeholder: 'example@email.com',
    variant: 'success',
    helperText: 'Adresse valide',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Email',
    placeholder: 'example@email.com',
    disabled: true,
  },
};

export const FullWidth: Story = {
  args: {
    label: 'Email',
    placeholder: 'example@email.com',
    fullWidth: true,
  },
  parameters: {
    layout: 'padded',
  },
};
