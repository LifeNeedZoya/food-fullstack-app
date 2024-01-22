"use client";

import { Box, Divider, Grid, Stack, Typography } from "@mui/material";

import Image from "next/image";

const Home = () => {
  return (
    <>
      <Box
        style={{
          marginTop: "30px",
          background: "#18b551",
          backgroundImage: `url(${"/assets/Logos/bg-footer.png"})`,
        }}
      >
        <Grid container gridRow={2} spacing={8}>
          <Grid item xs={12} lg={6}>
            <Stack
              height={"100%"}
              alignItems={"center"}
              justifyContent={"center"}
              color="white"
            >
              <Typography
                sx={{
                  fontSize: 55,
                  fontWeight: 600,
                }}
              >
                Pinecone <br /> Food delivery
              </Typography>
              <Divider light sx={{ width: "300px" }} />
              <Typography fontSize="22px" fontWeight={500}>
                Horem ipsum dolor sit amet, <br /> consectetur adipiscing elit.
              </Typography>
            </Stack>
          </Grid>

          <Grid item xs={12} lg={6}>
            <Stack
              height={"100%"}
              alignItems={"center"}
              justifyContent={"center"}
            >
              <Image
                src="/assets/bg-home.png"
                width={588}
                height={438}
                alt="logo"
              />
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Home;
