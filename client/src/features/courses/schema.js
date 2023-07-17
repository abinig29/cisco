import * as Yup from "yup";

export const courseSchema = (update) => {
  const endDate = update
    ? Yup.date().notRequired()
    : Yup.date().required("End date is required");
  return Yup.object().shape({
    courseName: Yup.string().required("Course name is required"),
    courseCode: Yup.string().required("Course code is required"),
    endDate,
    picture: Yup.string(),
    price: Yup.number()
      .positive("Price must be a positive number")
      .required("Price is required"),
    description: Yup.string(),
    shortDescription: Yup.string(),
    lecture: Yup.array()
      .of(Yup.string())
      .min(1, "At least one lecture is required"),
  });
};
