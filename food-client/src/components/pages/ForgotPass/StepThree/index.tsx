"use client";
import { Container, Grid, Stack, Typography, Link } from "@mui/material";

import React from "react";

import { Button as CustomButton, Input } from "@/components";
import { useRouter } from "next/navigation";

export const StepThree = () => {
  const router = useRouter();
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
          <Input label="Нууц үг " placeholder="" showPassword />
          <Input label="Нууц үг давтах" placeholder="" showPassword />
        </Grid>
        <Grid item width="100%">
          <CustomButton
            label="Үргэлжлүүлэх"
            btnType="contained"
            onClick={() => router.push("/")}
          />
        </Grid>
      </Grid>
    </Container>
  );
};
