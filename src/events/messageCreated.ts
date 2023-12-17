import { client } from "..";
import { Embed, UserType } from "guilded.js";

client.on("messageCreated", async (message) => {
    if (message.author?.type !== UserType.User || !message.serverId) return;

    const prefix = ".";
    if (!message.content.toLowerCase().startsWith(prefix)) return;

    const [cmd, ...args] = message.content.slice(prefix.length).trim().split(/ +/g);

    const command = client.commands.get(cmd.toLowerCase()) || client.commands.find(c => c.aliases?.includes(cmd.toLowerCase()));
    
    if (!command) return;
    
    try {
        await command.run({ client, message, args });
    } catch (err) {
        const errorEmbed = new Embed()
        .setColor("RED")
        .setDescription(`⚠️ ${err}`);
        return message.reply({ embeds: [errorEmbed] });
    };
});