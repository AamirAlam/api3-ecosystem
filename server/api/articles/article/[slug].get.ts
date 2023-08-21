import { Article } from "~/server/models/Article";

export default defineEventHandler(async (event) => {
  const articleSlug = event.context?.params?.slug;

  try {
    if (!articleSlug) {
      event.res.statusCode = 400;
      return {
        code: "INVALID_TITLE",
        message: "Invalid article title",
      };
    }
    const article = await Article.findOne({ slug: articleSlug });

    if (!article) {
      event.res.statusCode = 404;
      return {
        code: "ARTICLE_NOT_FOUND",
        message: `Article not found `,
      };
    }

    return article;
  } catch (err) {
    console.dir(err);
    event.res.statusCode = 500;
    return {
      code: "ERROR",
      message: "Something went wrong.",
    };
  }
});
