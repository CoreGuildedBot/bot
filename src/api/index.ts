import mongoose from "mongoose";
import logger from "../utils/logger";
import createApp from "./utils/createApp";

async function main() {
    const app = createApp();

    await mongoose.connect(`${process.env.MONGODB_URI}`)
    .then(() => logger.info(`Connected to the database.`))
    .catch((err) => logger.error(err));

    const port = process.env.PORT || 4000;
    app.listen(port, () => logger.info(`API Server listening on port ${port}!`));
};

main();