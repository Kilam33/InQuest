import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Enable CORS with proper origin handling
  const allowedOrigins = [
    process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'https://in-quest-ten.vercel.app',
    'http://localhost:5222', // For local development
    'http://localhost:3000', // Alternative local dev port
  ];
  
  const origin = req.headers.origin;
  if (origin && allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  } else {
    res.setHeader('Access-Control-Allow-Origin', allowedOrigins[0]);
  }
  
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { q, limit = 10 } = req.body;
  const apiKey = process.env.VITE_CORE_API_KEY || process.env.CORE_API_KEY;

  if (!q) {
    return res.status(400).json({ error: 'Query parameter is required' });
  }

  if (!apiKey) {
    return res.status(500).json({ error: 'API key not configured' });
  }

  try {
    const response = await fetch('https://api.core.ac.uk/v3/search/works', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        q: q,
        limit: parseInt(limit as string),
        offset: 0,
      }),
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error('Search API error:', error);
    res.status(500).json({ error: 'Failed to fetch search results' });
  }
} 