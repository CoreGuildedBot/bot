import { config } from "dotenv";
config();

// Load API Server
import "./api/";

import CoreBot from "./structures/CoreBot";

export const client = new CoreBot();

client.build();