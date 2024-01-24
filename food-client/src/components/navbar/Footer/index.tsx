"use client";

import {
  Search,
  ShoppingBasket,
  Person,
  Facebook,
  Instagram,
  Twitter,
} from "@mui/icons-material";

import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Link,
  Typography,
} from "@mui/material";

import Image from "next/image";

import { useRouter } from "next/navigation";

export default function Footer() {
  const router = useRouter();
  const FooterDatas = [
    { name: "Нүүр ", path: "/" },
    { name: "Холбоо барих", path: "/" },
    { name: "Хоолны цэс", path: "/" },
    { name: "Үйлчилгээний нөхцөл", path: "/ " },
    { name: "Хүргэлтийн бүс", path: "/ " },
    { name: "Нууцлалын бодлого", path: "/ " },
  ];

  const centerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  return (
    <Box
      style={{
        background: "#18b551",
        width: "100%",
        marginTop: "auto",
        paddingTop: 60,
        paddingBottom: 60,
        backgroundImage: `url(${"/assets/Logos/bg-footer.png"})`,
      }}
    >
      <Container>
        <Grid container gridRow={1} spacing={8}>
          <Grid item container>
            <Grid xs item sx={centerStyle} gap={3}>
              <Image
                src="/assets/Logos/Pinecone-logo-white.png"
                width={50}
                height={50}
                alt="logo"
              />
              <Typography
                variant="h6"
                sx={centerStyle}
                style={{
                  fontFamily: "Poppins",
                  color: "white",
                  fontWeight: 700,
                }}
              >
                Food Delivery
              </Typography>
            </Grid>
          </Grid>
          <Grid
            item
            sx={centerStyle}
            gap={2}
            gridAutoColumns="250px"
            gridAutoFlow="column"
            xs={12}
            flexWrap="wrap"
          >
            {FooterDatas.map((data, i) => (
              <Button onClick={() => router.push(data.path)} key={i}>
                <Typography color="white">{data.name}</Typography>
              </Button>
            ))}
          </Grid>
          <Grid item container sx={centerStyle} xs={12}>
            <Button>
              <Facebook
                sx={{ color: "white", weight: "50px", height: "50px" }}
              />
            </Button>
            <Button>
              <Instagram
                sx={{ color: "white", weight: "50px", height: "50px" }}
              />
            </Button>
            <Button>
              <Twitter
                sx={{ color: "white", weight: "50px", height: "50px" }}
              />
            </Button>
          </Grid>
          <Divider
            light
            sx={{ width: "100%", height: 1, marginY: 6 }}
            component={"button"}
          />
          <Grid
            sx={centerStyle}
            item
            container
            color={"white"}
            gridRow={1}
            flexDirection={"column"}
          >
            <Grid item>
              <Typography variant="subtitle1">
                © 2024 Pinecone Foods LLC
              </Typography>
            </Grid>

            <Grid item>
              <Typography variant="subtitle1">
                Зохиогчийн эрх хуулиар хамгаалагдсан.
              </Typography>
            </Grid>
          </Grid>
          <br />
        </Grid>
      </Container>
    </Box>
  );
}
