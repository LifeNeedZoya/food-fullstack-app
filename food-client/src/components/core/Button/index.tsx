"use client";
import { Stack, Button as MuiButton, darken } from "@mui/material";
import React, { ReactNode } from "react";
import { green } from "@mui/material/colors";

interface IButtonProps {
  label: ReactNode;
  disabled?: boolean;
  onclick?: () => void;
  btnType?: "contained" | "outlined";
}

export const Button = ({
  label,
  disabled = false,
  onclick,
  btnType,
}: IButtonProps) => {
  return (
    <Stack>
      <MuiButton
        sx={{
          p: 3,
          border: 1,
          background: "#18ba51",
          "&:hover": {
            background: darken("#18ba51", 0.08),
          },
        }}
        disabled={disabled}
        onClick={onclick}
        variant={btnType}
      >
        {label}
      </MuiButton>
    </Stack>
  );
};
