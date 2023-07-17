import type { EventHandler } from "h3";
import * as crypto from "crypto";

const config = useRuntimeConfig();

export const handleWebhookAuth = (handler: EventHandler) =>
  defineEventHandler(async (event: any) => {
    try {
      const reqSignature = event.node.req.headers?.["x-hub-signature-256"];

      if (!reqSignature) {
        event.node.res.statusCode = 401;
        return {
          error: "Unauthorized access! No signature found",
        };
      }

      const webhookReqBody = await (event.node?.req?.body || readBody(event));

      const signature = crypto
        .createHmac("sha256", config.GITHUB_WEBHOOK_SECRET)
        .update(JSON.stringify(webhookReqBody))
        .digest("hex");

      if (`sha256=${signature}` !== reqSignature) {
        event.node.res.statusCode = 401;
        return {
          error: "Unauthorized webhook access! Invalid signature",
        };
      }

      const response = await handler(event);

      return { response };
    } catch (err) {
      console.log("webhook auth error ", err);
      event.node.res.statusCode = 500;
      return {
        error: "Webhook authorization error!",
      };
    }
  });
