"use client";
import React, { useContext } from "react";

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

import { BasketContext } from "@/context/BasketProvider";

const style = {
  position: "absolute" as "absolute",
  top: "20%",
  left: "20%",
  width: 900,
  height: 460,
  bgcolor: "background.paper",
  borderRadius: "20px",
  boxShadow: 24,
  p: 4,
  display: "flex",
  gap: "40px",
  margin: "32px",
};

export const Details = ({
  id,
  open,
  handleClose,
  name,
  price,
  image,
  description,
}: {
  id: string;
  open: boolean;
  handleClose: () => void;
  name: string;
  price: string;
  image: string;
  description: string;
}) => {
  const { count, addCount, minusCount, addFood, createBasket, updateBasket } =
    useContext(BasketContext);
  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <img src={image} alt="name" width={480} height={430} />
          <Stack spacing={4} marginY={3} width={"300px"}>
            <Grid>
              <Typography
                sx={{ fontWeight: 900 }}
                id="modal-modal-title"
                variant="h4"
                component="h2"
              >
                {name}
              </Typography>
              <Typography
                sx={{ fontWeight: 900 }}
                id="modal-modal-title"
                color="#18BA51"
                variant="h5"
                component="h2"
              >
                {price}₮
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
                {description}
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
                <Button onClick={minusCount}>-</Button>
                <Typography>{count}</Typography>
                <Button onClick={addCount}>+</Button>
              </ButtonGroup>
              <Button
                variant="contained"
                color="success"
                size="large"
                fullWidth
                onClick={() => addFood(id)}
                onKeyUp={updateBasket}
              >
                Сагслах
              </Button>
            </Grid>
          </Stack>
        </Box>
      </Modal>
    </>
  );
};
