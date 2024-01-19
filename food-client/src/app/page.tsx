"use client";
import React from "react";
import { Button } from "@/components";
import { Grid } from "@mui/material";
const Home = () => {
  return (
    <Grid container>
      <Grid item>
        <div className="wrapper">
          <div>
            <h1>Hello</h1>
          </div>
          <div>
            <h1>Hello-2</h1>
          </div>
        </div>
        <Button label="click" disabled={false} onclick={() => {}} />
      </Grid>
    </Grid>
  );
};

export default Home;
