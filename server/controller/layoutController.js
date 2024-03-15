import { BadRequestError, NotFoundError } from "../error/index.js";
import Layout from "../model/layoutModel.js";

//@desc get all layout type
//@method GET  /layout
//@access public
export const getAllLayout = async (req, res) => {
  const banner = await Layout.find({ type: "banner" });
  const faq = await Layout.find({ type: "faq" });
  const aboutContent = await Layout.find({ type: "aboutContent" });
  const video = await Layout.find({ type: "video" });
  const hero = await Layout.find({ type: "hero" });

  res.status(200).json({
    layout: [{ banner }, { faq }, { aboutContent }, { video }, { hero }],
  });
};

//@desc get  layout by type
//@method GET  /layout/:type
//@access public
export const getSingleLayout = async (req, res) => {
  const { type } = req.params;
  const layout = await Layout.find({ type });
  if (!layout) return new NotFoundError("no layout with this type exist");
  res.status(200).json({ layout });
};

//@desc create new layout type
//@method POST /layout
//@access private
export const createLayout = async (req, res) => {
  const { type } = req.body;
  const picture = req?.file?.filename;
  const preLayout = await Layout.find({ type });

  if (preLayout.length) {
    throw new BadRequestError("This layout type exists before ");
  }
  if (type === "faq") {
    const faqString = req.body.faq;
    console.log(req.body);
    const faqContent = JSON.parse(faqString);
    const body = {
      type: "faq",
      faq: faqContent,
    };
    const newFaq = await Layout.create(body);
    if (newFaq) {
      res.status(201).json(newFaq);
    } else {
      throw new BadRequestError("Invalid layout information provided");
    }
  }
  if (type === "banner") {
    const body = {
      type: "banner",
      banner: {
        title: req.body.title,
        subTitle: req.body.subTitle,
        picture,
      },
    };
    const newBanner = await Layout.create(body);
    if (newBanner) {
      res.status(201).json(newBanner);
    } else {
      throw new BadRequestError("Invalid layout information provided");
    }
  }
  if (type === "aboutContent") {
    const body = {
      type: "aboutContent",
      aboutContent: {
        title: req.body.title,
        content: req.body.content,
      },
    };
    const newAboutContent = await Layout.create(body);
    if (newAboutContent) {
      res.status(201).json(newAboutContent);
    } else {
      throw new BadRequestError("Invalid layout information provided");
    }
  }
  if (type === "hero") {
    const body = {
      type: "hero",
      hero: {
        title: req.body.title,
        picture,
        subTitle: req.body.subTitle,
      },
    };
    const newHero = await Layout.create(body);
    if (newHero) {
      res.status(201).json(newHero);
    } else {
      throw new BadRequestError("Invalid layout information provided");
    }
  }
  if (type === "video") {
    const body = {
      type: "video",
      video: {
        video: req.body.video,
        title: req.body.title,
        subTitle: req.body.subTitle,
        banner: picture,
      },
    };
    console.log(body);
    const newVideo = await Layout.create(body);
    if (newVideo) {
      res.status(201).json(newVideo);
    } else {
      throw new BadRequestError("Invalid layout information provided");
    }
  }
  throw new BadRequestError("Provided with wrong layout type");
};

//@desc delete news
//@method DELETE /news/:id
//@access private
export const deleteLayout = async (req, res) => {
  const { type } = req.params;
  const layout = await Layout.find({ type }).exec();
  if (!layout) throw new BadRequestError("No layout of  was found");
  const deletedLayout = await layout.deleteOne();
  res.status(204).json({
    message: `layout with code ${deletedLayout._id}is deleted successfully`,
  });
};

//@desc update layout
//@method PATCH /layout/:id
//@access private
export const updateLayout = async (req, res) => {
  const { type } = req.body;
  const preLayout = await Layout.find({ type });
  const picture = req?.file?.filename;
  console.log(req?.file);

  if (!preLayout.length) {
    throw new BadRequestError("This layout type  doesnt exists before ");
  }
  if (type === "faq") {
    const faqString = req.body.faq;
    const faqContent = JSON.parse(faqString);
    const body = {
      type: "faq",
      faq: faqContent,
    };
    const updatedFaq = await Layout.findByIdAndUpdate(preLayout[0]._id, body, {
      new: true,
    });
    if (updatedFaq) {
      res.status(201).json(updatedFaq);
    } else {
      throw new BadRequestError("Invalid layout information provided");
    }
  }
  if (type === "banner") {
    const body = {
      type: "banner",
      banner: {
        title: req.body.title,
        subTitle: req.body.subTitle,
        picture: picture ? picture : preLayout[0].picture,
      },
    };

    const updateBanner = await Layout.findByIdAndUpdate(
      preLayout[0]._id,
      body,
      {
        new: true,
      }
    );
    if (updateBanner) {
      res.status(201).json(updateBanner);
    } else {
      throw new BadRequestError("Invalid layout information provided");
    }
  }
  if (type === "hero") {
    const body = {
      type: "hero",
      hero: {
        title: req.body.title,
        picture: req.body.picture,
        subTitle: req.body.subTitle,
      },
    };
    const updateHero = await Layout.findByIdAndUpdate(preLayout[0]._id, body, {
      new: true,
    });
    if (updateHero) {
      res.status(201).json(updateHero);
    } else {
      throw new BadRequestError("Invalid layout information provided");
    }
  }
  if (type === "aboutContent") {
    const body = {
      type: "aboutContent",
      aboutContent: {
        title: req.body.title,
        content: req.body.content,
      },
    };
    const updateAboutContent = await Layout.findByIdAndUpdate(
      preLayout[0]._id,
      body,
      { new: true }
    );
    if (updateAboutContent) {
      res.status(201).json(updateAboutContent);
    } else {
      throw new BadRequestError("Invalid layout information provided");
    }
  }
  if (type === "video") {
    const body = {
      type: "video",
      video: {
        video: req.body.video,
        title: req.body.title,
        subTitle: req.body.subTitle,
        banner: picture ? picture : preLayout[0].banner,
      },
    };
    const updatedVideo = await Layout.findByIdAndUpdate(
      preLayout[0]._id,
      body,
      { new: true }
    );
    if (updatedVideo) {
      res.status(201).json(updatedVideo);
    } else {
      throw new BadRequestError("Invalid layout information provided");
    }
  } else throw new BadRequestError("Provided with wrong layout type");
};
