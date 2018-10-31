/* eslint-disable no-console */
import Discord from 'discord.js';
import prisma from './prisma';
import { TOKEN } from './config';

const client = new Discord.Client();

const startClient = () => {
  client.login(TOKEN);
  client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);
    upsertGuilds(client.guilds.array())
      .then(() => upsertChannels(client.channels.array()))
      .then(() => upsertUsers(client.guilds.array()))
      .catch(err => console.log(err));
  });
};

const upsertGuilds = async guilds => {
  for (let i=0; i<guilds.length; i++) {
    const guild = {
      discordId: guilds[i].id,
      name: guilds[i].name
    };

    await prisma.mutation.upsertGuild({
      where: { discordId: guild.discordId },
      create: guild,
      update: guild
    });

    const channels = await guilds[0].channels.array()
      .filter(channel => channel.type === 'text');

    for (let j=0; j<channels.length; j++) {
      const channel = {
        discordId: channels[j].id,
        name: channels[j].name,
        guild: {
          connect: { discordId: guild.discordId }
        }
      };

      await prisma.mutation.upsertChannel({
        where: { discordId: channel.discordId },
        create: channel,
        update: channel
      });
    }

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

const upsertUsers = async guilds => {
  const users = {};

  return;
};

export default startClient;