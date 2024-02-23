"use client";

import { ChangeEvent, useEffect, useState } from "react";

import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Unstable_Grid2";
import Typography from "@mui/material/Typography";
import Swal from "sweetalert2";

import FoodCard from "./food-card";
import FoodSort from "./food-sort";
// import ProductFilters from "./product-filters";
// import ProductCartWidget from "./product-cart-widget";

import FoodModal from "./food-modal";

import axios from "axios";
import { Button } from "@mui/material";
import Iconify from "@/components/iconify";

export default function FoodView() {
  const [open, setOpen] = useState(false);
  const [foods, setFoods] = useState([]);
  const [isChecked, setIsChecked] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [newFood, setNewFood] = useState({
    name: "",
    description: "",
    price: 0,
    discountPrice: 0,
    category: "65bccbf8cfc2bc3551a49ea4rs",
    isSale: isChecked,
  });
  const [categories, setCategories] = useState([]);

  const handleClose = () => {
    setOpen(() => false);
  };

  const handleOpen = () => {
    setOpen(() => true);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log("FFF", e.currentTarget.files![0]);
    setFile(e.currentTarget.files![0]);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    console.log("name", name);
    console.log("value", value);

    setNewFood({ ...newFood, [name]: value });
  };

  const getCategory = async () => {
    try {
      const {
        data: { categories },
      } = await axios.get("http://localhost:8080/category");

      setCategories(categories);
      console.log("get categories successfully");
    } catch (error: any) {
      alert("Get Error - " + error.message);
    }
  };

  const getFoods = async () => {
    try {
      const {
        data: { foods },
      } = await axios.get("http://localhost:8080/food");

      setFoods(foods);
      console.log("get foods successfully");
    } catch (error: any) {
      alert("Get Error - " + error.message);
    }
  };

  const createFood = async () => {
    try {
      const dataForm = new FormData();

      dataForm.set("image", file!);
      dataForm.set("name", newFood.name);
      dataForm.set("description", newFood.description);
      dataForm.set("price", newFood.price.toString());
      dataForm.set("category", newFood.category);
      dataForm.set("discountPrice", newFood.discountPrice.toString());
      dataForm.set("isSale", "" + newFood.isSale);

      const data = await axios.post("http://localhost:8080/food", dataForm);
      console.log("successfully added food", data);
      handleClose();
      await Swal.fire({
        position: "center",
        title: "Та амжилттай нэмлээ",
        icon: "success",
        timer: 1000,
        showConfirmButton: false,
      });
    } catch (error) {
      console.log("errr", error);
    }
  };

  useEffect(() => {
    getFoods();
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
        <Typography variant="h4"> Хоолны жагсаалт</Typography>

        <Button
          variant="contained"
          color="inherit"
          startIcon={<Iconify icon="eva:plus-fill" />}
          onClick={handleOpen}
        >
          Шинэ хоол
        </Button>
      </Stack>

      <Stack
        direction="row"
        alignItems="center"
        flexWrap="wrap-reverse"
        justifyContent="flex-end"
        sx={{ mb: 2 }}
      >
        <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
          {/* <ProductFilters
            openFilter={openFilter}
            onOpenFilter={handleOpenFilter}
            onCloseFilter={handleCloseFilter}
          /> */}

          <FoodSort />
        </Stack>
      </Stack>

      <Grid container spacing={3}>
        {foods.map((product: any) => (
          <Grid key={product.id} xs={12} sm={6} md={3}>
            <FoodCard product={product} />
          </Grid>
        ))}
      </Grid>
      <FoodModal
        open={open}
        newFood={newFood}
        isChecked={isChecked}
        setIsChecked={setIsChecked}
        createFood={createFood}
        categories={categories}
        handleClose={handleClose}
        handleChange={handleChange}
        handleFileChange={handleFileChange}
      />

      {/* <ProductCartWidget /> */}
    </Container>
  );
}
