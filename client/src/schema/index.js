import * as Yup from "yup";

export const signinSchema = Yup.object({
  email: Yup.string()
    .email("Please enter a valid email address")
    .matches(
      /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
      "Please enter a valid email address"
    )
    .required("Email is required"),

  password: Yup.string()
    .min(6, "Password should be at least 6 characters")
    .required("Please enter the password!")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/,
      "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character"
    ),
});

export const signupSchema = Yup.object({
  firstname: Yup.string().required("Please enter the Firstname !"),
  email: Yup.string()
    .email("Please enter a valid email address")
    .matches(
      /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
      "Please enter a valid email address"
    )
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password should be at least 6 characters")
    .required("Please enter the password!")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/,
      "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character"
    ),
  confirmPassword: Yup.string()
    .required("Please enter the confirm password !")
    .oneOf([Yup.ref("password"), null], "Password must match"),
});

export const forgetSchema = Yup.object({
  email: Yup.string()
    .email("Please enter a valid email address")
    .matches(
      /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
      "Please enter a valid email address"
    )
    .required("Email is required"),
});

export const recoverSchema = Yup.object({
  password: Yup.string()
    .min(6, "Password should be at least 6 characters")
    .required("Please enter the password!")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/,
      "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character"
    ),
  confirmPassword: Yup.string()
    .required("Please enter the confirm password !")
    .oneOf([Yup.ref("password"), null], "Password must match"),
});

export const otpSchema = Yup.object({
  otp: Yup.string().max(6).min(6).required("Please enter the 6 Digit OTP"),
});
