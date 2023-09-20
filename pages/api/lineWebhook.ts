import express from 'express';
import { config } from 'dotenv';

config();

const app = express();

app.use(express.json());

app.post('/line-webhook', async (req, res) => {
  try {
    const { events } = req.body;

    for (const event of events) {
      if (event.type === 'message' && event.message.type === 'text') {
        const userMessage = event.message.text;

        // 在这里调用处理消息的函数
        // 这里可以调用您的 makeChain 或其他逻辑
        // 处理完消息后，可以将回复消息发送回 LINE
        // 例如：const responseMessage = await handleMessage(userMessage);
        // await replyToLine(event.replyToken, responseMessage);
      }
    }

    res.status(200).send('OK');
  } catch (error) {
    console.error('Error handling LINE webhook:', error);
    res.status(500).send('Internal Server Error');
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
