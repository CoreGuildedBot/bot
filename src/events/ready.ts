import { client } from "..";

client.on("ready", async () => {
    client.logger.info(`Logged in as ${client.user?.name}!`);

    // Initalise
    
    const servers = await client.fetchServers();
    client.servers.cache = servers;
    
    await updateStatus();
});

export async function updateStatus() {
    return await await client.setStatus({ emoteId: 90002093, content: `${client.servers.cache.size} servers` });
};