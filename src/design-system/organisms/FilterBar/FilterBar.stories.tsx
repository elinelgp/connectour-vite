import type { Meta, StoryObj } from "@storybook/react";
import { FilterBar } from "./FilterBar";

const meta = {
  title: "Design System/Organisms/FilterBar",
  component: FilterBar,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: "Barre de filtres du cœur de l’écran de recherche avec localisation, capacité, genre et période.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    location: { control: "text" },
    capacity: { control: "text" },
    genre: { control: "text" },
    period: { control: "text" },
  },
} satisfies Meta<typeof FilterBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    location: "Paris",
    capacity: "80",
    genre: "Rock",
    period: "Juin 2026",
    onSearch: () => console.log("Search"),
    onReset: () => console.log("Reset"),
  },
};

export const Empty: Story = {
  args: {},
};
