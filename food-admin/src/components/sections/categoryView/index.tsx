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

import CategoryModal from "./category-modal";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import myAxios from "@/utils/axios";
import axios from "axios";
import { CategoryContext } from "@/context/CategoryContext";
// ----------------------------------------------------------------------

export default function CategoryView() {
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const [newCategory, setNewCategory] = useState({
    name: "",
    description: "",
  });

  const { categories, setRefresh, refresh } = useContext(CategoryContext);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log("FFF", e.currentTarget.files![0]);
    setFile(e.currentTarget.files![0]);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setNewCategory({ ...newCategory, [name]: value });
    console.log("putData", newCategory);
  };

  const createCategory = async () => {
    try {
      const dataForm = new FormData();

      dataForm.set("image", file!);
      dataForm.set("name", newCategory.name);
      dataForm.set("description", newCategory.description);

      const data = await axios.post("http://localhost:8080/category", dataForm);
      console.log("successfull added category", data);
      setOpen(false);
      setRefresh(!refresh);
    } catch (error) {
      console.log("errr", error);
    }
  };

  const handleClose = () => {
    setOpen(() => false);
  };

  const handleOpen = () => {
    setOpen(() => true);
  };

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
        handleChange={handleChange}
        handleFileChange={handleFileChange}
        handleSave={createCategory}
      />
    </Container>
  );
}
