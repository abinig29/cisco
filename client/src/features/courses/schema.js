import * as Yup from "yup";

export const courseSchema = Yup.object().shape({
  courseName: Yup.string().required("Course name is required"),
  courseCode: Yup.string().required("Course code is required"),
  endDate: Yup.date(),
  picture: Yup.string(),
  description: Yup.string(),
  shortDescription: Yup.string(),
  lecture: Yup.array()
    .of(Yup.string())
    .min(1, "At least one lecture is required"),
});
