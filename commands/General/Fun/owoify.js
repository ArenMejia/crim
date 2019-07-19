const { Command } = require('klasa');
const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            requiredSettings: ['EMBED_LINKS'],
            aliases: ['owo'],
            cooldown: 5,
            description: language => language.get('COMMAND_OWOIFY_DESCRIPTION'),
            usage: '<text:string>',
        });
    }

    async run(message, [text]) {
        let owoified = text.replace(/r|l/g, "w").replace(/R|L/g, "W").replace(/owo/i, 'OwO').replace(/uwu/i, 'UwU');
        let embed = new MessageEmbed()
        .setColor('#dd67ff')
        .addField('OwOified', owoified)
        .addField('Original', text)
        .setFooter(`Requested by: ${message.author.tag}`)
        .setTimestamp()
        ;
        message.send(embed);
        if (message.deletable) await message.delete();
    }

};