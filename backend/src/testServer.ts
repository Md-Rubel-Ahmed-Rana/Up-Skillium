import express from "express";

const createServer = () => {
  const app = express();
  app.use(express.json());
  return app;
};

export default createServer;
