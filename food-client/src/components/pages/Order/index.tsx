"use client";
import { Container, Grid } from "@mui/material";
import Image from "next/image";
import React, { useContext } from "react";
import { LeftView } from "./Left-view";
import { RightView } from "./Right-view";

export const OrderPage = () => {
  return (
    <Grid container justifyContent={"center"} gap={40}>
      <Grid item xs={3}>
        <LeftView />
      </Grid>
      <Grid item xs={3}>
        <RightView />
      </Grid>
    </Grid>
  );
};
