"use client";
import * as React from "react";

import Image from "next/image";
import {
  ButtonGroup,
  Grid,
  Stack,
  Box,
  Button,
  Typography,
  Modal,
} from "@mui/material";

import { grey } from "@mui/material/colors";

const style = {
  position: "absolute" as "absolute",
  top: "30%",
  left: "30%",
  width: 900,
  height: 510,
  bgcolor: "background.paper",
  borderRadius: "20px",
  boxShadow: 24,
  p: 4,
  display: "flex",
  gap: "40px",
  margin: "32px",
};

export const Details = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button
        variant="contained"
        onClick={handleOpen}
        sx={{ background: "success" }}
      >
        Open modal
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Image
            src={"/assets/food.jpg"}
            alt="pic"
            width={480}
            height={480}
          ></Image>
          <Stack spacing={4} marginY={14}>
            <Grid sx={{ marginTop: "40px" }}>
              <Typography
                sx={{ fontWeight: 900 }}
                id="modal-modal-title"
                variant="h4"
                component="h2"
              >
                Main Pizza
              </Typography>
              <Typography
                sx={{ fontWeight: 900 }}
                id="modal-modal-title"
                color="#18BA51"
                variant="h5"
                component="h2"
              >
                34,800₮
              </Typography>
            </Grid>

            <Grid>
              <Typography
                id="modal-modal-description"
                variant="h5"
                sx={{ mt: 2, fontWeight: 800 }}
              >
                Орц
              </Typography>
              <Typography
                variant="body2"
                sx={{ background: grey[100], padding: 3, borderRadius: "3px" }}
              >
                Хулуу, төмс, лууван , сонгино, цөцгийн тос, самрын үр
              </Typography>
            </Grid>
            <Grid display={"flex"} flexDirection={"column"} gap={6}>
              <Typography variant="h6" sx={{ fontWeight: 900 }}>
                Тоо
              </Typography>
              <ButtonGroup
                variant="contained"
                color="success"
                aria-label="outlined button group "
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  boxShadow: "none",
                }}
              >
                <Button>-</Button>
                <Typography>1</Typography>
                <Button>+</Button>
              </ButtonGroup>
              <Button
                variant="contained"
                color="success"
                fullWidth
                size="large"
              >
                Сагслах
              </Button>
            </Grid>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
};
