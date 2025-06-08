import type { NextApiRequest, NextApiResponse } from 'next'

const logs = [
  {
    group: "Shill Group A",
    message: "🔥 $FOOF is HERE and changing the game!",
    timestamp: new Date().toISOString(),
  },
  {
    group: "Degens United",
    message: "Don’t fade the alpha. $FOOF forever.",
    timestamp: new Date().toISOString(),
  }
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json(logs);
}