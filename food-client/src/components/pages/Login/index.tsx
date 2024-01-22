"use client";

import React from "react";

import { Button as CustomButton, Input } from "@/components";

import { Container, Grid, Link, Stack, Typography } from "@mui/material";

const LoginPage = () => {
  const onClick = () => {
    console.log("aa");
  };

  const centerStyle = {
    display: "flex",
    justifyContent: "center",
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
          Нэвтрэх
        </Grid>
        <Grid item>
          <Input label="Имэйл" placeholder="Имэйл хаягаа оруулна уу" />
          <Input
            label="Нууц үг"
            placeholder="Нууц үгээ оруулна уу"
            showPassword
          />
          <Link
            href="#"
            underline="hover"
            color="black"
            display="flex"
            justifyContent="end"
          >
            Нууц үг сэргээх
          </Link>
        </Grid>
        <Grid item width="100%">
          <Stack spacing={4}>
            <CustomButton label="Нэвтрэх" btnType="contained" />
            <Typography sx={centerStyle}>Эсвэл</Typography>
            <CustomButton label="Бүртгүүлэх" btnType="outlined" />
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
};

export default LoginPage;
