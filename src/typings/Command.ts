import CoreBot from "../structures/CoreBot";
import { Message } from "guilded.js";

interface RunOptions {
    client: CoreBot;
    message: Message;
    args: string[];
};

type Run = (options: RunOptions) => any;

export type CommandType = {
    name: string;
    description: string;
    aliases?: string[];
    run: Run;
};