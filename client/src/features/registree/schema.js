import * as Yup from "yup";

const registreeSchema = Yup.object().shape({
  firstName: Yup.string().required("First name is required"),
  registreeType: Yup.string().required("Registree typeis required"),
  lastName: Yup.string().required("Last name is required"),
  course: Yup.string().required("Course is required"),
  gender: Yup.string().required("Gender is required"),
  program: Yup.string().required("program is required"),
  picture: Yup.string().required("payment bill is required"),
  personalPicture: Yup.string().required("passport size photo of you is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  phoneNumber: Yup.string()
    .matches(/^[0-9]{10}$/, "Phone number must be exactly 10 digits")
    .required("Phone number is required"),
});

export default registreeSchema;
