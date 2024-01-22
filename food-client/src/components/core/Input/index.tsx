"use client";

import React, { ChangeEvent, useState } from "react";

import {
  FormControl,
  FormLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
} from "@mui/material";

import { Visibility, VisibilityOff } from "@mui/icons-material";

interface IInputProps {
  placeholder: string;
  label: string;
  showPassword?: boolean;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const Input = ({
  label,
  placeholder,
  showPassword = false,
  onChange,
}: IInputProps) => {
  const [isShowPassword, setIsShowPassword] = useState(showPassword);

  return (
    <FormControl sx={{ marginTop: "16px" }} variant="outlined" fullWidth>
      <FormLabel sx={{ my: "4px", color: "black" }}>{label}</FormLabel>
      <OutlinedInput
        sx={{ backgroundColor: "#ECEDF0", height: "48px" }}
        placeholder={`${placeholder}`}
        type={isShowPassword ? "password" : "text"}
        endAdornment={
          showPassword && (
            <InputAdornment position="end">
              <IconButton
                onClick={() => {
                  setIsShowPassword(!isShowPassword);
                }}
              >
                {isShowPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          )
        }
      />
    </FormControl>
  );
};
