import { Table, Typography } from "@mui/joy"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import dayjs from "dayjs"
import "dayjs/locale/fr"
import { Availability } from "../types/availability"

export function AvailabilitySimpleGrid(
  availabilitiesProps: AvailabilityGridProps,
): JSX.Element {
 
  return (
    <Table aria-label="basic table">
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="fr">
        <thead>
          <tr>
            <th style={{ width: "25%" }}>Artiste</th>
            <th style={{ width: "25%" }}>Zones</th>
            <th style={{ width: "25%" }}>Date de début</th>
            <th style={{ width: "25%" }}>Date de fin</th>
          </tr>
        </thead>
        <tbody>
          {availabilitiesProps.availabilities.map(
            (availability: Availability) => (
                <tr key={availability.id}>
                  <td>
                    <Typography  color="primary">{availability.artistName}</Typography>
                  </td>
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
            ),
          )}
        </tbody>
      </LocalizationProvider>
    </Table>
  );
}

export type AvailabilityGridProps = {
  availabilities: Availability[];
  updateState: () => void;
};
