const sendMessage = async(client, channelId, message, guildId, userId) => {
  const ready = client.readyAt;
  if (ready) {
    const channel = await client.channels.find(channel => {
      return channel.id === channelId;
    });
    return channel ? channel.send(message) : null;
  }

  return null;
};

export default sendMessage;