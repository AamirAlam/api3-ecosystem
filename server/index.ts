import mongoose from "mongoose";
import { Nitro } from "nitropack";
import { syncProjectsToMongodb } from "./services/syncDb";

export default async (_nitroApp: Nitro) => {
  const config = useRuntimeConfig();

  try {
    await mongoose.connect(config.mongodbURI);

    // sync projects on server startup
    console.log("db connected:");

    console.log("syncing projects");
    await syncProjectsToMongodb();
    console.log("projects synced");
  } catch (err) {
    console.log("mongodb connection error ", err);
  }
};
