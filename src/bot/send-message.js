const sendMessage = async(client, channelId, message) => {
  const ready = client.readyAt;
  if (ready) {
    const channel = await client.channels.find('id', channelId);
    return channel.send(message);
  }
  return null;
};

export default sendMessage;