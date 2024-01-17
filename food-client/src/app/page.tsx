"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Image from "next/image";
import { ButtonGroup, Grid } from "@mui/material";

const style = {
  position: "absolute" as "absolute",
  top: "40%",
  left: "30%",
  width: 800,
  height: 400,
  bgcolor: "background.paper",
  borderRadius: "20px",
  boxShadow: 24,
  p: 4,
  display: "flex",
  gap: "50px",
  margin: "32px",
};

const Home = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div>
      <Button onClick={handleOpen}>Open modal</Button>
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
            width={400}
            height={350}
          ></Image>
          <Grid>
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
              <Typography variant="body2">
                Хулуу, төмс, лууван , сонгино, цөцгийн тос, самрын үр
              </Typography>
            </Grid>
            <Grid>
              <Typography>Тоо</Typography>
              <ButtonGroup
                variant="contained"
                aria-label="outlined button group "
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  boxShadow: "none",
                  background: "success",
                }}
              >
                <Button>-</Button>
                <Typography>Two</Typography>
                <Button>+</Button>
              </ButtonGroup>
              <Button variant="contained" fullWidth>
                Сагслах
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
};

export default Home;
