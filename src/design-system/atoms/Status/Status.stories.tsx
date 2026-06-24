import type { Meta, StoryObj } from "@storybook/react";
import { Status } from "./Status";
import { BookingStatus, EventStatus } from "../../../domain";

const meta = {
  title: "Design System/Atoms/Status",
  component: Status,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "Badge de statut domain-aware pour les événements et les réservations.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    kind: {
      control: "select",
      options: ["event", "booking"],
      description: "Type de statut à afficher",
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Taille du badge",
    },
  },
} satisfies Meta<typeof Status>;

export default meta;
type Story = StoryObj<typeof meta>;

export const EventDraft: Story = {
  args: {
    kind: "event",
    status: EventStatus.DRAFT,
    size: "md",
  },
};

export const EventPublished: Story = {
  args: {
    kind: "event",
    status: EventStatus.PUBLISHED,
    size: "md",
  },
};

export const EventOngoing: Story = {
  args: {
    kind: "event",
    status: EventStatus.ONGOING,
    size: "md",
  },
};

export const BookingPending: Story = {
  args: {
    kind: "booking",
    status: BookingStatus.PENDING,
    size: "md",
  },
};

export const BookingConfirmed: Story = {
  args: {
    kind: "booking",
    status: BookingStatus.CONFIRMED,
    size: "md",
  },
};

export const Sizes: Story = {
  args: {
    kind: "event",
    status: EventStatus.PUBLISHED,
  },
  render: () => (
    <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
      <Status kind="event" status={EventStatus.PUBLISHED} size="sm" />
      <Status kind="event" status={EventStatus.PUBLISHED} size="md" />
      <Status kind="event" status={EventStatus.PUBLISHED} size="lg" />
    </div>
  ),
};