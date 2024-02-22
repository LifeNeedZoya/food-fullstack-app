"use client";

import {
  Box,
  Container,
  Divider,
  Grid,
  Stack,
  Typography,
} from "@mui/material";

import Image from "next/image";

import { useContext, useEffect } from "react";

import { InfoCard } from "@/components";
import { FoodContext } from "@/context/FoodProvider";
import { CategoryContext } from "@/context/CategoryContext";
import CategoryRow from "../Menu/CategoryRow";

export const HomePage = () => {
  const { foodData, getFoods, isLoading } = useContext(FoodContext);
  const { categories, getCategories } = useContext(CategoryContext);

  const infoArr = [
    {
      icon: "",
      title: "Хүргэлтийн төлөв хянах",
      description: "  Захиалга бэлтгэлийн явцыг хянах",
    },
    {
      icon: "",
      title: "Шуурхай хүргэлт хянах",
      description: "Захиалгийн бэлтгэлийн явцыг хянах",
    },
    {
      icon: "",
      title: "Эрүүл, баталгаат орц",
      description: "Захиалга бэлтгэлийн явцыг хянах",
    },
    {
      icon: "",
      title: "Хоолны өргөн сонголт",
      description: "Захиалга бэлтгэлийн явцыг хянах",
    },
  ];

  useEffect(() => {
    console.log("DDDD++>", foodData);
    getCategories();
    getFoods();
  }, []);
  return (
    <>
      <Box
        style={{
          marginTop: "30px",
          background: "#18b551",
          backgroundImage: `url(${"/assets/Logos/bg-footer.png"})`,
        }}
      >
        <Grid container gridRow={2} spacing={8} height={"788px"} xs={12}>
          <Grid item xs={12} lg={6}>
            <Stack
              height={"100%"}
              alignItems={"center"}
              justifyContent={"center"}
              color="white"
            >
              <Typography
                textAlign={"center"}
                sx={{
                  fontSize: 55,
                  fontWeight: 600,
                }}
              >
                Pinecone <br /> Food delivery
              </Typography>
              <Divider light sx={{ width: "300px", height: "3px" }} />
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
                width={708}
                height={528}
                alt="logo"
              />
            </Stack>
          </Grid>
        </Grid>
      </Box>
      <Container>
        <Grid container flexDirection="row" marginY={"80px"}>
          {infoArr.map((info) => (
            <InfoCard {...info} />
          ))}
        </Grid>
      </Container>
      <Container>
        <Grid container marginY={"80px"} width={"100%"}>
          {categories.map((category) => (
            <Grid key={category.name} item width={"100%"}>
              <CategoryRow
                key={category._id}
                name={category.name}
                id={category._id}
                foods={foodData}
                isLoading={isLoading}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};
