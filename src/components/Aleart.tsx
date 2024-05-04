import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { OverridableStringUnion } from "@mui/types";
import { AlertColor, AlertPropsColorOverrides } from "@mui/material/Alert";
import { AleartProps } from "./Interface/InterfaceCollection";

interface AleartProperties {
  isAleart: number;
  severity?: AlertColor;
  color?: OverridableStringUnion<AlertColor, AlertPropsColorOverrides>;
  title?: string;
  normalText?: string;
  strongText?: string;
  timeOut?: number;
  setAleartInfo: React.Dispatch<React.SetStateAction<AleartProps>>;
}

const Aleart = ({
  isAleart,
  severity = "success",
  color = "info",
  title = "Success",
  normalText = "",
  strongText = "",
  timeOut = 3000,
  setAleartInfo,
}: AleartProperties) => {
  if (isAleart == 1) {
    setTimeout(() => {
      setAleartInfo({
        isAleart: 0,
      });
    }, timeOut);
  }
  return (
    <>
      {isAleart != 0 && (
        <div
          className={`animate__animated ${
            isAleart == 1 ? "animate__bounceInLeft" : "animate__fadeOutLeft"
          } animate__bounceInLeft alert-box`}
        >
          <Alert
            onClose={() => {
              setAleartInfo({
                isAleart: 0,
              });
            }}
            severity={severity}
            color={color}
          >
            <AlertTitle>{title}</AlertTitle>
            {normalText} — <strong>{strongText}</strong>
          </Alert>
        </div>
      )}
    </>
  );
};

export default Aleart;
