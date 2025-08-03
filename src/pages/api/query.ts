import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST requests allowed' });
  }

  const { message } = req.body;
  const apiKey = 'AIzaSyCloU7X6LLaAJ1vY_134tI_JVx7ZHPszvw';

  try {
    const geminiRes = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [
            {
              role: 'user',
              parts: [{ text: message }],
            },
          ],
        }),
      }
    );

    const data = await geminiRes.json();

    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || 'Sorry, I couldn’t find an answer.';
    return res.status(200).json({ reply });
  } catch (err: any) {
    console.error('Gemini API Error:', err);
    return res.status(500).json({ error: 'Failed to fetch from Gemini API' });
  }
}
