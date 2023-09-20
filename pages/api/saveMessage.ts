import { NextApiHandler } from 'next';
import Client from '@replit/database';

const db = new Client();

const handler: NextApiHandler = async (req, res) => { 
   const { userInput, aiOutput } = req.body;
   await db.set(userInput, aiOutput);
   res.status(200).json({ status: 'success' });
}

export default handler;
