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
        if (!event.node.req?.files?.cover?.[0]?.location) {
          event.res.statusCode = 400;
          return {
            code: "REQ_FAILED",
            message: "Failed to upload cover image",
          };
        }

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

        if (screenshots.length < 2) {
          event.res.statusCode = 400;
          return {
            code: "REQ_FAILED",
            message: "Please upload atleast 2 screenshots",
          };
        }

        const uploadedImages = {
          logo: event.node.req?.files?.logo?.[0]?.location,
          cover: event.node.req?.files?.cover?.[0]?.location,
          screenshots: screenshots,
        };

        if (
          productType === "datafeed" &&
          Object.keys(JSON.parse(proxies)).length === 0
        ) {
          event.res.statusCode = 400;
          return {
            code: "REQ_FAILED",
            message: "Please add valid proxy information!",
          };
        }

        const payload: ProjectType =
          productType === "qrng"
            ? {
                name,
                tagline,
                description,
                status: "inactive",
                images: uploadedImages,
                categories: JSON.parse(categories),
                productType: productType,
                chains: JSON.parse(chains),
                links: JSON.parse(links),
                year: parseInt(year),
              }
            : {
                name,
                tagline,
                description,
                status: "inactive",
                images: uploadedImages,
                categories: JSON.parse(categories),
                productType: productType,
                chains: JSON.parse(chains),
                proxies: JSON.parse(proxies),
                links: JSON.parse(links),
                year: parseInt(year),
              };

        console.log("final project paylaod ", payload);

        const createdProject = await new Project(payload).save();

        // // verify build with new project
        const buildResult = await checkBuildStatus(payload, createdProject.id);

        console.log("build result ", buildResult);

        if (!buildResult.success) {
          // remove project data from db when build failed
          await Project.findByIdAndDelete(createdProject.id);

          event.res.statusCode = 400;
          return {
            code: "BUILD_FAILED",
            message: "Failed to build project!",
          };
        }

        // create a pr for listing review if build success

        const prResult = await createPR(payload, createdProject.id);

        if (!prResult.success) {
          // remove project data from db when pr failed
          await Project.findByIdAndDelete(createdProject.id);

          event.res.statusCode = 400;
          return {
            code: "PR_FAILED",
            message: "Failed to create PR!",
          };
        }

        event.res.statusCode = 201;
        return {
          code: "OK",
          message: "Project submitted successfully!",
          data: prResult?.data,
        };
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
