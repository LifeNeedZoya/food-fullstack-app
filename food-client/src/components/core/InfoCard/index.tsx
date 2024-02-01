"use client";
import React from "react";

import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Container,
  Box,
} from "@mui/material";

import { CardTravel } from "@mui/icons-material";

export const InfoCard = ({
  description,
  icon,
  title,
}: {
  icon: string;
  title: string;
  description: string;
}) => {
  return (
    <Card sx={{ maxWidth: 290, margin: 3, borderRadius: "16px" }}>
      <CardMedia sx={{ marginTop: 5, marginLeft: 10 }}>
        <CardTravel color="success" fontSize="large" />
      </CardMedia>
      <CardContent sx={{ boxSizing: "border-box" }}>
        <Typography
          gutterBottom
          variant="h6"
          component="div"
          sx={{ fontWeight: 900, font: 32, fontFamily: "unset" }}
        >
          {title}
        </Typography>
        <Box>
          <Typography
            gutterBottom
            variant="subtitle2"
            component="div"
            sx={{ fontWeight: 400, font: 36, fontFamily: "unset" }}
          >
            {description}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};
