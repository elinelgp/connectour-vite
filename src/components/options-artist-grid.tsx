import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { IconButton, Table, Typography } from "@mui/joy";
import dayjs from "dayjs";
//import { rejectOption, validateOption } from "../services/artist-service";
import { cancelOption, validateOption } from "../services/artist-service";
import { Availability } from "../types/availability";
import { Option } from "../types/option";

export function OptionArtistGrid(optionsProps: OptionGridProps): JSX.Element {
  return (
    <Table aria-label="basic table">
      <thead>
        <tr>
          <th style={{ width: "14%" }}>Région</th>
          <th style={{ width: "14%" }}>Date de début de la disponibilité</th>
          <th style={{ width: "14%" }}>Date de fin de la disponibilité</th>
          <th style={{ width: "14%" }}>Organisateur</th>
          <th style={{ width: "14%" }}>Lieu</th>
          <th style={{ width: "14%" }}>Date de l&apos;option</th>
          <th style={{ width: "14%" }}>Actions</th>
        </tr>
      </thead>
      <tbody>
        {optionsProps.availabilities.map(
          (availability: Availability) =>
            availability.options?.length > 0 && (
              <tr key={availability.id}>
                <td>
                  <Typography color="primary">
                    {availability.zones.reduce(
                      (accumulator: string, currentValue: string) =>
                        currentValue + " " + accumulator,
                      ""
                    )}
                  </Typography>
                </td>
                <td>
                  <Typography color="primary">
                    {dayjs(availability.startDate).format("DD/MM/YYYY")}
                  </Typography>
                </td>
                <td>
                  <Typography color="primary">
                    {dayjs(availability.endDate).format("DD/MM/YYYY")}
                  </Typography>
                </td>
                {availability.options?.map((option: Option) => (
                  <>
                    <td>
                      <Typography color="primary">{option.organizer}</Typography>
                    </td>
                    <td>
                      <Typography color="primary">{option.venueName}</Typography>
                    </td>
                    <td>
                      <Typography color="primary">
                        {dayjs(option.date).format("DD/MM/YYYY")}
                      </Typography>
                    </td>
                    <td>
                      <IconButton
                        sx={{ mb: 1 }}
                        variant="plain"
                        onClick={async () => {
                          await validateOption(option);
                          optionsProps.updateState();
                        }}
                      >
                        <CheckCircleOutlineIcon />
                      </IconButton>
                      <IconButton
                        sx={{ mb: 1 }}
                        variant="plain"
                        onClick={async () => {
                          await cancelOption(option.id);
                          optionsProps.updateState();
                        }}
                      >
                        <CancelIcon />
                      </IconButton>
                    </td>
                  </>
                ))}
              </tr>
            )
        )}
      </tbody>
    </Table>
  );
}

export type OptionGridProps = {
  availabilities: Availability[];
  updateState: () => void;
};
