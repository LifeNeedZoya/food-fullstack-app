import * as React from "react";
import {
  Box,
  Button as MuiButton,
  Typography,
  Modal,
  Stack,
  styled,
  Button,
  TextField,
} from "@mui/material";

import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 550,
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

export default function CategoryModal({
  handleClose,
  open,
  handleSave,
  handleChange,
  handleFileChange,
}: any) {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Stack direction={"row"} justifyContent={"space-between"}>
          <Typography variant="h3">Ангилал нэмэх хэсэг</Typography>
          <MuiButton onClick={handleClose} sx={{ fontSize: 23 }}>
            X
          </MuiButton>
        </Stack>
        <Typography sx={{ margin: 0 }}>Нэр</Typography>
        <TextField
          id="outlined-basic"
          label="Name"
          name="name"
          variant="outlined"
          sx={{ width: 400, marginY: 2 }}
          onChange={handleChange}
        />
        <Typography sx={{ margin: 0 }}>Тайлбар</Typography>

        <TextField
          id="outlined-basic"
          label="description"
          name="description"
          variant="outlined"
          sx={{ width: 400, marginY: 2 }}
          onChange={handleChange}
        />
        <MuiButton
          component="label"
          variant="contained"
          startIcon={<CloudUploadIcon />}
          sx={{ width: 400, marginY: 2 }}
        >
          Upload file
          <VisuallyHiddenInput type="file" onChange={handleFileChange} />
        </MuiButton>
        <Button
          variant="outlined"
          sx={{ width: 400, marginY: 2 }}
          onClick={handleSave}
        >
          нэмэх
        </Button>
      </Box>
    </Modal>
  );
}
