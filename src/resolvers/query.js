const Query = {
  user(parent, args, { prisma }) {
    return prisma.query.user({
      where: { discordId: args.where.discordId }
    });
  },
  users(parent, args, { prisma }, info) {
    return prisma.query.users(null, info);
  },
  guild(parent, args, { prisma }) {
    return prisma.query.guild({
      where: { discordId: args.where.discordId }
    });
  },
  guilds(parent, args, { prisma }, info) {
    return prisma.query.guilds(null, info);
  },
  channel(parent, args, { prisma }) {
    return prisma.query.channel({
      where: { discordId: args.where.discordId }
    });
  },
  channels(parent, args, { prisma }, info) {
    return prisma.query.channels(null, info);
  }
};

export default Query;