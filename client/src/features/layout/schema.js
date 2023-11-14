import * as Yup from "yup";

export const faqSchema = Yup.object().shape({
  faq: Yup.array().of(
    Yup.object().shape({
      question: Yup.string().required("Question is required"),
      answer: Yup.string().required("Answer is required"),
    })
  ),
});
export const aboutSchema = Yup.object().shape({
  title: Yup.string().required("title is required"),
  content: Yup.string().required("content is required"),
});
export const bannerSchema = Yup.object().shape({
  title: Yup.string().required("title is required"),
  subTitle: Yup.string().required("subtitle is required"),
  picture: Yup.string().required("banner image is required"),
});

export const videoSchema = Yup.object().shape({
  video: Yup.string().required("video  is required"),
  banner: Yup.string().required("banner image is required"),
  subTitle: Yup.string(),
  title: Yup.string(),
});
export const heroSchema = Yup.object().shape({
  title: Yup.string().required("title is required"),
  subTitle: Yup.string().required("title is required"),
});
