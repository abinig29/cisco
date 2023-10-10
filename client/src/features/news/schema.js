import * as Yup from "yup";

const newsSchema = (update) => {
  const picture = update
    ? Yup.string().notRequired()
    : Yup.string().required("Picture is required");
  return Yup.object().shape({
    title: Yup.string().required("Title is required"),
    mainContent: Yup.array()
      .of(
        Yup.object().shape({
          topic: Yup.string().required("Topic is required"),
          content: Yup.string().required("Content is required"),
        })
      )
      .required("Main content is required"),
    picture,
  });
};

export default newsSchema;
