import { Button, Input } from "@/components";
import { Box, Grid, IconButton, Stack, Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";

export const RightView = () => {
  const router = useRouter();

  return (
    <Box>
      <Box display={"flex"} alignItems={"center"} gap={3}>
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
      </Box>

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
              ₮
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Button onClick={() => router.push("/")} label={"Захиалах"} />
          </Grid>
        </Grid>
      </Stack>
    </Box>
  );
};
