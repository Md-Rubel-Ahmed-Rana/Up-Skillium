import config from "./envConfig";

export const corsConfig = {
  origin: JSON.parse(config.app.corsOrigins),
  credentials: true,
};
