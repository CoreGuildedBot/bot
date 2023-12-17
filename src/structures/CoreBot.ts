import { glob } from "glob";
import { Client, Collection } from "guilded.js";
import { promisify } from "util";
import { CommandType } from "../typings/Command";
import logger from "../utils/logger";

const globPromise = promisify(glob);

export default class CoreBot extends Client {
    commands: Collection<string, CommandType> = new Collection<string, CommandType>();
    logger = logger;

    constructor() {
        super({
            token: `${process.env.ENVIRONMENT === "PRODUCTION" 
                ? process.env.TOKEN 
                : process.env.BETA_TOKEN}`
        });
    };

    async load() {
        // Commands

        const commandsFiles = await globPromise(`${__dirname}/../commands/*/*.{ts,js}`);
        commandsFiles.forEach(async (filePath) => {
            const command: CommandType = await this.importFile(filePath);
            if (!command.name) return;
            this.commands.set(command.name, command);
        });

        // Events

        const eventFiles = await globPromise(`${__dirname}/../events/*.{ts,js}`);

        eventFiles.forEach(async (filePath) => {
            await this.importFile(filePath);
        });
    };

    async importFile(filePath: string) {
        return (await import(filePath))?.default;
    };

    async build() {
        this.load()
        .then(() => logger.info(`Loaded ${this.commands.size} commands.`));
        this.login();
    };
};