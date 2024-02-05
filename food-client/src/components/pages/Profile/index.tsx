import { Box, Container, Grid, Stack, Typography, Input } from "@mui/material";

import Image from "next/image";
import React from "react";

export const ProfilePage = () => {
  return (
    <Container>
      <Stack>
        <Grid alignItems="center" justifyContent="center">
          <Image
            src={"/assets/food.jpg"}
            alt="pic"
            width={200}
            height={200}
            style={{ borderRadius: 100 }}
          />
          <Typography>Угтах-Баяр</Typography>
        </Grid>
        <Grid></Grid>
      </Stack>
    </Container>
  );
};
