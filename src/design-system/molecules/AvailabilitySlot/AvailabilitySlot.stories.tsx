import type { Meta, StoryObj } from "@storybook/react";
import { AvailabilitySlot } from "./AvailabilitySlot";
import { BookingStatus } from "../../../domain";

const meta = {
  title: "Design System/Molecules/AvailabilitySlot",
  component: AvailabilitySlot,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "Bloc de disponibilité réutilisable pour les profils artiste et salle.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    dateRange: { control: "text" },
    location: { control: "text" },
    status: { control: "select", options: Object.values(BookingStatus) },
  },
} satisfies Meta<typeof AvailabilitySlot>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    dateRange: "12-14 juin 2026",
    location: "Paris, 11e",
    status: BookingStatus.CONFIRMED,
    onContact: () => console.log("Contact"),
  },
};

export const Pending: Story = {
  args: {
    dateRange: "20-22 juillet 2026",
    location: "Lyon",
    status: BookingStatus.PENDING,
  },
};
