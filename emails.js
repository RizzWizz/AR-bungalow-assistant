export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const { path } = req.query;
  const accessToken = req.headers.authorization?.replace('Bearer ', '');
  if (!accessToken) return res.status(401).json({ error: 'No token' });

  try {
    const url = path
      ? `https://gmail.googleapis.com/gmail/v1/users/me/messages/${path}?format=full`
      : `https://gmail.googleapis.com/gmail/v1/users/me/messages?maxResults=15&q=is:inbox`;
    const response = await fetch(url, {
      headers: { Authorization: 'Bearer ' + accessToken }
    });
    const data = await response.json();
    res.status(200).json(data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
