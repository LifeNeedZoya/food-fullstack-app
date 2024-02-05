"use client";
import { Container, Grid, Stack, Typography, Link } from "@mui/material";

import React, { ChangeEvent } from "react";

import { Button as CustomButton, Input } from "@/components";

interface IStepProps {
  handleThirdStep: () => void;
  handleChangeInput: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const StepThree = ({
  handleThirdStep,
  handleChangeInput,
}: IStepProps) => {
  const centerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const BigGridStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "48px",
    padding: "32px",
    width: "500px",
    boxSizing: "border-box",
  };

  const firstGridStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: 28,
    fontWeight: 700,
  };

  return (
    <Container sx={centerStyle}>
      <Grid container sx={BigGridStyle}>
        <Grid item sx={firstGridStyle}>
          Шинэ нууц үг зохиох
        </Grid>
        <Grid item>
          <Input
            name="password"
            label="Нууц үг "
            placeholder="Шинэ нууц үгээ оруулна уу"
            showPassword
            onChange={handleChangeInput}
          />
          <Input
            name="rePassword"
            label="Нууц үг давтах"
            placeholder="Нууц үг адилхан байх ёстой"
            showPassword
            onChange={handleChangeInput}
          />
        </Grid>
        <Grid item width="100%">
          <CustomButton
            label="Үргэлжлүүлэх"
            btnType="contained"
            onClick={handleThirdStep}
          />
        </Grid>
      </Grid>
    </Container>
  );
};
