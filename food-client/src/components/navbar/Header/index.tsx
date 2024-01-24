"use client";
import * as React from "react";

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
  Drawer,
  Box,
} from "@mui/material";

import Image from "next/image";

import { BasketCard } from "@/components";

type Anchor = "right";
const Header = () => {
  const routes = [
    { name: "НҮҮР", path: "/" },
    { name: "ХООЛНЫ ЦЭС", path: "/" },
    { name: "ХҮРГЭЛТИЙН БҮС", path: "/" },
  ];

  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setState({ ...state, [anchor]: open });
    };

  const list = (anchor: Anchor) => (
    <Box
      sx={{
        width: anchor === "right" ? 600 : "auto",
      }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <BasketCard />
    </Box>
  );
  const a: string = "Сагс";

  return (
    <Container>
      <Grid container gridColumn={1} direction={"row"} sx={{ paddingY: 3 }}>
        <Grid
          item
          display="flex"
          alignItems="center"
          justifyContent="space-evenly"
          gap={7}
          xs={12}
          lg={6}
        >
          <Image
            src="/assets/Logos/Pinecone-logo.png"
            width={50}
            height={50}
            alt="logo"
          />
          {routes.map((data, i) => {
            return (
              <Typography key={i} variant="subtitle1" sx={{ fontWeight: 900 }}>
                {data.name}
              </Typography>
            );
          })}
        </Grid>
        <Grid item container direction={"row"} gap={5} xs={12} lg={6}>
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
            {(["right"] as const).map((anchor) => (
              <React.Fragment key={anchor}>
                <Button onClick={toggleDrawer(anchor, true)}>
                  <ShoppingBasket />
                  <Typography sx={{ color: "black", fontWeight: 800 }}>
                    {a}
                  </Typography>
                </Button>
                <Drawer
                  anchor={anchor}
                  open={state[anchor]}
                  onClose={toggleDrawer(anchor, false)}
                >
                  {list(anchor)}
                </Drawer>
              </React.Fragment>
            ))}
          </Link>

          <Button>
            <Person />
            <Typography sx={{ fontWeight: 900, marginLeft: 2 }}>
              Нэвтрэх
            </Typography>
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Header;
