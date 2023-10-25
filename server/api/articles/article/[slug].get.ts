import { View } from "../../../models/View";
import { Article } from "~/server/models/Article";

export default defineEventHandler(async (event) => {
  const articleSlug = event.context?.params?.slug;
  const clientIp = event.node.req.headers?.["x-forwarded-for"];

  try {
    if (!articleSlug) {
      event.node.res.statusCode = 400;
      return {
        code: "INVALID_SLUG",
        message: "Invalid article slug",
      };
    }
    const article = await Article.findOne({ slug: articleSlug });

    if (!article) {
      event.node.res.statusCode = 404;
      return {
        code: "ARTICLE_NOT_FOUND",
        message: `Article not found `,
      };
    }

    // Check if the IP has already viewed the article in the last 24 hours
    const lastView = await View.findOne({
      ipAddress: clientIp,
      article: article.id,
      timestamp: { $gte: new Date(Date.now() - 24 * 60 * 60 * 1000) },
    });

    if (!lastView) {
      const newView = new View({
        ipAddress: clientIp,
        article: article.id,
      });
      await newView.save();
      await Article.findByIdAndUpdate(article.id, { $inc: { views: 1 } });
    }

    event.node.res.statusCode = 200;
    return article;
  } catch (err) {
    console.dir("get article by id error ", err);
    event.node.res.statusCode = 500;
    return {
      code: "ERROR",
      message: "Something went wrong.",
    };
  }
});
