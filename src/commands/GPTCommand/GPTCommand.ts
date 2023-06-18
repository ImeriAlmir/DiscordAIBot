import GPTService from "../../services/GPTService/GPTService";
import BaseCommand from "../BaseCommand/BaseCommand";
import { Message } from "discord.js";

class GPTCommand extends BaseCommand {

    private gptService: GPTService = new GPTService();

    async execute(message: Message<boolean>, args: string[]): Promise<void> {
        const query = args.join(' ');

        if (!query) {
            message.reply("please provide a query");
            return;
        }

        try {
            const response = await this.gptService.generateResponse(query);
            message.reply(`${response}`);
        } catch (error) {
            console.log(error);
            message.reply("error yike");
        }
    }
}

export default GPTCommand;