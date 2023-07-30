import { Article } from "~/server/models/Article";

export default defineEventHandler(async (event) => {
  try {
    const { page }: any = getQuery(event);

    const _page = page || 1;

    const limit = _page * 10;
    const skips = (_page - 1) * 10;

    const total = await Article.find({}).countDocuments();

    let articles = await Article.find({}, { content: 0 })
      .skip(skips)
      .limit(limit)
      .sort({ created_at: -1 });

    event.node.req.statusCode = 200;
    return { articles, total };
  } catch (err: any) {
    console.log("get articles error  ", err);
    event.node.req.statusCode = 500;
    return {
      code: "ERROR",
      message: "Something went wrong.",
    };
  }
});
