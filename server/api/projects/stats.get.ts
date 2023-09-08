import { Project } from "~/server/models/Project";

export default defineEventHandler(async (event) => {
  try {
    const stats = await Project.aggregate([
      {
        $match: {
          status: "active",
        },
      },
      {
        $facet: {
          chains: [
            { $unwind: "$chains" },
            {
              $group: {
                _id: "$chains",
                count: { $sum: 1 },
              },
            },
          ],
          categories: [
            { $unwind: "$categories" },
            {
              $group: {
                _id: "$categories",
                count: { $sum: 1 },
              },
            },
          ],
          productTypes: [
            { $unwind: "$productType" },
            {
              $group: {
                _id: "$productType",
                count: { $sum: 1 },
              },
            },
          ],
          years: [
            { $unwind: "$year" },
            {
              $group: {
                _id: "$year",
                count: { $sum: 1 },
              },
            },
          ],
        },
      },
    ]);

    const statsObject = stats?.[0];

    if (!statsObject) {
      event.node.res.statusCode = 400;
      return {
        code: "REQ_FAILED",
        message: "Failed to fetch stats",
      };
    }
    const chains = statsObject?.chains?.map((el: any) => {
      return {
        chainId: el?._id,
        count: el?.count,
      };
    });
    const categories = statsObject.categories.map((el: any) => {
      return {
        name: el?._id,
        count: el?.count,
      };
    });
    const productTypes = statsObject.productTypes.map((el: any) => {
      return {
        name: el?._id,
        count: el?.count,
      };
    });
    const years = statsObject.years.map((el: any) => {
      return {
        name: el?._id,
        count: el?.count,
      };
    });
    const finalPayload = { chains, categories, productTypes, years };

    event.node.res.statusCode = 200;
    return finalPayload;
  } catch (err) {
    console.log(err);
    event.node.res.statusCode = 500;
    return {
      code: "ERROR",
      message: "Something went wrong.",
    };
  }
});
