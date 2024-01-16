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
  const NavDatas = [
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
            gap={5}
          >
            <Image
              src="/assets/Logos/Pinecone-logo.png"
              width={50}
              height={50}
              alt="logo"
            />
            {NavDatas.map((data, i) => {
              return (
                <Typography key={i} variant="subtitle1" fontFamily={"fantasy"}>
                  {data.name}
                </Typography>
              );
            })}
          </Grid>
          <Grid item display="flex" alignItems="center" gap={5}>
            <TextField
              id="outlined-basic"
              label="Хайх"
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
            />
            <Button>
              <Link display="flex">
                <ShoppingBasket />
                <Typography>Сагс</Typography>
              </Link>
            </Button>
            <Button>
              <Link display="flex">
                <Person />
                <Typography>Нэвтрэх</Typography>
              </Link>
            </Button>
          </Grid>
        </Grid>
      </Container>
    </main>
  );
};

export default Header;
