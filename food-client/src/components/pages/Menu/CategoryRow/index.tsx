import { FoodCard } from "@/components";
import { FoodContext } from "@/context/FoodProvider";
import { Box, Button, Grid, Skeleton, Stack, Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";

import React, { useContext, useEffect, useState } from "react";

interface IProps {
  id: string;
  name: string;
  foods: any;
  isLoading: boolean;
}
const CategoryRow = ({ foods, name, id, isLoading }: IProps) => {
  const router = useRouter();

  return (
    <Grid style={{ marginBottom: 6 }} container direction={"column"}>
      <Grid container display={"flex"} justifyContent="space-between">
        <Grid item direction="row" spacing={2}>
          <Typography variant="h5" fontFamily={"monospace"} marginLeft={2}>
            {" "}
            {name}
          </Typography>
        </Grid>
        <Grid item>
          <Button
            onClick={() => router.replace("/menu")}
            sx={{ color: "#18BA51", ml: 2 }}
          >
            Бүгдийг харах
          </Button>
        </Grid>
      </Grid>

      <Grid container display={`flex`} direction={"row"}>
        {isLoading && (
          <>
            <Skeleton width={200} />
            <Skeleton width="60%" />
          </>
        )}
        {foods
          ?.filter((food: any) => food.category._id === id)
          .map((food: any) => (
            <FoodCard {...food} />
          ))}
      </Grid>
    </Grid>
  );
};

export default CategoryRow;
