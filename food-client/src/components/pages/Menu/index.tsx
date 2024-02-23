import { FoodCard } from "@/components";
import { CategoryContext } from "@/context/CategoryContext";
import { FoodContext } from "@/context/FoodProvider";
import { Box, Button, Container, Grid, Skeleton } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";

export const MenuPage = () => {
  const { categories } = useContext(CategoryContext);

  const { foodData, isLoading } = useContext(FoodContext);

  const [chosenCategory, setChosenCategory] = useState(
    "65bccbf8cfc2bc3551a49ea4"
  );

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
          {categories.map((e) => (
            <Grid item gridRow={6}>
              <Button
                variant="contained"
                color={e._id === chosenCategory ? "success" : "secondary"}
                sx={{ borderRadius: 6, width: 185 }}
                onClick={() => setChosenCategory(e._id)}
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
              .map((food: any) => (
                <FoodCard {...food} />
              ))}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};
