"use client";
import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import { ButtonGroup, Divider, Grid, Stack } from "@mui/material";
import { grey } from "@mui/material/colors";

const style = {
  position: "absolute" as "absolute",
  width: 538,
  height: 182,
  bgcolor: "background.paper",

  p: 4,
  display: "flex",
  gap: "40px",
  margin: "32px",
};

export const BasketCard = ({ name, price, description }) => {
  const [amount, setAmount] = useState(0);
  return (
    <>
      <Divider aria-hidden="true" />
      <Box sx={style}>
        <Image
          src={"/assets/food.jpg"}
          alt="pic"
          width={245}
          height={150}
        ></Image>
        <Stack>
          <Grid>
            <Typography sx={{ fontWeight: 500 }} variant="h5">
              Main Pizza
            </Typography>
            <Typography
              sx={{ fontWeight: 700 }}
              color="#18BA51"
              variant="subtitle1"
            >
              34,800₮
            </Typography>
          </Grid>

          <Grid>
            <Typography
              variant="body2"
              sx={{ background: grey[50], padding: 1, borderRadius: "3px" }}
            >
              Хулуу, төмс, лууван , сонгино, цөцгийн тос, самрын үр
            </Typography>
          </Grid>
          <Grid display={"flex"} flexDirection={"column"} gap={6}>
            <ButtonGroup
              variant="contained"
              aria-label="outlined button group "
              sx={{
                display: "flex",
                justifyContent: "space-between",
                boxShadow: "none",
              }}
            >
              <Button
                sx={{ background: "#18BA51" }}
                onClick={() => {
                  setAmount(amount);
                }}
              >
                -
              </Button>
              <Typography>{amount}</Typography>
              <Button
                sx={{ background: "#18BA51" }}
                onClick={() => setAmount((prev) => prev + 1)}
              >
                +
              </Button>
            </ButtonGroup>
          </Grid>
        </Stack>
      </Box>
    </>
  );
};
