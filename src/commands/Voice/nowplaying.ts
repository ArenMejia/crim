import { Message } from 'discord.js';
import { Command } from 'discord-akairo';
import CrimClient from '../../lib/CrimClient';
import { getLogger } from '@log4js2/core';
import { MessageEmbed } from 'discord.js';
import CrimPlayer from '../../lib/structs/CrimPlayer';
import humanizeDuration from 'humanize-duration';

const logger = getLogger('Crim');

class NowPlayingCommand extends Command {
  client: CrimClient;
  constructor() {
    super('nowplaying', {
      aliases: ['nowplaying', 'np'],
      channel: 'guild',
      description: 'Show the surrently playing track.',
    });
  }

  async exec(message: Message) {
    logger.debug('NOWPLAYING COMMAND');
    const player = this.client.music.players.get(message.guild.id) as CrimPlayer;
    if (!player) return message.channel.send('No music running.');
    const embed = new MessageEmbed()
      .setTitle('🎵 Now playing')
      .setColor('#ffd1dc')
      .setDescription(player.nowPlaying.title)
      .addField('Position', humanizeDuration(Math.floor(player.state.position), { maxDecimalPoints: 0 }), true)
      .addField('Time', humanizeDuration(Math.floor(player.state.time / 10000000), { maxDecimalPoints: 0 }), true);
    message.channel.send(embed);
  }
}

export default NowPlayingCommand;
