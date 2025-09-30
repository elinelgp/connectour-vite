import { Dayjs } from "dayjs";

export type Option = {
  id: string;
  organizer: string;
  availabilityId: string;
  venueId: string;
  venueName: string;
  date: Dayjs;
};
