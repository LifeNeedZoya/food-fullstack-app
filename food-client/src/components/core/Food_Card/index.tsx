"use client";
import React from "react";
import Header from "@/components/navbar/Header";
import Footer from "@/components/navbar/Footer";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Container,
  Chip,
  Box,
} from "@mui/material";
import { green } from "@mui/material/colors";

export const Cards = () => {
  return (
    <Container>
      <Card sx={{ maxWidth: 290, margin: 3 }}>
        <CardMedia
          sx={{ height: 200, position: "relative" }}
          image="/assets/food.jpg"
          title="green iguana"
        >
          <Chip
            label="-20%"
            size="medium"
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              background: " #18BA51",
              padding: "4px 16px ",
            }}
          />
        </CardMedia>
        <CardContent sx={{ boxSizing: "border-box" }}>
          <Typography
            gutterBottom
            variant="h6"
            component="div"
            sx={{ fontWeight: 900, font: 32, fontFamily: "unset" }}
          >
            Өглөөний хоол
          </Typography>
          <Box sx={{ display: "flex", gap: "10px" }}>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              color={green[500]}
              sx={{ fontWeight: 900, font: 32, fontFamily: "unset" }}
            >
              4,800₮
            </Typography>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              sx={{
                fontWeight: 600,
                font: 32,
                fontFamily: "unset",
                textDecoration: "line-through",
              }}
            >
              4,800₮
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};
