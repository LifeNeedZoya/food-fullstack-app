import React, { useContext } from "react";

import { Grid, Box } from "@mui/material";
import { BasketContext } from "@/context/BasketProvider";
import { BasketCard } from "@/components";

const DrawerList = () => {
  const { basketFoods } = useContext(BasketContext);

  return (
    <Grid>
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
    </Grid>
  );
};

export default DrawerList;
