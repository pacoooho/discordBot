"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const client = new discord_js_1.Client();
const dotenv_1 = require("dotenv");
dotenv_1.config();
const config_json_1 = require("./config.json");
client.on('ready', () => {
    console.log("Bot is ready");
});
client.on('message', (message) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    console.log(message.content);
    if (message.content.startsWith(`${config_json_1.prefix}ping`)) {
        console.log("PONG");
        message.channel.send('🚀 pong');
        //message.reply('!🚀pong'); 
    }
    if (message.content.startsWith(`${config_json_1.prefix}kick`)) {
        if ((_a = message.member) === null || _a === void 0 ? void 0 : _a.hasPermission(['KICK_MEMBERS'])) {
            console.log('kick');
            const member = (_b = message.mentions.members) === null || _b === void 0 ? void 0 : _b.first();
            if (member) {
                const kickedMember = yield member.kick();
                console.log(`${kickedMember.user.username} has been kicked`);
                return message.channel.send(`${kickedMember.user.username} has been kicked`);
            }
        }
        return message.reply('you need permissions to do this');
    }
    if (message.content.startsWith(`${config_json_1.prefix}deletemessages`)) {
        const messages = yield message.channel.messages.fetch();
        try {
            console.log("object");
            console.log("messages ", messages);
            yield message.channel.bulkDelete(messages);
            const messages2 = yield message.channel.messages.fetch();
            console.log("messages2 ", messages2);
        }
        catch (err) {
            console.log(Error), err;
        }
    }
}));
client.login(process.env.DISCORD_TOKEN);
