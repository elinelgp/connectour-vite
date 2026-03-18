import type { Meta, StoryObj } from "@storybook/react";
import { Badge } from "./Badge";

const meta = {
  title: "Design System/Atoms/Badge",
  component: Badge,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "Un badge coloré pour afficher des informations contextuelles.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "success"],
      description: "Variante de couleur du badge",
      table: {
        type: { summary: "primary | secondary | success" },
        defaultValue: { summary: "primary" },
      },
    },
    children: {
      control: "text",
      description: "Contenu du badge",
    },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Badge",
    variant: "primary",
  },
};

export const Primary: Story = {
  args: {
    children: "Jazz",
    variant: "primary",
  },
};

export const Secondary: Story = {
  args: {
    children: "Artist",
    variant: "secondary",
  },
};

export const Success: Story = {
  args: {
    children: "Verified",
    variant: "success",
  },
};

export const LongText: Story = {
  args: {
    children: "Professional Tour Manager",
    variant: "primary",
  },
};

export const ShortText: Story = {
  args: {
    children: "New",
    variant: "success",
  },
};
