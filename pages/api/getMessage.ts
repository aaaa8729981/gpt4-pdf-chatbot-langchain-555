import { NextApiHandler } from 'next';
import Client from '@replit/database';

const db = new Client();

const handler: NextApiHandler = async (req, res) => { 
   const { userInput } = req.body;
   const message = await db.get(userInput);
   res.status(200).json({ message: message });
}

export default handler;
