import { Box, Grid, IconButton, Stack, Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import DrawerList from "@/components/navbar/Header/DrawerList";

export const RightView = () => {
  const router = useRouter();

  return (
    <Box>
      <Box alignItems={"center"} gap={3}>
        <IconButton>
          <CurrencyExchangeIcon color="success" fontSize="large" />
        </IconButton>
        <Box>
          <Typography component="p" variant="subtitle2">
            Алхам 2
          </Typography>
          <Typography component="p">Захиалга баталгаажуулах</Typography>
          <Typography variant="body2" component="p" sx={{ color: "#0468C8" }}>
            Хүлээгдэж байна
          </Typography>
        </Box>
        <Box>
          <DrawerList />
        </Box>
      </Box>
    </Box>
  );
};
