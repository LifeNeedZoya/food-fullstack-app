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
  Button,
  Container,
  Divider,
  Grid,
  Link,
  Typography,
} from "@mui/material";
import { pink } from "@mui/material/colors";

import Image from "next/image";

export default function Footer() {
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
    <main
      style={{
        background: "#18b551",
        position: "fixed",
        width: "100%",
        bottom: 0,
        paddingTop: 60,
        paddingBottom: 60,
      }}
    >
      <Image
        src="/assets/Logos/footer-bg.svg"
        alt="bg"
        fill={true}
        style={{
          height: "100%",
          width: "100%",
          position: "absolute",
          zIndex: 1000,
        }}
      />
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
                  fontWeight: 700,
                  color: "white",
                }}
              >
                Food Delivery
              </Typography>
            </Grid>
          </Grid>
          <Grid item display={"flex"} sx={centerStyle} style={{ gap: "40px" }}>
            {FooterDatas.map((data, i) => {
              return (
                <Link key={i}>
                  <Typography color={"white"} variant="h6">
                    {data.name}
                  </Typography>
                </Link>
              );
            })}
          </Grid>
          <Grid item container sx={centerStyle}>
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
    </main>
  );
}
