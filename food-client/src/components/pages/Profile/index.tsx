"use client";
import React, { useContext, useState } from "react";

import {
  Container,
  Grid,
  Typography,
  TextField,
  Paper,
  IconButton,
  Divider,
  Box,
  Button,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import PermPhoneMsgIcon from "@mui/icons-material/PermPhoneMsg";
import MarkunreadIcon from "@mui/icons-material/Markunread";

import Image from "next/image";
import { UserContext } from "@/context/AuthProvider";

interface IUser {
  name: string;
  email: string;
  phoneNumber: number;
}

export const ProfilePage = () => {
  const { loggedUser } = useContext(UserContext);

  const [isClicked, setIsClicked] = useState(false);
  const [changedUser, setChangedUser] = useState({
    name: "",
    phoneNumber: "",
    email: "",
  });

  return (
    <Container>
      <Grid container justifyContent={"center"} gap={5} marginY={"100px"}>
        <Grid alignItems="center" justifyContent="center" item>
          <Image
            src={"/assets/admin.jpg"}
            alt="pic"
            width={200}
            height={200}
            style={{ borderRadius: 100 }}
          />
          <Typography>{loggedUser?.name}</Typography>
        </Grid>
        <Grid
          spacing={5}
          container
          direction={"column"}
          item
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Grid item>
            <Paper
              sx={{
                p: "2px 4px",
                display: "flex",
                alignItems: "center",
                width: 300,
              }}
            >
              <IconButton sx={{ p: "10px" }} aria-label="menu">
                <PersonIcon />
              </IconButton>
              <Box width={"100%"}>
                {!isClicked ? (
                  <Box width={"fullWidth"}>{loggedUser?.name}</Box>
                ) : (
                  <TextField variant="standard" />
                )}
              </Box>
              <IconButton
                type="button"
                sx={{ p: "10px" }}
                aria-label="search"
                onClick={() => setIsClicked(!isClicked)}
              >
                <DriveFileRenameOutlineIcon color="success" />
              </IconButton>
              <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
            </Paper>
          </Grid>
          <Grid item>
            <Paper
              sx={{
                p: "2px 4px",
                display: "flex",
                alignItems: "center",
                width: 300,
              }}
            >
              <IconButton sx={{ p: "10px" }} aria-label="menu">
                <PermPhoneMsgIcon />
              </IconButton>
              <Box width={"100%"}>
                {!isClicked ? (
                  <Box width={"fullWidth"}>8080-8080</Box>
                ) : (
                  <TextField variant="standard" />
                )}
              </Box>
              <IconButton
                type="button"
                sx={{ p: "10px" }}
                aria-label="search"
                onClick={() => setIsClicked(!isClicked)}
              >
                <DriveFileRenameOutlineIcon color="success" />
              </IconButton>
              <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
            </Paper>
          </Grid>
          <Grid item>
            <Paper
              sx={{
                p: "2px 4px",
                display: "flex",
                alignItems: "center",
                width: 300,
              }}
            >
              <IconButton sx={{ p: "10px" }} aria-label="menu">
                <MarkunreadIcon />
              </IconButton>
              <Box width={"100%"}>
                {!isClicked ? (
                  <Box width={"fullWidth"}>{loggedUser?.email}</Box>
                ) : (
                  <TextField variant="standard" />
                )}
              </Box>
              <IconButton
                type="button"
                sx={{ p: "10px" }}
                aria-label="search"
                onClick={() => setIsClicked(!isClicked)}
              >
                <DriveFileRenameOutlineIcon color="success" />
              </IconButton>
              <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
            </Paper>
          </Grid>
        </Grid>
        <Grid width={"300px"} alignItems={"center"}>
          <Button
            variant="contained"
            color="success"
            sx={{ marginBottom: 5, color: "white" }}
            fullWidth
          >
            Success
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};
