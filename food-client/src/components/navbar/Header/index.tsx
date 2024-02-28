"use client";
import React, { useContext, useState } from "react";

import { Search, Person } from "@mui/icons-material";

import {
  Grid,
  Typography,
  TextField,
  InputAdornment,
  Link,
  Container,
  Button,
  Drawer,
  Box,
  Badge,
} from "@mui/material";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import Image from "next/image";

import { usePathname, useRouter } from "next/navigation";
import { UserContext } from "@/context/AuthProvider";
import { BasketContext } from "@/context/BasketProvider";
import DrawerList from "./DrawerList";

const Header = () => {
  const { loggedUser, loggedToken } = useContext(UserContext);
  const { basketFoods } = useContext(BasketContext);

  const [open, setOpen] = useState(false);
  const isActive = usePathname();
  const router = useRouter();

  const routes = [
    { name: "НҮҮР", path: "/" },
    { name: "ХООЛНЫ ЦЭС", path: "/menu" },
    { name: "ЗАХИАЛГА", path: "/order" },
  ];

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const sum = 8000;

  // basketFoods
  //   .map((food: any) => food?.foodId?.price * food?.count)
  //   .reduce((prev, next) => prev + next, 0);

  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 420,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    borderRadius: "20px",
  };

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
              <Link
                key={i}
                variant="subtitle1"
                sx={{
                  fontWeight: 900,
                  color: `${isActive === data.path ? "green" : "black"}`,
                  textDecoration: "none",
                }}
                href={data.path}
              >
                {data.name}
              </Link>
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
          <Button
            sx={{ color: "black", fontWeight: 900, fontSize: 16 }}
            onClick={toggleDrawer(true)}
          >
            Сагс
            <Badge
              badgeContent={basketFoods?.length}
              color="success"
              sx={{ marginLeft: 3 }}
            >
              <ShoppingBasketIcon />
            </Badge>
          </Button>
          <Drawer
            open={open}
            onClose={toggleDrawer(false)}
            sx={{ marginBottom: 4 }}
          >
            <Grid
              sx={{ width: 600 }}
              onClick={() => toggleDrawer!(true)}
              marginBottom={8}
              flexDirection={"row"}
            >
              <DrawerList />
              <Grid container gridRow={2} gridColumn={1}>
                <Box
                  fontWeight={500}
                  fontSize={20}
                  sx={{ width: "40%" }}
                  textAlign={"center"}
                >
                  <Typography>Нийт төлөх дүн</Typography>
                  <Typography fontSize={25} color="green">
                    80000₮
                  </Typography>
                </Box>
                <Button
                  variant="contained"
                  color="success"
                  onClick={() => router.push("/order")}
                  sx={{ width: "40%" }}
                >
                  Захиалах
                </Button>
              </Grid>
            </Grid>
          </Drawer>
          {!loggedToken ? (
            <Button
              onClick={() => router.push("/login")}
              sx={{ fontWeight: 900, marginLeft: 2, color: "black" }}
            >
              <Person />
              Нэвтрэх
            </Button>
          ) : (
            <Button
              onClick={() => router.push("/userProfile")}
              sx={{ fontWeight: 900, marginLeft: 2 }}
              color="success"
            >
              <Person />
              {loggedUser?.name}
            </Button>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default Header;
