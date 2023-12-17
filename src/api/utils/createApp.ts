import express, { Express } from "express";

import { router } from "../routes";

export default function createApp(): Express {
    const app = express();

    app.use("/", router);

    return app;
};