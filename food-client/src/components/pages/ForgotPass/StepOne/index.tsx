"use client";
import { Container, Grid, Stack, Typography, Link } from "@mui/material";

import React from "react";

import { Button as CustomButton, Input } from "@/components";
import { useRouter } from "next/navigation";

export const StepOne = () => {
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
  return (
    <Container sx={centerStyle}>
      <Grid container sx={BigGridStyle}>
        <Grid item sx={{ fontSize: 28, fontWeight: 700 }}>
          Нууц үг сэргээх
        </Grid>
        <Grid item>
          <Input label="Имэйл" placeholder="Имэйл хаягаа оруулна уу" />
        </Grid>
        <Grid item width="100%">
          <CustomButton
            label="Үргэлжлүүлэх"
            btnType="contained"
            onClick={() => router.push("/forgotPass/firstStep")}
          />
        </Grid>
      </Grid>
    </Container>
  );
};
