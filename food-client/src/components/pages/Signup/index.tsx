import { Button as CustomButton, Input } from "@/components";
import {
  Box,
  Button,
  Checkbox,
  Container,
  Grid,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";

export const SignupPage = () => {
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

  const checkBoxLabel = { inputProps: { "aria-label": "Checkbox demo" } };

  return (
    <Container sx={centerStyle}>
      <Grid container sx={BigGridStyle} width={500}>
        <Grid item sx={{ fontSize: 28, fontWeight: 700 }}>
          Бүртгүүлэх
        </Grid>
        <Grid item>
          <Input placeholder="Нэрээ оруулна уу" label="Нэр" />
          <Input placeholder="И-мэйл хаягаа оруулна уу" label="И-мэйл" />
          <Input placeholder="Та хаягаа оруулна уу" label="Хаяг" />
          <Input
            placeholder="Нууц үгээ оруулна уу"
            label="Нууц үг"
            showPassword
          />
          <Input
            label="Нууц үг давтах"
            placeholder="Нууц үгээ давтана уу"
            showPassword
          />
        </Grid>
        <Grid item width="100%">
          <Stack spacing={4} width="100%">
            <Box display="flex" alignItems="center">
              <Checkbox {...checkBoxLabel} defaultChecked />
              <Typography>Үйлчилгээний нөхцөл зөвшөөрөх</Typography>
            </Box>
            <CustomButton label="Бүртгүүлэх" btnType="outlined" />
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
};
