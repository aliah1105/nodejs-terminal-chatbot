import openai from "./configs/open-ai.js";
import readlineSync from 'readline-sync';
import colors from 'colors';

async function main() {
    console.log(colors.bold.green('Welcome to the terminal ChatBot'));
    console.log(colors.bold.green('You can start chat with me :)'));
    const chatHistory = [];
    while (true) {
        const userInput = readlineSync.question(colors.yellow('You: '))
        try {
            const messages = chatHistory.map(([role, content]) => ({ role, content }))
            messages.push({ role: 'user', content: userInput })
            const chatCompletion = await openai.chat.completions.create({
                model: 'gpt-3.5-turbo',
                messages: messages,
            });
            const completionText = chatCompletion.choices[0].message.content;
            if (userInput.toLocaleLowerCase() === 'exit') {
                console.log(colors.green('Bot: '), completionText);
                return;
            }
            console.log(colors.green('Bot: '), completionText);
            chatHistory.push(['user', userInput]);
            chatHistory.push(['assistant', completionText]);
        } catch (error) {
            console.log(colors.red(error));
        }
    }
}

main();
