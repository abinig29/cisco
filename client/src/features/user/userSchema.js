import * as Yup from "yup";

const userSchema = (isUpdate) => {
  return Yup.object().shape({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    role: Yup.string().required("Last name is required"),
    picture: Yup.string().required("Picture  is required"),
    password: isUpdate
      ? Yup.string().optional()
      : Yup.string().required("Password is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
  });
};

export { userSchema };
