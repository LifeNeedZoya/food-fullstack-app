import React, { useContext } from "react";

import {
  Grid,
  Typography,
  TextField,
  InputAdornment,
  Link,
  Container,
  Button,
  Drawer,
  Box,
  Badge,
  Modal,
  IconButton,
} from "@mui/material";
import { BasketContext } from "@/context/BasketProvider";
import { BasketCard } from "@/components";
import { useRouter } from "next/navigation";

const DrawerList = (toggleDrawer: (newOpen: boolean) => void) => {
  const { basketFoods } = useContext(BasketContext);

  const router = useRouter();
  return (
    <Box
      sx={{ width: 600 }}
      onClick={() => toggleDrawer(true)}
      marginBottom={8}
    >
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
      <Grid container gridRow={2} gridColumn={1}>
        <Box
          fontWeight={500}
          fontSize={20}
          sx={{ width: "40%" }}
          textAlign={"center"}
        >
          <Typography>Нийт төлөх дүн</Typography>
          <Typography fontSize={25} color="green">
            80000₮
          </Typography>
        </Box>
        <Button
          variant="contained"
          color="success"
          onClick={() => router.push("/order")}
          sx={{ width: "40%" }}
        >
          Захиалах
        </Button>
      </Grid>
    </Box>
  );
};

export default DrawerList;
