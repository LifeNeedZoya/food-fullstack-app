"use client";
import React, { ChangeEvent, useContext, useState } from "react";

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

import Modal from "@mui/material/Modal";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 1000,
  bgcolor: "white",
  boxShadow: 24,
  p: 4,
  borderRadius: "10px",
};

import PersonIcon from "@mui/icons-material/Person";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import PermPhoneMsgIcon from "@mui/icons-material/PermPhoneMsg";
import MarkunreadIcon from "@mui/icons-material/Markunread";
import HistoryIcon from "@mui/icons-material/History";
import LogoutIcon from "@mui/icons-material/Logout";

import Image from "next/image";
import { UserContext } from "@/context/AuthProvider";

interface IUser {
  name: string;
  email: string;
  phoneNumber: number;
}

export const ProfilePage = () => {
  const { loggedUser, orders } = useContext(UserContext);

  const [changedUserData, setChangedUserData] = useState({
    name: "",
    phoneNumber: "",
    email: "",
  });
  const [isNameChanged, setIsNameChanged] = useState(false);
  const [isNumberChanged, setIsNumberChanged] = useState(false);
  const [isEmailChanged, setIsEmailChanged] = useState(false);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setChangedUserData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    console.log("state", e.target.name, e.target.value);
  };

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
          <Typography textAlign={"center"} variant="h4" fontFamily={"serif"}>
            {loggedUser?.name}
          </Typography>
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
                {!isNameChanged ? (
                  <Box width={"fullWidth"}>{loggedUser?.name}</Box>
                ) : (
                  <TextField variant="standard" name="name" />
                )}
              </Box>
              <IconButton
                type="button"
                name="name"
                sx={{ p: "10px" }}
                aria-label="search"
                onClick={() => setIsNameChanged(!isNameChanged)}
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
                {!isNumberChanged ? (
                  <Box width={"fullWidth"}>8080-8080</Box>
                ) : (
                  <TextField variant="standard" name="phoneNumber" />
                )}
              </Box>
              <IconButton
                type="button"
                sx={{ p: "10px" }}
                aria-label="search"
                onClick={() => setIsNumberChanged(!isNumberChanged)}
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
                {!isEmailChanged ? (
                  <Box width={"fullWidth"}>{loggedUser?.email}</Box>
                ) : (
                  <TextField variant="standard" name="email" />
                )}
              </Box>
              <IconButton
                type="button"
                sx={{ p: "10px" }}
                aria-label="search"
                onClick={() => setIsEmailChanged(!isEmailChanged)}
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
            Хадгалах
          </Button>

          <Button
            startIcon={<HistoryIcon />}
            sx={{
              color: "black",
              border: 1,
              borderColor: "gray",
              marginBottom: 3,
            }}
            onClick={handleOpen}
            fullWidth
          >
            Захиалгийн түүх
          </Button>

          <Button
            startIcon={<LogoutIcon />}
            sx={{ color: "black", border: 1, borderColor: "gray" }}
            fullWidth
          >
            Гарах
          </Button>
        </Grid>
      </Grid>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box>
            {orders?.map((order, i) => (
              <Box key={i} sx={{ border: 1 }}>
                <Typography
                  sx={{ background: "success", display: "inline", margin: 3 }}
                >
                  {order.orderNo}
                </Typography>
                <Typography
                  sx={{ borderRadius: 3, padding: 1, background: "green" }}
                  color="white"
                  display={"inline"}
                  margin={6}
                >
                  Payment : {order.payment?.status}
                </Typography>
                <Typography
                  sx={{
                    display: "inline",
                    margin: 3,
                    background: "green",
                    borderRadius: 3,
                    padding: 1,
                    color: "white",
                  }}
                  paddingX={3}
                >
                  Delivery : {order.payment?.status}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Modal>
    </Container>
  );
};
