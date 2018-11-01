const sendMessage = async(client, channelId, message) => {
  const ready = client.readyAt;
  if (ready) {
    const channel = await client.channels.find('id', channelId);
    return channel ? channel.send(message) : null;
  }

  return null;
};

export default sendMessage;