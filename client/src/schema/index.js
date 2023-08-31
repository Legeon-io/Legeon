import * as Yup from "yup";

export const signinSchema = Yup.object({
  email: Yup.string().email().required("Please enter your Email !"),
  password: Yup.string().min(6).required("Please enter the password !"),
});

export const signupSchema = Yup.object({
  email: Yup.string().email().required("Please enter your Email !"),
  password: Yup.string().min(6).required("Please enter the password !"),
  confirmPassword: Yup.string()
    .required("Please enter the confirm password !")
    .oneOf([Yup.ref("password"), null], "Password must match"),
});

export const forgetSchema = Yup.object({
  email: Yup.string().email().required("Please enter your Email !"),
});

export const recoverSchema = Yup.object({
  password: Yup.string().min(6).required("Please enter the password !"),
  confirmPassword: Yup.string()
    .required("Please enter the confirm password !")
    .oneOf([Yup.ref("password"), null], "Password must match"),
});

export const otpSchema = Yup.object({
  otp: Yup.string().max(6).min(6).required("Please enter the 6 Digit OTP"),
});
