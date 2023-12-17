import logger from "../../utils/logger";

const url = process.env.API_URL || `http://localhost:${process.env.PORT || 4000}`;
let count = 0;

logger.info(`keepAlive.ts running... (${url})`);
setInterval(async () => {
    try {
        await fetch(url);
        logger.info(`[${count++}] Kept ${url} alive.`);
    } catch {
        logger.error(`[${count++}] Error keeping ${url} alive.`);
    };
}, 5 * 60 * 1000);