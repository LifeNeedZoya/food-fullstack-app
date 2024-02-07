import { useState } from "react";
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
}: any) => {
  return (
    <div>
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
            <TextField
              onChange={handleChange}
              name="discountPrice"
              id="outlined-basic"
              variant="outlined"
              label="Discount percent"
              fullWidth
            />
            <TextField
              onChange={handleChange}
              name="category"
              id="outlined-basic"
              variant="outlined"
              label="category"
              fullWidth
            />
          </Stack>

          {/* <Stack>
            <FormControlLabel
              control={<Checkbox defaultChecked />}
              label="sale"
              name="isSale"
            />
            <FormControl sx={{ m: 1, minWidth: 120, display: "flex" }} required>
              <InputLabel id="demo-simple-select-disabled-label">
                Катигори
              </InputLabel>
              <Select
                labelId="demo-simple-select-disabled-label"
                id="demo-simple-select-disabled"
                value={age}
                label="Катигори"
                onChange={handleChange}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
              <FormHelperText>Required</FormHelperText>
            </FormControl>
          </Stack> */}
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
    </div>
  );
};
export default FoodModal;
