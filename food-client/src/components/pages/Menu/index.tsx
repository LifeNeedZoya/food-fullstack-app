import { FoodCard } from "@/components";
import { CategoryContext } from "@/context/CategoryContext";
import { FoodContext } from "@/context/FoodProvider";
import { Box, Button, Grid } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";

export const MenuPage = () => {
  const { categories } = useContext(CategoryContext);
  const { foodData } = useContext(FoodContext);

  const [chosenCategory, setChosenCategory] = useState("main course");

  // useEffect(() => {
  //   getCategories();
  //   getFoods();
  // }, []);

  return (
    <Grid container>
      <Grid
        item
        container
        sx={{ gridTemplateRows: "repeat(6, 1fr)" }}
        justifyContent={"space-evenly"}
        gridRow={6}
      >
        {categories.map((e) => (
          <Grid item>
            <Button
              variant="contained"
              color={e.name === chosenCategory ? "success" : "secondary"}
              sx={{ borderRadius: 6, width: 250 }}
              onClick={() => setChosenCategory(e.name)}
            >
              {e.name}
            </Button>
          </Grid>
        ))}
      </Grid>
      <Grid item>h</Grid>
    </Grid>
  );
};
