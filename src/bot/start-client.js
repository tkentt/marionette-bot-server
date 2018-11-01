/* eslint-disable no-console */
import prisma from '../prisma';
import { TOKEN } from '../config';

const startClient = (client) => {
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
    const channels = guilds[i].channels.array()
      .filter(channel => channel.type === 'text');
    const members = guilds[i].members.array();

    await prisma.mutation.upsertGuild({
      where: { discordId: guild.discordId },
      create: guild,
      update: guild
    });

    upsertGuildChannels(guild, channels);
    upsertGuildMembers(guild, members);
  }

  return;
};

const upsertGuildChannels = async(guild, channels) => {
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
};

const upsertGuildMembers = async(guild, members) => {
  for (let k=0; k<members.length; k++) {
    let member = {
      discordId: members[k].user.id,
      username: members[k].user.username,
      guilds: {
        connect: { discordId: guild.discordId }
      }
    };

    await prisma.mutation.upsertUser({
      where: { discordId: member.discordId },
      create: member,
      update: member
    });
  }
};

export default startClient;