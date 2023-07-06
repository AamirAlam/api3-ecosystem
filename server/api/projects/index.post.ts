import { Project } from "~/server/models/Project";
import { imageUploadHandler } from "../../utils/imageUpload";
import { authenticated } from "../../utils/authenticated";
import { checkBuildStatus } from "~/server/services/build";
import { createPR } from "~/server/services/github";
import { ProjectType } from "~/server/types";

export default authenticated(
  imageUploadHandler(
    defineEventHandler(async (event: any) => {
      try {
        const {
          name,
          tagline,
          categories,
          productType,
          description,
          chains,
          links,
          proxies,
          year,
        } = await (event.node?.req?.body || readBody(event));

        console.log("req body ", {
          name,
          tagline,
          categories,
          productType,
          description,
          chains,
          links,
          proxies,
          year,
        });
        // check if all files are uploaded

        console.log("uplaoded files ", event.node.req?.files);

        if (!event.node.req?.files?.logo?.[0]?.location) {
          event.res.statusCode = 400;
          return {
            code: "REQ_FAILED",
            message: "Failed to upload logo",
          };
        }
        if (!event.node.req?.files?.banner?.[0]?.location) {
          event.res.statusCode = 400;
          return {
            code: "REQ_FAILED",
            message: "Failed to upload banner image",
          };
        }

        if (!event.node.req?.files?.cover?.[0]?.location) {
          event.res.statusCode = 400;
          return {
            code: "REQ_FAILED",
            message: "Failed to upload cover image",
          };
        }

        // if (
        //   !event.node.req?.files?.screenshot1?.[0]?.location ||
        //   !event.node.req?.files?.screenshot2?.[0]?.location ||
        //   !event.node.req?.files?.screenshot3?.[0]?.location ||
        //   !event.node.req?.files?.screenshot4?.[0]?.location
        // ) {
        //   event.res.statusCode = 400;
        //   return {
        //     code: "REQ_FAILED",
        //     message: "Failed to upload all 4 screenshots",
        //   };
        // }

        const screenshots = [];
        if (event.node.req?.files?.screenshot1?.[0]?.location) {
          screenshots.push(event.node.req?.files?.screenshot1?.[0]?.location);
        }
        if (event.node.req?.files?.screenshot2?.[0]?.location) {
          screenshots.push(event.node.req?.files?.screenshot2?.[0]?.location);
        }
        if (event.node.req?.files?.screenshot3?.[0]?.location) {
          screenshots.push(event.node.req?.files?.screenshot3?.[0]?.location);
        }
        if (event.node.req?.files?.screenshot4?.[0]?.location) {
          screenshots.push(event.node.req?.files?.screenshot4?.[0]?.location);
        }

        const uploadedImages = {
          logo: event.node.req?.files?.logo?.[0]?.location,
          banner: event.node.req?.files?.banner?.[0]?.location,
          cover: event.node.req?.files?.cover?.[0]?.location,
          screenshots: screenshots,
        };

        const payload: ProjectType = {
          name,
          tagline,
          description,
          status: "inactive",
          images: uploadedImages,
          categories: JSON.parse(categories),
          productType: productType,
          chains: JSON.parse(chains),
          // proxies: JSON.parse(proxies),
          links: JSON.parse(links),
          year: parseInt(year),
        };

        console.log("final project paylaod ", payload);

        const createdProject = await new Project(payload).save();

        // // verify build with new project
        const buildResult = await checkBuildStatus(payload, createdProject.id);

        console.log("build result ", buildResult);

        // console.log("build result ", buildResult);

        // if (buildResult.status === "failure") {
        //   event.res.statusCode = 400;
        //   return {
        //     code: "BUILD_FAILED",
        //     message: "Failed to build project!",
        //   };
        // }
        // // create a pr for listing review if build success

        // const prResult = await createPR(payload, createdProject.id);

        // console.log("pr result ", prResult);

        // if (prResult.status === "failure") {
        //   event.res.statusCode = 400;
        //   return {
        //     code: "PR_FAILED",
        //     message: "Failed to create PR!",
        //   };
        // }

        // if (!createdProject.id) {
        //   event.res.statusCode = 400;
        //   return {
        //     code: "CREATE_FAILED",
        //     message: "Failed to create project listing!",
        //   };
        // }

        const project = await Project.findById(createdProject.id);

        return buildResult;
      } catch (err: any) {
        console.log("create project error ", err);
        event.res.statusCode = 500;
        return {
          code: "ERROR",
          message: "Something went wrong.",
        };
      }
    })
  )
);
