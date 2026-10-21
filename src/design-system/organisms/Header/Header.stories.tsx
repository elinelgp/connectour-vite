import type { Meta, StoryObj } from "@storybook/react";
import { Header } from "./Header";

const meta = {
  title: "Design System/Organisms/Header",
  component: Header,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {
    title: { control: "text" },
    subtitle: { control: "text" },
    searchValue: { control: "text" },
    searchPlaceholder: { control: "text" },
    onSearchChange: { action: "search changed" },
  },
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "Trouvez votre communauté",
    subtitle: "Découvrez des profils qui partagent vos passions.",
    searchValue: "",
    searchPlaceholder: "Rechercher...",
    onSearchChange: () => {},
  },
};

export const WithSearchValue: Story = {
  args: {
    ...Default.args,
    searchValue: "design",
  },
};
