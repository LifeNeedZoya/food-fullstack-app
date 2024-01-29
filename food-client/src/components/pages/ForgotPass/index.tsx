"use client";

import { ChangeEvent, useState } from "react";
import { Container } from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";

import { StepOne } from "./StepOne";
import { StepTwo } from "./StepTwo";
import { StepThree } from "./StepThree";

export const MyStepper = () => {
  const [activeStep, setActiveStep] = useState(1);
  const [user, setUser] = useState({
    email: "",
    password: "",
    otp: "",
  });

  const handleFirstStep = async () => {
    try {
      console.log("handleNext");
      const data = await axios.post("http://localhost:8080/auth/verify/email", {
        email: user.email,
      });
      console.log("object");
      setActiveStep((prev) => prev + 1);
      toast.success("success");
    } catch (error) {
      toast.error(`Email илгэээхэд алдаа гарлаа.${error}`);
      console.log("err", error);
    }
  };
  const handleSecondStep = async () => {
    try {
      console.log("handleNext");
      const data = await axios.post(
        "http://localhost:8080/auth/verify/compare",
        {
          email: user.email,
          otp: user.otp,
        }
      );
      console.log("handleNextData", data);
      setActiveStep((prev) => prev + 1);
      toast.success("success");
    } catch (error) {
      toast.error(
        `Email илгэээхэд алдаа гарлаа.${error.response.data.message}`
      );
      console.log("err");
    }
  };

  const handleThirdStep = () => {};

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    console.log("state", e.target.name, e.target.value);
  };

  return (
    <Container>
      {activeStep === 1 && (
        <StepOne
          email={user.email}
          handleFirstStep={handleFirstStep}
          handleChangeInput={handleChangeInput}
        />
      )}
      {activeStep === 2 && (
        <StepTwo
          email={user.email}
          otp={user.otp}
          handleSecondStep={handleSecondStep}
          handleChangeInput={handleChangeInput}
        />
      )}
      {activeStep === 3 && (
        <StepThree
          email={user.email}
          password={user.password}
          handleChangeInput={handleChangeInput}
        />
      )}
    </Container>
  );
};
