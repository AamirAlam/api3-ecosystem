import { authenticated } from "../../utils/authenticated";
import { ROLE } from "~/server/types";

export default authenticated(
  defineEventHandler(async (event: any) => {
    try {
      const payload = await (event.node?.req?.body || readBody(event));

      if (
        payload?.action === "closed" &&
        payload?.pull_request?.merged === true
      ) {
        // The pull request was merged
        console.log("Pull request was merged!");
        // call your API here
      } else if (
        payload?.action === "closed" &&
        payload?.pull_request?.merged === false
      ) {
        // The pull request was closed without being merged
        console.log("Pull request was closed without being merged!");
        // call your API here
      }

      return { code: "OK", message: "Project updated successfully!" };
    } catch (err: any) {
      console.log("webhook req ", err);
      event.res.statusCode = 500;
      return {
        code: "ERROR",
        message: "Failed to update project status!",
      };
    }
  }),
  ROLE.WEBHOOK
);
