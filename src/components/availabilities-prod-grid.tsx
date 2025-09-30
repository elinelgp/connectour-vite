import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline"
import { IconButton, Stack, Table, Typography } from "@mui/joy"
import dayjs, { Dayjs } from "dayjs"
//import { rejectOption, validateOption } from "../services/artist-service";
import { DatePicker } from "@mui/x-date-pickers"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import "dayjs/locale/fr"
import { useEffect, useState } from "react"
import { createOptionFromAvailability } from "../services/artist-service"
import { Availability } from "../types/availability"
import { AvailabilityGridProps } from "./availabilities-simple-grid"

export function AvailabilityProdGrid(
  availabilitiesProps: AvailabilityGridProps,
): JSX.Element {
  const [hourMap, setHourMap] = useState(new Map());
  const updateMap = (k: string, v: Dayjs) => {
    setHourMap(hourMap.set(k, v));
  };

  // const [order, setOrder] = useState('asc')
  // const [sortKey, setSortKey] = useState(Object.keys(rows[0])[0])
  // const filter = (event: React.ChangeEvent<HTMLInputElement>) => {}
  // const sort = (value: keyof Data[0], order: string) => {}
  // const updateOrder = () => {}

  useEffect(() => {
    availabilitiesProps.availabilities.forEach((availability: Availability) => {
      updateMap(availability.id, availability.startDate);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [availabilitiesProps]);

  return (
    <Table aria-label="basic table">
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="fr">
        <thead>
          <tr>
            <th style={{ width: "20%" }}>Artiste</th>
            <th style={{ width: "20%" }}>Zones</th>
            <th style={{ width: "20%" }}>Date de début</th>
            <th style={{ width: "20%" }}>Date de fin</th>
            <th style={{ width: "20%" }}>Poser une option</th>
          </tr>
        </thead>
        <tbody>
          {availabilitiesProps.availabilities.map(
            (availability: Availability) => (
              <>
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
                  <td>
                    <Stack
                      direction="row"
                      spacing={2}
                      sx={{
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <DatePicker
                        disablePast
                        minDate={availability.startDate}
                        maxDate={availability.endDate}
                        label="Date"
                        value={availability.startDate}
                        onChange={(newValue: Dayjs | null) => {
                          if (newValue) {
                            updateMap(availability.id, newValue);
                          }
                        }}
                      />
                      <IconButton
                        sx={{ mb: 1 }}
                        variant="plain"
                        onClick={() => {
                          createOptionFromAvailability(
                            availability,
                            hourMap.get(availability.id),
                          );
                          availabilitiesProps.updateState();
                          updateMap(availability.id, availability.startDate);
                        }}
                      >
                        <CheckCircleOutlineIcon />
                      </IconButton>
                    </Stack>
                  </td>
                </tr>
              </>
            ),
          )}
        </tbody>
      </LocalizationProvider>
    </Table>
  );
}
