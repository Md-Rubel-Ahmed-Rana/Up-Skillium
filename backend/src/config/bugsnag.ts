import Bugsnag from "@bugsnag/js";
import BugsnagPluginExpress from "@bugsnag/plugin-express";
import config from "./envConfig";
import ApiError from "@/shared/apiError";
import { HttpStatusCode } from "@/lib/httpStatus";

const apiKey = config.bugsnag.apiKey;

if (!apiKey) {
  throw new ApiError(HttpStatusCode.BAD_REQUEST, "BUGSNAG_API_KEY is missing");
}

Bugsnag.start({
  apiKey,
  plugins: [BugsnagPluginExpress],
  releaseStage: config.app.env || "development",
  appVersion: process.env.npm_package_version || "1.0.0",

  enabledReleaseStages: ["production", "staging", "development"],

  onError(event) {
    // You can redact or enrich here if needed
    return true;
  },
});

export const BugsnagConfig = Bugsnag;
