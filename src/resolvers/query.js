const Query = {
  user(parent, args, { prisma, request }, info) {
    return prisma.query.user({
      where: { discordId: request.user.discordId }
    }, info);
  }
};

export default Query;