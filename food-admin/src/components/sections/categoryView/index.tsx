"use client";

import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Unstable_Grid2";
import Typography from "@mui/material/Typography";

import Iconify from "@/components/iconify";

import CategoryCard from "./category-card";
import CategorySort from "./category-sort";
import CategorySearch from "./category-search";

// ----------------------------------------------------------------------
import { faker } from "@faker-js/faker";
import CategoryModal from "./category-modal";
import { ChangeEvent, useEffect, useState } from "react";
import myAxios from "@/utils/axios";
import axios from "axios";
// ----------------------------------------------------------------------

const CATEGORY_TITLES = [
  "Whiteboard Templates",
  "Tesla Cybertruck-inspired",
  "Designify Agency",
  "✨What is Done is Done ✨",
  "Fresh Prince",
  "Six Socks Studio",
  "vincenzo de cotiis",
];

// export const categories = [...Array(CATEGORY_TITLES.length)].map(
//   (_, index) => ({
//     id: faker.string.uuid(),
//     cover: `/assets/images/covers/cover_${index + 1}.jpg`,
//     title: CATEGORY_TITLES[index + 1],
//     createdAt: faker.date.past(),
//   })
// );

// ----------------------------------------------------------------------

export default function CategoryView() {
  const [open, setOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [file, setFile] = useState<File | null>(null);

  const [newCategory, setNewCategory] = useState({
    name: "",
    description: "",
  });

  const handleClose = () => {
    setOpen(() => false);
  };

  const handleOpen = () => {
    setOpen(() => true);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFile(e.currentTarget.files![0]);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setNewCategory({ ...newCategory, [name]: value });
    console.log("PutData", newCategory);
  };

  const createCategory = async () => {
    try {
      const formData = new FormData();
      formData.set("image", file!);
      formData.set("name", newCategory.name);
      formData.set("description", newCategory.description);
      console.log("image", file!);
      console.log("name", newCategory.name);
      console.log("description", newCategory.description);
      console.log("FFFFFFFF==>", formData);
      const data = await axios.post("http://localhost:8080/category", formData);
      console.log("successfull added category", data);
      console.log("data", formData);
    } catch (error) {}
  };

  const getCategory = async () => {
    try {
      const {
        data: { categories },
      } = await axios.get("http://localhost:8080/category");
      console.log("categoriesthat", myAxios);
      setCategories(categories);
      console.log("get categories successfully");
    } catch (error: any) {
      alert("Get Error - " + error.message);
    }
  };

  useEffect(() => {
    getCategory();
  }, []);
  return (
    <Container>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={5}
      >
        <Typography variant="h4">Ангилалын жагсаалт</Typography>

        <Button
          variant="contained"
          color="inherit"
          startIcon={<Iconify icon="eva:plus-fill" />}
          onClick={handleOpen}
        >
          Шинэ ангилал
        </Button>
      </Stack>

      <Stack
        mb={5}
        direction="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <CategorySearch categories={categories} />
        <CategorySort
          options={[
            { value: "latest", label: "Cүүлийнх" },
            { value: "popular", label: "Түгээмэл" },
            { value: "oldest", label: "Өмнөх" },
          ]}
        />
      </Stack>

      <Grid container spacing={3}>
        {categories?.map((category: any) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </Grid>
      <CategoryModal
        open={open}
        handleClose={handleClose}
        newCategory={newCategory}
        handleChange={handleChange}
        handleFileChange={handleFileChange}
        handleSave={createCategory}
      />
    </Container>
  );
}
