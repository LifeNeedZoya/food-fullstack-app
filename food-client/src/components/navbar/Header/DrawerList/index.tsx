import React, { useContext } from "react";

import { Button } from "@/components";
import { BasketCard } from "@/components";
import Lottie from "lottie-react";

import { Grid, Box, Stack, Typography } from "@mui/material";

import { BasketContext } from "@/context/BasketProvider";

import { useRouter } from "next/navigation";
import { UserContext } from "@/context/AuthProvider";

import emptyBasketData from "@/../../public/assets/emptyBasket.json";

const DrawerList = () => {
  const { basketFoods, basket } = useContext(BasketContext);
  const router = useRouter();
  const { createOrder } = useContext(BasketContext);

  const handleOrder = () => {
    createOrder(basket, {
      khoroo: "10 Khoroo",
      district: "SBD",
      info: "This is a info",
    });
  };

  const total = basketFoods
    ?.map((e) => e?.foodId?.price)
    ?.reduce((prev, next) => prev! + next!);

  return (
    <Grid>
      {!basket && (
        <Stack height={"200%"} justifyContent={"center"} alignItems={"center"}>
          <Box
            width={200}
            height={200}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <Lottie animationData={emptyBasketData} loop={false} />
          </Box>
          <Typography variant="h6" align="center">
            Хоосон байна
          </Typography>
        </Stack>
      )}
      {basketFoods?.map((e: any, i) => (
        <Box sx={{ marginBottom: 60 }} key={i}>
          <BasketCard
            name={e?.foodId?.name}
            description={e?.foodId?.description}
            price={e?.foodId?.price}
            image={e?.foodId?.image}
            foodCount={e?.count}
            id={e?.foodId?._id}
          />
        </Box>
      ))}
      <Stack my={5} boxShadow={3} gap={10} p={5} borderRadius={2}>
        <Grid container bottom={0} py={10} px={10}>
          <Grid
            item
            xs={6}
            display={"flex"}
            flexDirection={"column"}
            alignItems={"flex-start"}
          >
            <Typography variant="body1" component="h6">
              Нийт төлөх дүн
            </Typography>
            <Typography variant="body1" fontWeight={600} component="h6">
              {total} ₮
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Button onClick={handleOrder} label={"Захиалах"} />
          </Grid>
        </Grid>
      </Stack>
    </Grid>
  );
};

export default DrawerList;
