import { Command } from "../../structures/Command";
import fs from "fs";
import { CommandType } from "../../typings/Command";
import { toPascalCase } from "../../utils/";
import { Embed } from "guilded.js";

type CategoryType = {
    name: string;
    value: string;
};

export default new Command({
    name: "help",
    description: `View a list of the bot's commands.`,
    aliases: ["commands"],
    run: ({ client, message, args }) => {
        const prefix = ".";

        if (!args[0]) {
            const categories: CategoryType[] = [];

            fs.readdirSync("./src/commands/").forEach(async (dir) => {
                const filteredCommands = fs.readdirSync(`./src/commands/${dir}/`).filter((file) => file.endsWith(".ts"));

                const commands = filteredCommands.map((fileName) => {
                    const command: CommandType = require(`../${dir}/${fileName}`).default;
                    if (!command.name) return "❌";

                    return `\`${command.name}\``;
                });
                
                categories.push({
                    name: toPascalCase(dir),
                    value: commands.length === 0 ? "❌" : commands.join(" "),
                });
            });

            const helpEmbed = new Embed()
            .setColor("#00BFFF")
            .setAuthor(`📬 Commands`)
            .addFields(categories)
            .setDescription(`❗ Use \`${prefix}help [command]\` to receive additional information on a command.`)
            .setTimestamp();

            return message.reply({ embeds: [helpEmbed] });
        } else {
            let commandName = args[0].toLowerCase();

            const command = client.commands.get(commandName) || client.commands.find((c) => c.aliases && c.aliases.includes(commandName));

            commandName = toPascalCase(commandName);

            if (!command) return message.reply({ content: `❌ That command does not exist.` });

            const commandEmbed = new Embed()
            .setAuthor(`📬 ${commandName}`)
            .setDescription(command.description)
            .setColor("#00BFFF");
            if (command.aliases) commandEmbed.addField(`Aliases`, `\`${command.aliases?.join(" ")}\``);

            return message.reply({ embeds: [commandEmbed] });
        };
    },
});