import mongoose from "mongoose";
import { ProjectType } from "../types";
import { CHAINS } from "@api3/chains";

const chains = CHAINS.map((chain) => chain.id) as [string, ...string[]];

const Schema = mongoose.Schema;

// Define the nested schema
const SocialSchema = new Schema({
  label: { type: String, required: true },
  url: { type: String, required: true },
});

const ProjectLinkSchema = new Schema({
  dapp: { type: String, required: false },
  website: { type: String, required: false },
  docs: { type: String, required: false },
  explorer: { type: String, required: false },
  socials: { type: [SocialSchema], required: false },
});

const ImageSchema = new Schema({
  logo: { type: String, required: true },
  cover: { type: String, required: true },
  screenshots: { type: [String], required: true },
});

const ProjectSchema = new Schema({
  slug: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  tagline: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["active", "beta", "inactive", "deprecated"],
    default: "inactive",
  },
  images: {
    type: ImageSchema,
  },
  categories: {
    type: [String],
    enum: [
      "defi",
      "dex",
      "nft",
      "gaming",
      "dao",
      "oracle",
      "wallet",
      "infrastructure",
      "other",
    ],
    required: true,
  },
  productType: {
    type: String,
    enum: ["qrng", "datafeed"],
    required: true,
  },
  chains: {
    type: [String],
    enum: chains,
    required: true,
  },
  proxies: {
    type: Schema.Types.Mixed,
  },
  year: {
    type: Number,
    required: true,
  },
  links: {
    type: ProjectLinkSchema,
  },
  upvotes: {
    type: Number,
    default: 0,
  },
});

export const Project = mongoose.model("projects", ProjectSchema);
