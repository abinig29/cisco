import * as Yup from "yup";

const userSchema = (isCreateForm) => {
  let passwordValidation = Yup.string();
  if (!isCreateForm) {
    passwordValidation = passwordValidation
      .required("Password is required")
      .min(6, "Password must be at least 6 characters long");
  } else {
    passwordValidation = passwordValidation.min(
      6,
      "Password must be at least 6 characters long"
    );
  }

  return Yup.object().shape({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    role: Yup.string().required("Last name is required"),
    password: passwordValidation,
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
  });
};

export { userSchema };
