/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import prisma from '../prisma';
import { upsertGuildChannels, upsertGuildMembers } from './start-client';

const handleEvents = client => {
  client.on('channelCreate', async channel => {
    if (channel.type === 'text') {
      const guild = await prisma.query.guild({ where:{ discordId:  channel.guild.id } });

      if (guild) {
        const data = {
          discordId: channel.id,
          name: channel.name,
          guild: {
            connect: { discordId: guild.discordId }
          }
        };
        await prisma.mutation.createChannel({ data });
        console.log('text channel created');
      } else {
        console.log('create guild first');
      }
    } else {
      console.log('voice channel ignored');
    }
  });

  client.on('channelDelete', async channel => {
    if (channel.type === 'text') {
      await prisma.mutation.deleteChannel({
        where: { discordId: channel.id }
      });
      console.log('channel deleted');
    } else {
      console.log('voice channel ignored');
    }
  });

  client.on('channelUpdate', async(oldChannel, newChannel) => {
    if (oldChannel.type === 'text') {
      const data = {
        discordId: newChannel.id,
        name: newChannel.name
      };
      await prisma.mutation.updateChannel({
        where: { discordId: oldChannel.id },
        data
      });
      console.log('channel updated');
    } else {
      console.log('voice channel ignored');
    }
  });

  client.on('guildCreate', async guild => {
    const data = {
      discordId: guild.id,
      name: guild.name
    };
    const channels = guild.channels.array()
      .filter(channel => channel.type === 'text');
    const members = guild.members.array();

    await prisma.mutation.createGuild({ data });
    upsertGuildChannels(data, channels);
    upsertGuildMembers(data, members);
    console.log('guild created');
  });

  client.on('guildDelete', async guild => {
    await prisma.mutation.deleteGuild({
      where: { discordId: guild.id }
    });
    console.log('guild deleted');
  });

  client.on('guildUpdate', async(oldGuild, newGuild) => {
    const data = {
      discordId: newGuild.id,
      name: newGuild.name
    };
    await prisma.mutation.updateGuild({
      where: { discordId: oldGuild.id },
      data
    });
    console.log('guild updated');
  });

  client.on('guildMemberAdd', async member => {
    const data = {
      discordId: member.user.id,
      username: member.user.username,
      guilds: {
        connect: { discordId: member.guild.id }
      }
    };

    await prisma.mutation.upsertUser({
      where: { discordId: data.discordId },
      create: data,
      update: data
    });
    console.log('member added');
  });

  client.on('guildMemberRemove', async member => {
    const data = {
      discordId: member.user.id,
      username: member.user.username,
      guilds: {
        disconnect: { discordId: member.guild.id }
      }
    };

    await prisma.mutation.updateUser({
      where: { discordId: data.discordId },
      data
    });
    console.log('member removed');
  });
};

export default handleEvents;