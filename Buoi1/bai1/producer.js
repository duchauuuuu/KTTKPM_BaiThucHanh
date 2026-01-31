const amqp = require('amqplib');

async function pushMessage() {
  try {
    console.log('Connecting to RabbitMQ...');

    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();

    const queue = 'demo_queue';
    await channel.assertQueue(queue);

    const messages = [
      'Xin chào mình là Nguyễn Đức Hậu 1',
      'Xin chào mình là Nguyễn Đức Hậu 2',
      'Xin chào mình là Nguyễn Đức Hậu 3'
    ];

    messages.forEach(msg => {
      channel.sendToQueue(queue, Buffer.from(msg));
      console.log('✔ Sent:', msg);
    });

    setTimeout(() => {
      connection.close();
      process.exit(0);
    }, 500);

  } catch (err) {
    console.error('❌ Error:', err.message);
  }
}

pushMessage();
