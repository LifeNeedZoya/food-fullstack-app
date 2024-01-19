"use client";
import * as React from "react";
import { AnchorHTMLAttributes } from "react";

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
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";

import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";

import { green } from "@mui/material/colors";

import Image from "next/image";

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
      sx={{ width: anchor === "right" || anchor === "left" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {["All mail", "Trash", "Spam"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

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
              {(["right"] as const).map((anchor) => (
                <React.Fragment key={anchor}>
                  <Button onClick={toggleDrawer(anchor, true)}>
                    <ShoppingBasket />
                    <Typography sx={{ color: "black", fontWeight: 900 }}>
                      Сагс
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
