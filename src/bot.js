/* eslint-disable no-console */
import Discord from 'discord.js';
import prisma from './prisma';
import { TOKEN } from './config';

const client = new Discord.Client();

const initializeBot = () => {
  client.login(TOKEN);
  client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);
    upsertGuilds(client.guilds.array())
      .then(() => upsertChannels(client.channels.array()))
      .catch(err => console.log(err));
  });
};

const upsertGuilds = async guilds => {
  const newGuilds = await guilds.map(guild => ({
    discordId: guild.id,
    name: guild.name
  }));

  for (let i=0; i<newGuilds.length; i++) {
    await prisma.mutation.upsertGuild({
      where: { discordId: newGuilds[i].discordId },
      create: newGuilds[i],
      update: newGuilds[i]
    });
  }

  return;
};

const upsertChannels = async channels => {
  const newChannels = await channels
    .filter(channel => channel.type === 'text')
    .map(channel => ({
      discordId: channel.id,
      name: channel.name,
      guild: {
        connect: { discordId: channel.guild.id }
      }
    }));

  for (let i=0; i<newChannels.length; i++) {
    await prisma.mutation.upsertChannel({
      where: { discordId: newChannels[i].discordId },
      create: newChannels[i],
      update: newChannels[i]
    });
  }

  return;
};

export default initializeBot;