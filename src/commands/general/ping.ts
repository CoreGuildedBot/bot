import { Command } from "../../structures/Command";

export default new Command({
    name: "ping",
    description: `Check if the bot is alive.`,
    run: ({ message }) => {
        return message.reply({ content: `🏓 Pong!` });
    },
});