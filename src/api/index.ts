import logger from "../utils/logger";
import createApp from "./utils/createApp";

async function main() {
    const app = createApp();

    const port = process.env.PORT || 4000;
    app.listen(port, () => logger.info(`API Server listening on port ${port}!`));
};

main();