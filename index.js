import openai from "./configs/open-ai.js";

async function main() {
    const chatCompletion = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [{
            role: 'user', content: 'Hello'
        }],
    });
    console.log(chatCompletion.choices[0].message.content);
}

main();
