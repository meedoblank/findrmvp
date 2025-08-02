export default async function handler(req, res) {
  const { origin, destination, depart_date } = req.query;

  const token = 'c4a7138fa73e43e8bdb0d28d6d5f529f';
  const apiUrl = `https://api.travelpayouts.com/v1/prices/direct?origin=${origin}&destination=${destination}&depart_date=${depart_date}&token=${token}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({ error: 'Failed to fetch flight data' });
    }

    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: 'Proxy server error', details: error.message });
  }
}
