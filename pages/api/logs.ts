import type { NextApiRequest, NextApiResponse } from 'next';
import { Redis } from '@upstash/redis';

// Init Redis
const redis = new Redis({
  url: process.env.LEADERBOARDDB_KV_REST_API_URL!,
  token: process.env.LEADERBOARDDB_KV_REST_API_TOKEN!,
});

const LOG_KEY = 'logs:telegram';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    // Haal laatste 100 logs op (laatste eerst)
    const logs = await redis.lrange<string>(LOG_KEY, -100, -1);
    const parsed = logs.map((entry) => {
      try {
        return JSON.parse(entry);
      } catch {
        return { raw: entry };
      }
    });
    return res.status(200).json(parsed.reverse());
  }

  if (req.method === 'POST') {
    const { group, message, timestamp = Date.now() } = req.body;

    if (!group || !message) {
      return res.status(400).json({ error: 'group and message are required' });
    }

    const logEntry = {
      group,
      message,
      timestamp,
    };

    await redis.rpush(LOG_KEY, JSON.stringify(logEntry));
    return res.status(200).json({ success: true });
  }

  res.status(405).end();
}