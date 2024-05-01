import { OverridableStringUnion } from "@mui/types";
import {
  AlertColor,
  AlertPropsColorOverrides,
} from "@mui/material/Alert";

export interface Movie {
  id: string;
  title: string;
  director: string;
  genre: String[];
  description: string;
  poster: string;
}

export interface UserFeature {
  user:  number;
  firstName: string | null;
  lastName: string | null;
  lastLatitude: number | null;
  lastLongitude: number | null;
  photoUrl: string | null;
}

export interface AleartProps {
  isAleart: number;
  severity?: AlertColor;
  color?: OverridableStringUnion<AlertColor, AlertPropsColorOverrides>;
  title?: string;
  normalText?: string;
  strongText?: string;
  timeOut?: number;
}


