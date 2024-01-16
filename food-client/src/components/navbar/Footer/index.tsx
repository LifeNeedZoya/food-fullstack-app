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
import { green } from "@mui/material/colors";

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
    <main style={{ background: green[900] }}>
      <Container>
        <Grid container gridRow={1} spacing={8}>
          <Grid item container>
            <Grid xs item sx={centerStyle}>
              <Image
                src="/assets/Logos/Pinecone-logo-white.png"
                width={50}
                height={50}
                alt="logo"
              />
              <Typography
                variant="h6"
                sx={centerStyle}
                style={{ fontFamily: "Poppins", fontWeight: 700 }}
              >
                Food Delivery
              </Typography>
            </Grid>
          </Grid>
          <Grid item display={"flex"} sx={centerStyle} style={{ gap: "40px" }}>
            {FooterDatas.map((data, i) => {
              return (
                <Link key={i}>
                  <Typography variant="h6">{data.name}</Typography>
                </Link>
              );
            })}
          </Grid>
          <Grid item container sx={centerStyle}>
            <Button>
              <Facebook />
            </Button>
            <Button>
              <Instagram />
            </Button>
            <Button>
              <Twitter />
            </Button>
          </Grid>
          <Divider light />
          <Grid sx={centerStyle} item container>
            <Typography variant="subtitle1">
              © 2024 Pinecone Foods LLC
            </Typography>

            <Typography variant="subtitle1">
              Зохиогчийн эрх хуулиар хамгаалагдсан.
            </Typography>
          </Grid>
          <br />
        </Grid>
      </Container>
    </main>
  );
}
