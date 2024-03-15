import User from "../model/userModel.js";
import { BadRequestError, NotFoundError } from "../error/index.js";
import News from "../model/newsModel.js";

//@desc get all news
//@method GET  /news
//@access public
export const getNews = async (req, res) => {
  const news = await News.find().lean();
  res.status(200).json({ news });
};

//@desc create new news
//@method POST /news
//@access private
export const createNews = async (req, res) => {
  const picture = req?.file?.filename;
  let newsBody = {
    ...req.body,
    picture,
  };
  const news = await News.create(newsBody);
  if (news) {
    res.status(201).json(news);
  } else {
    throw new BadRequestError("Invalid News information provided");
  }
};

//@desc delete news
//@method DELETE /news/:id
//@access private
export const deleteNews = async (req, res) => {
  const { id } = req.params;
  const news = await News.findById(id).exec();
  if (!news) throw new BadRequestError("No news was found");
  const deletedNews = await news.deleteOne();
  res.status(204).json({
    message: `news with code ${deletedNews._id}is deleted successfully`,
  });
};

//@desc update news
//@method PATCH /news/:id
//@access private
export const updateNews = async (req, res) => {
  const { id } = req.params;

  const news = await News.findById(id);
  if (!news) throw new NotFoundError("News Not Found");
  const picture = req?.file?.filename ? req?.file?.filename : news?.picture;

  const updatedNews = await News.findByIdAndUpdate(
    id,
    {
      ...req.body,
      picture,
    },
    {
      new: true,
    }
  );

  if (updatedNews) {
    res.status(200).json({ news: updatedNews });
  } else {
    throw new BadRequestError("Invalid news credential, cannot update");
  }
};
