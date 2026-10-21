import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { FilterBar } from "./FilterBar";
import { FilterBarProps } from "./FilterBar.types";
import { VenueType } from "../../../domain";

const meta: Meta<typeof FilterBar> = {
  title: "Design System/Organisms/FilterBar",
  component: FilterBar,
  parameters: {
    layout: "padded",
  },
  argTypes: {
    isSearching: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof FilterBar>;

export const Default: Story = {
  args: {
    location: "",
    capacity: "",
    type: "",
    startDate: "",
    endDate: "",
    isSearching: false,
  },
};

export const Prefilled: Story = {
  args: {
    location: "Bordeaux",
    capacity: "100-300",
    type: VenueType.BAR,
    startDate: "2026-10-15",
    endDate: "2026-11-10",
  },
};

export const Searching: Story = {
  args: {
    ...Prefilled.args,
    isSearching: true,
  },
};

function InteractiveFilterBar(args: FilterBarProps) {
  const [filters, setFilters] = useState<Partial<FilterBarProps>>({
    location: "",
    capacity: "",
    type: "",
    startDate: "",
    endDate: "",
  });
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = () => {
    setIsSearching(true);
    setTimeout(() => setIsSearching(false), 1200);
  };

  const handleReset = () => {
    setFilters({ location: "", capacity: "", type: "", startDate: "", endDate: "" });
  };

  return (
    <FilterBar
      {...args}
      {...filters}
      isSearching={isSearching}
      onLocationChange={(value) => setFilters((f) => ({ ...f, location: value }))}
      onCapacityChange={(value) => setFilters((f) => ({ ...f, capacity: value }))}
      onTypeChange={(value) => setFilters((f) => ({ ...f, type: value }))}
      onStartDateChange={(value) => setFilters((f) => ({ ...f, startDate: value }))}
      onEndDateChange={(value) => setFilters((f) => ({ ...f, endDate: value }))}
      onSearch={handleSearch}
      onReset={handleReset}
    />
  );
}

export const Interactive: Story = {
  render: (args) => <InteractiveFilterBar {...args} />,
};
