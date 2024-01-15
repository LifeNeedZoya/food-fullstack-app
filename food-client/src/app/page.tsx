import { Grid, Button, Typography } from "@mui/material";

export default function Home() {
  return (
    <main>
      <Grid container>
        <Grid item>
          <Typography variant="h1">Welcome Mui Framework </Typography>
        </Grid>
        <Grid item>
          <Button variant="contained" color="success" size="large">
            Click me
          </Button>
        </Grid>
      </Grid>
    </main>
  );
}
