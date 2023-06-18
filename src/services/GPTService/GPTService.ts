require("dotenv").config();
import axios from "axios";
class GPTService {

    private OPENAI_API_KEY = process.env.OPENAI_API_KEY;

    public async generateResponse(query: string) {

        try {
            const options = {
                method: 'POST',
                url: 'https://api.openai.com/v1/chat/completions',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${this.OPENAI_API_KEY}`,
                },
                data: {
                    model: 'gpt-3.5-turbo', messages: [
                        { role: 'user', content: `${query}` }
                    ]
                },
            };

            const data = await axios.request(options);
            const response = data.data.choices[0].message.content;
            return response;
        } catch (error) {
            console.error(error);
        }
    }
}

export default GPTService;