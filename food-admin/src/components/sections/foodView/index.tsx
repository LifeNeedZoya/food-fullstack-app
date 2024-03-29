"use client";

import { ChangeEvent, useContext, useEffect, useState } from "react";
import myAxios from "@/utils/axios";
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
import { FoodContext } from "@/context/foodContext";
import { toast } from "react-toastify";

export default function FoodView() {
  const [open, setOpen] = useState(false);
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

  const { foods, refresh, setRefresh } = useContext(FoodContext);

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

    setNewFood({ ...newFood, [name]: value });
  };
  const handleChecked = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;

    setNewFood({ ...newFood, [name]: checked });
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

      const data = await myAxios.post("/food", dataForm);
      console.log("successfully added food", data);
      handleClose();
      await Swal.fire({
        position: "center",
        title: "Та амжилттай нэмлээ",
        icon: "success",
        timer: 1000,
        showConfirmButton: false,
      });
      setRefresh(!refresh);
    } catch (error: any) {
      console.log("errr", error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(`Error: ${error.response.data.message}`);
      } else if (error.message) {
        toast.error(`Error: ${error.message}`);
      } else {
        toast.error("An error occurred");
      }
    }
  };

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
        handleClose={handleClose}
        handleChange={handleChange}
        handleFileChange={handleFileChange}
        handleChecked={handleChecked}
      />

      {/* <ProductCartWidget /> */}
    </Container>
  );
}
