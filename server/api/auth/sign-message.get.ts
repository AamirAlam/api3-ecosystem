import { SiweMessage } from "siwe";

export default defineEventHandler(async (event) => {
  try {
    const queryMessage = getQuery(event);

    const message = new SiweMessage(queryMessage);
    const messageToSign = message.prepareMessage();

    return messageToSign;
  } catch (err) {
    console.dir(err);
    event.res.statusCode = 500;
    return {
      code: "ERROR",
      message: "Something went wrong. with nonce",
    };
  }
});
