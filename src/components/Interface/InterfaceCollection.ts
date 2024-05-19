import { OverridableStringUnion } from "@mui/types";
import {
  AlertColor,
  AlertPropsColorOverrides,
} from "@mui/material/Alert";

export interface Anime {
  id: string;
  title: string;
  synopsis: string | null;
  genre: string | null;
  aired: String | null;
  episodes: number | null;
  popularity: number | null;
  ranked: number | null;
  score: number | null;
  img_url: string | null;
}

export interface UserFeature {
  user:  number;
  firstName: string | null;
  lastName: string | null;
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


