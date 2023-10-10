import * as Yup from "yup";
export const courseSchema = (update) => {
  const endDate = update
    ? Yup.date().notRequired()
    : Yup.date().required("required");

  const startDate = update
    ? Yup.date().notRequired()
    : Yup.date().required("required");
  const registrationDeadline = update
    ? Yup.date().notRequired()
    : Yup.date().required("required");
  const courseProvider = Yup.string();

  return Yup.object().shape({
    courseName: Yup.string().required("Course name is required"),
    courseCode: Yup.string().required("Course code is required"),
    startDate,
    endDate,
    registrationDeadline,
    courseProvider,
    picture: Yup.string(),
    aauUGStudentPrice: Yup.number()
      .positive("Price must be a positive number")
      .required("Price is required"),
    aauPGStudentPrice: Yup.number()
      .positive("Price must be a positive number")
      .required("Price is required"),
    aauExtensionStudentPrice: Yup.number()
      .positive("Price must be a positive number")
      .required("Price is required"),
    aauStaffPrice: Yup.number()
      .positive("Price must be a positive number")
      .required("Price is required"),
    noneAAUSelfSponsoredPrice: Yup.number()
      .positive("Price must be a positive number")
      .required("Price is required"),
    noneAAUOrganizationSponsoredPrice: Yup.number()
      .positive("Price must be a positive number")
      .required("Price is required"),
    description: Yup.string(),
    shortDescription: Yup.string(),
    lecture: Yup.array()
      .of(Yup.string())
      .min(1, "At least one lecture is required"),
  });
};
