import { FoodCard } from "@/components";
import { CategoryContext } from "@/context/CategoryContext";
import { FoodContext } from "@/context/FoodProvider";
import { Box, Button, Container, Grid, Skeleton } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";

export const MenuPage = () => {
  const { categories, HandleClickCategory, chosenCategory } =
    useContext(CategoryContext);

  const { foodData, isLoading } = useContext(FoodContext);

  return (
    <Container>
      <Grid container>
        <Grid
          item
          container
          sx={{ gridTemplateRows: "repeat(6, 1fr)" }}
          justifyContent={"space-evenly"}
          gridRow={6}
        >
          {categories.map((e, i) => (
            <Grid item key={i} gridRow={6}>
              <Button
                variant="contained"
                color={e._id === chosenCategory ? "success" : "secondary"}
                sx={{ borderRadius: 6, width: 185 }}
                onClick={() => HandleClickCategory(e._id)}
              >
                {e.name}
              </Button>
            </Grid>
          ))}
        </Grid>
        <Grid item>
          <Grid container display={`flex`} direction={"row"}>
            {isLoading && (
              <>
                <Skeleton width="80%" />
                <Skeleton width="60%" />
              </>
            )}
            {foodData
              ?.filter((food: any) => food.category._id === chosenCategory)
              .map((food: any, i) => (
                <FoodCard key={i} {...food} />
              ))}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};
