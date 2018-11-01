import client from '../bot/client';
import sendMessage from '../bot/send-message';

const Mutation = {
  createMessage(parent, args, { prisma, request }) {
    const data = { ...args.data, userId: request.user.discordId };
    sendMessage(client, data.channelId, data.content);
    return prisma.mutation.createMessage({ data });
  },
};

export default Mutation;