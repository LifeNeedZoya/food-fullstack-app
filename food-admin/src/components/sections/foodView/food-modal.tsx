import { ChangeEvent, useState } from "react";
import {
  Box,
  Button as MuiButton,
  Typography,
  Modal,
  Grid,
  Stack,
  styled,
  FormControlLabel,
  FormGroup,
  Checkbox,
  SelectChangeEvent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Button,
  Input,
  TextField,
} from "@mui/material";

import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 750,
  bgcolor: "background.paper",
  border: "2px solid #000",
  borderRadius: 5,
  boxShadow: 22,
  p: 4,
};

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const FoodModal = ({
  handleClose,
  open,
  handleChange,
  handleFileChange,
  createFood,
  categories,
  isChecked,
  setIsChecked,
  newFood,
}: any) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Stack direction={"row"} justifyContent={"space-between"}>
          <Typography variant="h3">Хоол нэмэх хэсэг</Typography>
          <MuiButton onClick={handleClose} sx={{ fontSize: 23 }}>
            X
          </MuiButton>
        </Stack>

        <Stack gap={2}>
          <TextField
            onChange={handleChange}
            name="name"
            id="outlined-basic"
            variant="outlined"
            label="name"
            fullWidth
          />
          <TextField
            onChange={handleChange}
            name="description"
            id="outlined-basic"
            variant="outlined"
            label="description"
            fullWidth
          />
          <TextField
            onChange={handleChange}
            name="price"
            id="outlined-basic"
            variant="outlined"
            label="price"
            fullWidth
          />

          <Grid item display={"flex"}>
            <Typography
              variant="h6"
              display={"flex"}
              alignItems={"center"}
              justifyContent={"center"}
            >
              Хямдралтай эсэх
            </Typography>
            <Checkbox
              checked={isChecked}
              onClick={() => setIsChecked(!isChecked)}
              name="isSale"
            />
            {isChecked && (
              <TextField
                onChange={handleChange}
                name="discountPrice"
                id="outlined-basic"
                variant="outlined"
                label="Хямдралын хувиа оруулна уу"
                fullWidth
              />
            )}
          </Grid>
          <FormControl fullWidth>
            <InputLabel id="demo-multiple-name-label">Category</InputLabel>
            <Select
              id="demo-simple-select"
              value="category"
              label={"category"}
              name="category"
              onChange={handleChange}
              style={{ color: "black" }}
            >
              {categories.map((e: any) => (
                <MenuItem value={e._id}>{e.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Stack>
        <MuiButton
          component="label"
          variant="contained"
          startIcon={<CloudUploadIcon />}
          fullWidth
          sx={{ marginY: 2 }}
        >
          Upload file
          <VisuallyHiddenInput type="file" onChange={handleFileChange} />
        </MuiButton>
        <Button
          variant="outlined"
          fullWidth
          sx={{ margin: 2 }}
          onClick={createFood}
        >
          +
        </Button>
      </Box>
    </Modal>
  );
};
export default FoodModal;
