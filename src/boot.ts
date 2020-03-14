import { Client, Message } from 'discord.js';

const client: Client = new Client()
import { config } from 'dotenv';
config();
import { prefix } from './config.json';

client.on('ready', () => {
    console.log("Bot is ready");
});
client.on('message', async (message: Message) => {

    console.log(message.content);
    if (message.content.startsWith(`${prefix}ping`)) {
        console.log("PONG");
        message.channel.send('🚀 pong');
        //message.reply('!🚀pong'); 
    }
    if (message.content.startsWith(`${prefix}kick`)) {
        if (message.member?.hasPermission(['KICK_MEMBERS'])) {
            console.log('kick');
            const member = message.mentions.members?.first();
            if (member) {
                const kickedMember = await member.kick();
                console.log(`${kickedMember.user.username} has been kicked`);
                return message.channel.send(`${kickedMember.user.username} has been kicked`)
            }
        } return message.reply('you need permissions to do this')

    }

    if ( message.content.startsWith(`${prefix}deletemessages`)){
  const messages = await  message.channel.messages.fetch();
try{
    console.log("object");
    console.log("messages ", messages);
    await message.channel.bulkDelete(messages);
    const messages2 = await  message.channel.messages.fetch();
  
    console.log("messages2 ", messages2);
  
}catch(err){
    console.log(Error ), err;
}
    }
});


client.login(process.env.DISCORD_TOKEN);


