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

import { styled } from "@mui/material/styles";

import CloudUploadIcon from "@mui/icons-material/CloudUpload";

import Modal from "@mui/material/Modal";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "white",
  boxShadow: 24,
  p: 4,
  borderRadius: "10px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  gap: 5,
  alignItems: "center",
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

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,

  whiteSpace: "nowrap",
  width: 1,
});

export const ProfilePage = () => {
  const { loggedUser, orders, changeUserData, checkPassword } =
    useContext(UserContext);
  const [password, setPassword] = useState<string>();

  const [isNameChanged, setIsNameChanged] = useState(false);
  const [isNumberChanged, setIsNumberChanged] = useState(false);
  const [isEmailChanged, setIsEmailChanged] = useState(false);

  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [changedUserData, setChangedUserData] = useState({
    name: "",
    phoneNumber: "",
    email: "",
  });
  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setChangedUserData({
      ...changedUserData,
      [e.target.name]: e.target.value,
    });
    console.log("state", e.target.name, e.target.value);
    console.log("changed User :", changedUserData);
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
          <Button
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-8}
            startIcon={<DriveFileRenameOutlineIcon color="success" />}
          >
            Зураг солих
            <VisuallyHiddenInput type="file" />
          </Button>
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
                  <TextField
                    variant="standard"
                    name="name"
                    onChange={handleChangeInput}
                  />
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
                  <Box width={"fullWidth"}>{loggedUser?.phoneNumber}</Box>
                ) : (
                  <TextField
                    variant="standard"
                    name="phoneNumber"
                    onChange={handleChangeInput}
                  />
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
                  <TextField
                    variant="standard"
                    name="email"
                    onChange={handleChangeInput}
                  />
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
            onClick={handleOpenModal}
          >
            Хадгалах
          </Button>
          <Modal
            open={openModal}
            onClose={handleCloseModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography variant="h5"> Пасспордоо оруулна уу</Typography>
              <TextField
                placeholder="Пасспордоо оруулна уу"
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
              />
              <Button
                variant="contained"
                color="success"
                sx={{ width: "200px" }}
                onClick={() => (
                  checkPassword(password!), changeUserData(changedUserData)
                )}
              >
                Шалгах
              </Button>
            </Box>
          </Modal>

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
            <Typography
              fontSize={"28px"}
              fontFamily={"sans-serif"}
              alignContent={"center"}
              justifyContent={"center"}
              display={"flex"}
            >
              Захиалгийн түүх
            </Typography>
            {orders?.map((order, i) => (
              <Box
                key={i}
                sx={{
                  marginY: 1,
                  border: 1,
                  borderRadius: "20px",
                  padding: 1,
                  borderColor: "gray",
                }}
              >
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
                <Typography
                  sx={{
                    display: "inline",
                    margin: 3,
                    borderRadius: 3,
                    padding: 1,
                  }}
                  paddingX={3}
                >
                  Total amount : {"40,000₮"}
                </Typography>
                <Typography
                  sx={{
                    display: "inline",
                    margin: 3,
                    borderRadius: 3,
                    padding: 1,
                  }}
                  paddingX={3}
                >
                  ordered Date :
                  {order.payment.paidDate
                    ? order.payment.paidDate
                    : "2024-03-05"}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Modal>
    </Container>
  );
};
