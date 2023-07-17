import * as Yup from "yup";

const userSchema = Yup.object().shape({
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters long"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
});

export { userSchema };
