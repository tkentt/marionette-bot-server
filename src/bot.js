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

    const channels = guilds[i].channels.array()
      .filter(channel => channel.type === 'text');

    for (let j=0; j<channels.length; j++) {
      let channel = {
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

    const members = guilds[i].members.array();

    for (let k=0; k<members.length; k++) {
      let member = {
        discordId: members[k].user.id,
        username: members[k].user.username,
        guilds: {
          connect: { discordId: guild.discordId }
        }
      };

      console.log(member);
      // console.log(guild, channel);
      await prisma.mutation.upsertUser({
        where: { discordId: member.discordId },
        create: member,
        update: member
      });
    }
  }

  return;
};

export default startClient;