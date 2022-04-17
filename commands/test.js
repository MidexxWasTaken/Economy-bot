module.exports = {
  name: 'test',
  execute(client, message, args) {
    console.log(`Attempting to execute Command ::${this.name}:: with args [${args}]`);
    message.channel.send('This is a test');
  }
}