import { Button as MuiButton, Stack } from "@mui/material";
import { ReactNode } from "react";

interface IButtonProps {
  label: ReactNode;
  disabled?: boolean;
  btnType?: "contained" | "outlined" | "text";
  onClick?: () => void;
}

export const Button = ({
  label,
  disabled = false,
  btnType = "contained",
  onClick,
}: IButtonProps) => {
  return (
    <Stack sx={{ width: "100%" }}>
      <MuiButton
        onClick={onClick}
        variant={btnType}
        color="success"
        sx={{
          p: 4,
          height: "48px",
          color:
            btnType === "outlined" || btnType === "text" ? "#18ba51" : "white",
          border: btnType === "outlined" ? 1 : 0,
          borderColor: btnType === "outlined" ? "#18ba51" : "",
        }}
        disabled={disabled}
      >
        {label}
      </MuiButton>
    </Stack>
  );
};
