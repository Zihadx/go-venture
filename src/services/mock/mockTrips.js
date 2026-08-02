// Bookable trip catalog for the customer-facing flow. Reuses the same
// destinations/packages vocabulary as the admin mock data so a trip booked
// here shows up coherently in the admin Bookings/Analytics pages.

const TRIP_SEED = [
  {
    city: "Guilin", country: "China",
    image: "https://i.ibb.co/GnWHBcg/Guilin1.jpg",
    title: "Historical Journey Through China",
    description: "Karst mountains, the Li River, and centuries of history around Guilin.",
    category: "Cultural",
  },
  {
    city: "Tokyo", country: "Japan",
    image: "https://i.ibb.co/0rLykrb/japan-b.jpg",
    title: "Tokyo & The Japanese Countryside",
    description: "Neon-lit Tokyo streets balanced with serene countryside national parks.",
    category: "Adventure",
  },
  {
    city: "Male", country: "Maldives",
    image: "https://i.ibb.co/6vCX4Jz/maldives.jpg",
    title: "Maldives Overwater Escape",
    description: "Turquoise lagoons, overwater villas, and reef diving in the Maldives.",
    category: "Beach",
  },
  {
    city: "Ocho Rios", country: "Jamaica",
    image: "https://i.ibb.co/q9jVCJy/jamaica-2.jpg",
    title: "Ocho Rios Beach Retreat",
    description: "Clear blue water and reggae rhythm on Jamaica's north coast.",
    category: "Beach",
  },
  {
    city: "Khulna", country: "Bangladesh",
    image: "https://i.ibb.co/547Tq2h/The-Sundarbans-bangladesh-1.jpg",
    title: "Sundarbans Wildlife Expedition",
    description: "Mangrove rivers and Royal Bengal Tiger territory in the world's largest mangrove forest.",
    category: "Wildlife",
  },
  {
    city: "Bali", country: "Indonesia",
    image: "https://picsum.photos/seed/bali-goventure/800/520",
    title: "Bali Temples & Rice Terraces",
    description: "Rice terrace hikes, temple ceremonies, and Ubud's art scene.",
    category: "Cultural",
  },
  {
    city: "Istanbul", country: "Turkiye",
    image: "https://picsum.photos/seed/istanbul-goventure/800/520",
    title: "Istanbul: Two Continents, One City",
    description: "Bazaars, Byzantine domes, and a Bosphorus sunset cruise.",
    category: "Cultural",
  },
  {
    city: "Cape Town", country: "South Africa",
    image: "https://picsum.photos/seed/capetown-goventure/800/520",
    title: "Cape Town & The Garden Route",
    description: "Table Mountain, penguin colonies, and coastal drives.",
    category: "Adventure",
  },
  {
    city: "Queenstown", country: "New Zealand",
    image: "https://picsum.photos/seed/queenstown-goventure/800/520",
    title: "Queenstown Adrenaline Circuit",
    description: "Bungee jumps, fjord cruises, and alpine lake views.",
    category: "Adventure",
  },
  {
    city: "Reykjavik", country: "Iceland",
    image: "https://picsum.photos/seed/reykjavik-goventure/800/520",
    title: "Iceland's Ring Road & Northern Lights",
    description: "Glacier lagoons, geysers, and a real shot at the aurora.",
    category: "Nature",
  },
  {
    city: "Marrakech", country: "Morocco",
    image: "https://picsum.photos/seed/marrakech-goventure/800/520",
    title: "Marrakech Medina & Sahara Nights",
    description: "Souks, riads, and a night under the stars in the Sahara.",
    category: "Cultural",
  },
  {
    city: "Banff", country: "Canada",
    image: "https://picsum.photos/seed/banff-goventure/800/520",
    title: "Banff National Park Explorer",
    description: "Turquoise glacial lakes and the Canadian Rockies.",
    category: "Nature",
  },
];

export const TRIP_CATALOG = TRIP_SEED.map((t, i) => ({
  id: `TRIP-${100 + i}`,
  ...t,
  destination: `${t.city}, ${t.country}`,
  duration: [5, 6, 7, 8, 10][i % 5],
  pricePerHead: [420, 650, 890, 1050, 1290, 1480][i % 6],
  rating: (4 + ((i * 7) % 10) / 10).toFixed(1),
  reviewCount: 40 + ((i * 37) % 260),
  maxTravelers: 8,
  highlights: [
    "Guided local tours included",
    "Airport transfers both ways",
    "4-star accommodation",
    "Daily breakfast included",
  ],
}));

export const TRIP_CATEGORIES = [...new Set(TRIP_CATALOG.map((t) => t.category))];

export function getTripByIdSync(id) {
  return TRIP_CATALOG.find((t) => t.id === id) || null;
}
