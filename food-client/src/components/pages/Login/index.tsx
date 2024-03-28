"use client";

import React, { useContext } from "react";

import { Button as CustomButton, Input } from "@/components";

import { Container, Grid, Link, Stack, Typography } from "@mui/material";
import { UserContext } from "@/context/AuthProvider";

import { useFormik } from "formik";
import * as yup from "yup";
import { useRouter } from "next/navigation";

const validationSchema = yup.object({
  email: yup
    .string()
    .max(50, "Имэйл 50С хэтрэхгү")
    .required("Имэйл заавал оруулан уу")
    .email(),
  password: yup
    .string()
    .required("password заавал оруулан уу")
    .min(6, "password хамгийн багадаа 6 байх ёстой"),
});

export const LoginPage = () => {
  const router = useRouter();

  const { login } = useContext(UserContext);
  const formik = useFormik({
    onSubmit: ({ email, password }: { email: string; password: string }) => {
      login({ email, password });
    },
    initialValues: {
      email: "tserenyanjinb216@gmail.com",
      password: "1234pass",
    },
    validateOnChange: false,
    validateOnBlur: false,
    validationSchema,
  });

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
          <Input
            name="email"
            label="Имэйл"
            value={formik.values.email}
            errorText={formik.errors.email}
            placeholder="Имэйл хаягаа оруулна уу"
            onChange={formik.handleChange}
          />
          <Input
            label="Нууц үг"
            name="password"
            placeholder="Нууц үгээ оруулна уу"
            showPassword
            errorText={formik.errors.password}
            value={formik.values.password}
            onChange={formik.handleChange}
          />
          <Link
            href="/forgotPass"
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
            <CustomButton
              label="Нэвтрэх"
              btnType="contained"
              onClick={() => formik.handleSubmit()}
            />
            <Typography sx={centerStyle}>Эсвэл</Typography>
            <CustomButton
              label="Бүртгүүлэх"
              btnType="outlined"
              onClick={() => router.push("/signup")}
            />
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
};
