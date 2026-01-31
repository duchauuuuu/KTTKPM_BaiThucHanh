const amqp = require('amqplib');

async function getMessage() {
  try {
    console.log('Connecting to RabbitMQ...');

    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();

    const queue = 'demo_queue';
    await channel.assertQueue(queue);

    console.log('⏳ Waiting for messages...');

    channel.consume(queue, (msg) => {
      if (msg !== null) {
        console.log('📩 Received:', msg.content.toString());

        // xác nhận xử lý xong message
        channel.ack(msg);
      }
    });

  } catch (err) {
    console.error('❌ Error:', err.message);
  }
}

getMessage();
