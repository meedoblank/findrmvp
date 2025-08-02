// pages/api/flight.js

export default async function handler(req, res) {
  const { origin, destination, depart_date } = req.query;

  // MOCK DATA: Bangkok (BKK) → Chiang Mai (CNX)
  const mockData = {
    origin,
    destination,
    depart_date,
    currency: "USD",
    results: [
      {
        company: "Thai Airways",
        mode: "flight",
        price: 99,
        departure_time: "2025-08-15T08:30:00",
        arrival_time: "2025-08-15T10:00:00",
        duration: "1h 30m"
      },
      {
        company: "AirAsia",
        mode: "flight",
        price: 75,
        departure_time: "2025-08-15T14:00:00",
        arrival_time: "2025-08-15T15:30:00",
        duration: "1h 30m"
      },
      {
        company: "Greenbus",
        mode: "bus",
        price: 20,
        departure_time: "2025-08-15T09:00:00",
        arrival_time: "2025-08-15T18:00:00",
        duration: "9h 0m"
      }
    ]
  };

  return res.status(200).json(mockData);
}
