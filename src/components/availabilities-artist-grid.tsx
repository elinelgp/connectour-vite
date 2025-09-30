import { Table, Typography } from "@mui/joy";
import dayjs from "dayjs";
//import { rejectOption, validateOption } from "../services/artist-service";
import { Availability } from "../types/availability";
import { AvailabilityGridProps } from "./availabilities-simple-grid";

export function AvailabilityArtistGrid(
  availabilitiesProps: AvailabilityGridProps,
): JSX.Element {
  return (
    <Table aria-label="basic table">
      <thead>
        <tr>
          <th style={{ width: "33%" }}>Zones</th>
          <th style={{ width: "33%" }}>Date de début</th>
          <th style={{ width: "33%" }}>Date de fin</th>
        </tr>
      </thead>
      <tbody>
        {availabilitiesProps.availabilities.map(
          (availability: Availability) => (
            <>
              <tr key={availability.id}>
                <td>
                  <Typography  color="primary">
                    {availability.zones.join(', ')}
                  </Typography>
                </td>
                <td>
                  <Typography  color="primary">
                    {dayjs(availability.startDate).format("DD/MM/YYYY")}
                  </Typography>
                </td>
                <td>
                  <Typography  color="primary">
                    {dayjs(availability.endDate).format("DD/MM/YYYY")}
                  </Typography>
                </td>
              </tr>
            </>
          ),
        )}
      </tbody>
    </Table>
  );
}

