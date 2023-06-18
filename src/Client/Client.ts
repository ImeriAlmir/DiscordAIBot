require("dotenv").config();
import { Client, GatewayIntentBits, Events, Guild, Message } from "discord.js";

import LoggingService from "../services/Logging/LoggingService";
import BaseCommand from "../commands/BaseCommand/BaseCommand";
import GPTCommand from "../commands/GPTCommand/GPTCommand";

export class DiscordBot {
    private static instance: DiscordBot;
    private client: Client;
    private BOT_TOKEN: string = process.env.BOT_TOKEN || "";
    private GUILD_ID: string = process.env.GUILD_ID || "";
    private guild: Guild | undefined;
    private prefix = ".";
    private LOGGER: LoggingService;
    private commands: { [key: string]: BaseCommand; };


    public constructor() {
        this.LOGGER = new LoggingService();

        this.client = new Client({
            intents: [
                GatewayIntentBits.GuildMessages,
                GatewayIntentBits.MessageContent,
                GatewayIntentBits.Guilds
            ]
        });

        this.guild = this.client.guilds.cache.get(this.GUILD_ID);

        this.commands = {
            astraea: new GPTCommand(this.prefix + "astraea"),
        };

        this.client.once(Events.ClientReady, async () => {
            this.guild = await this.client.guilds.fetch(this.GUILD_ID);
            this.LOGGER.info("BOT IS UP AND READY");
        });

        this.client.on(Events.MessageCreate, async (message: Message) => {
            if (!message.content.startsWith(this.prefix) || message.author.bot) return;

            const args = message.content.slice(this.prefix.length).trim().split(/ +/);
            const commandName = args.shift()?.toLowerCase();
            const command = this.commands[commandName];

            if (command) {
                await command.execute(message, args);
            }
        });

    }

    public static getInstance(): DiscordBot {
        if (!DiscordBot.instance) {
            DiscordBot.instance = new DiscordBot();
        }

        return DiscordBot.instance;
    }

    public async start() {
        this.client.login(this.BOT_TOKEN);
    }

}