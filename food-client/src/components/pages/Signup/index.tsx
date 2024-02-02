import { Button as CustomButton, Input } from "@/components";
import {
  Box,
  Checkbox,
  Container,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import React, { useContext } from "react";

import { UserContext } from "@/context/authContext";

import { useFormik } from "formik";
import * as yup from "yup";

export const SignupPage = () => {
  const { user, signup } = useContext(UserContext);

  const validationSchema = yup.object({
    name: yup.string().required("Нэрээ заавал оруулан уу"),
    email: yup
      .string()
      .max(50, "Имэйл 50С хэтрэхгү")
      .required("Имэйл заавал оруулан уу")
      .email(),
    address: yup.string().required("Хаягаа заавал оруулан уу"),
    password: yup
      .string()
      .required("password заавал оруулан уу")
      .min(6, "password хамгийн багадаа 6 байх ёстой"),
    rePassword: yup
      .string()
      .oneOf([yup.ref("password")], "password хоорондоо адил байх ёстой")
      .required("password заавал оруулан уу")
      .min(6, "password хамгийн багадаа 6 байх ёстой"),
  });

  const formik = useFormik({
    onSubmit: ({
      name,
      email,
      password,
      address,
      avatarImg,
    }: {
      name: string;
      email: string;
      password: string;
      address?: string;
      avatarImg?: string;
      rePassword?: string;
    }) => {
      console.log("Medeelel", name, email, password, address, avatarImg);
      if (signup) {
        signup({ name, email, password, address, avatarImg });
      }
    },
    initialValues: {
      name: user.name,
      email: user.email,
      address: user.address,
      password: user.password || "",
      rePassword: user.rePassword,
      avatarImg: user.avatarImg,
    },
    validateOnChange: false,
    validateOnBlur: false,
    validationSchema,
  });

  const checkBoxLabel = { inputProps: { "aria-label": "Checkbox demo" } };

  const centerStyle = {
    display: "flex",
    justifyContent: "center",
  };

  const BigGridStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    gap: "48px",
    padding: "32px",
    width: "500px",
    boxSizing: "border-box",
  };

  return (
    <Container sx={centerStyle}>
      <Grid container sx={BigGridStyle} width={500}>
        <Grid item sx={{ fontSize: 28, fontWeight: 700 }}>
          Бүртгүүлэх
        </Grid>
        <Grid item>
          <Input
            name="name"
            label="Нэр"
            onChange={formik.handleChange}
            errorText={formik.errors.name}
            value={formik.values.name}
            placeholder="Нэрээ оруулна уу"
          />
          <Input
            name="email"
            placeholder="И-мэйл хаягаа оруулна уу"
            label="И-мэйл"
            onChange={formik.handleChange}
            errorText={formik.errors.email}
            value={formik.values.email}
          />
          <Input
            name="address"
            placeholder="Та хаягаа оруулна уу"
            label="Хаяг"
            onChange={formik.handleChange}
            errorText={formik.errors.address}
            value={formik.values.address}
          />
          <Input
            name="password"
            placeholder="Нууц үгээ оруулна уу"
            label="Нууц үг"
            showPassword
            onChange={formik.handleChange}
            errorText={formik.errors.password}
            value={formik.values.password}
          />
          <Input
            name="rePassword"
            label="Нууц үг давтах"
            placeholder="Нууц үгээ давтана уу"
            showPassword
            onChange={formik.handleChange}
            errorText={formik.errors.rePassword}
            value={formik.values.rePassword}
          />
        </Grid>
        <Grid item width="100%">
          <Stack spacing={4} width="100%">
            <Box display="flex" alignItems="center">
              <Checkbox {...checkBoxLabel} defaultChecked />
              <Typography>Үйлчилгээний нөхцөл зөвшөөрөх</Typography>
            </Box>
            <CustomButton
              label="Бүртгүүлэх"
              btnType="outlined"
              onClick={formik.handleSubmit}
            />
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
};
