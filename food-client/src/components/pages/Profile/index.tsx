import {
  Container,
  Grid,
  Stack,
  Typography,
  TextField,
  Paper,
  IconButton,
  InputBase,
  Divider,
  Box,
  Button,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";

import Image from "next/image";
import React, { useState } from "react";

export const ProfilePage = () => {
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
          <Typography>Угтах-Баяр</Typography>
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
                  <Box width={"fullWidth"}>Угтах-Баяр</Box>
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
                <PersonIcon />
              </IconButton>
              <Box width={"100%"}>
                {!isClicked ? (
                  <Box width={"fullWidth"}>Угтах-Баяр</Box>
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
                <PersonIcon />
              </IconButton>
              <Box width={"100%"}>
                {!isClicked ? (
                  <Box width={"fullWidth"}>Угтах-Баяр</Box>
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
