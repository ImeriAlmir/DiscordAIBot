import { Message } from "discord.js";

class BaseCommand {

    private prefix: string;

    constructor(prefix: string) {
        this.prefix = prefix;
    }

    async execute(message: Message, args: string[]) {

    }
}

export default BaseCommand;