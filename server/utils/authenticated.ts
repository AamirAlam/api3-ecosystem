import type { EventHandler } from "h3";
import { verifyToken } from "../services/jwt";
import { DecodedToken, ROLE } from "../types";
import { User } from "~/server/models/User";

export const authenticated = (
  handler: EventHandler,
  role: string = ROLE.USER
) =>
  defineEventHandler(async (event) => {
    try {
      const authToken = event.node.req.headers.authorization;

      console.log("headers from webhook ", event.node.req.headers);
      if (!authToken) {
        event.node.res.statusCode = 401;
        return {
          error: "Unauthorized access",
        };
      }

      const decodedToken: DecodedToken | null = verifyToken(authToken);

      if (!decodedToken) {
        event.node.res.statusCode = 401;
        return {
          error: "Unauthorized",
        };
      }

      // check if user exists in db
      const user = await User.findOne({ address: decodedToken.address });

      // if user is not present in db, return unauthorized
      if (!user) {
        event.node.res.statusCode = 401;
        return {
          error: "Unauthorized access, wallet address not found",
        };
      }

      //check token has correct role or not
      // skip access check if role is USER

      if (role !== ROLE.USER && user?.role !== role) {
        event.node.res.statusCode = 401;
        return {
          error: `Unauthorized access, ${role} role required`,
        };
      }

      event.context.auth = { user: decodedToken };

      const response = await handler(event);

      return { response };
    } catch (err) {
      console.log("auth middleware error ", err);
      event.node.res.statusCode = 500;
      return {
        error: "Something went wrong at server!",
      };
    }
  });
