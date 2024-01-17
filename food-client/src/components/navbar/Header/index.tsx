"use client";

import React from "react";

import { Search, ShoppingBasket, Person } from "@mui/icons-material";

import {
  Grid,
  Typography,
  AppBar,
  TextField,
  InputAdornment,
  Link,
  Container,
  Button,
} from "@mui/material";

import { green } from "@mui/material/colors";

import Image from "next/image";

const Header = () => {
  const routes = [
    { name: "НҮҮР", path: "/" },
    { name: "ХООЛНЫ ЦЭС", path: "/" },
    { name: "ХҮРГЭЛТИЙН БҮС", path: "/" },
  ];

  return (
    <main>
      <Container>
        <Grid
          container
          gridRow={1}
          display="flex"
          justifyContent="space-between"
          sx={{ paddingY: 3 }}
        >
          <Grid
            item
            display="flex"
            alignItems="center"
            justifyContent="space-evenly"
            gap={7}
          >
            <Image
              src="/assets/Logos/Pinecone-logo.png"
              width={50}
              height={50}
              alt="logo"
            />
            {routes.map((data, i) => {
              return (
                <Typography
                  key={i}
                  variant="subtitle1"
                  sx={{ fontWeight: 900 }}
                >
                  {data.name}
                </Typography>
              );
            })}
          </Grid>
          <Grid item display="flex" alignItems="center" gap={5}>
            <TextField
              id="outlined-basic"
              label="Хайх"
              size="small"
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
            />

            <Link
              display="flex"
              gap={3}
              underline="none"
              sx={{ color: "black", fontWeight: 900 }}
            >
              <ShoppingBasket />
              <Typography sx={{ fontWeight: 900 }}>Сагс</Typography>
            </Link>

            <Link
              display="flex"
              gap={3}
              underline="none"
              sx={{ color: "black" }}
            >
              <Person />
              <Typography sx={{ fontWeight: 900 }}>Нэвтрэх</Typography>
            </Link>
          </Grid>
        </Grid>
      </Container>
    </main>
  );
};

export default Header;
