import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { FaMapMarkedAlt } from "react-icons/fa";

const cities = [
  { name: "Colombo", lat: 6.9271, lng: 79.8612 },
  { name: "Kandy", lat: 7.2906, lng: 80.6337 },
  { name: "Galle", lat: 6.0329, lng: 80.2168 },
  { name: "Jaffna", lat: 9.6615, lng: 80.0255 },
  { name: "Dambulla", lat: 7.8731, lng: 80.6511 },
  { name: "Anuradhapura", lat: 8.3114, lng: 80.4037 },
];

function getDistance(lat1, lon1, lat2, lon2) {
  const R = 6371;

  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
}

export default function SriLankaMap() {
  const [userPos, setUserPos] = useState(null);
  const [nearestCity, setNearestCity] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;

        setUserPos({ lat: latitude, lng: longitude });

        const closest = cities
          .map((city) => ({
            ...city,
            dist: getDistance(latitude, longitude, city.lat, city.lng),
          }))
          .sort((a, b) => a.dist - b.dist)[0];

        setNearestCity(closest);
      },
      (err) => console.log(err)
    );
  }, []);

  return (
    <section className="w-full min-h-screen bg-white text-black py-10">

      {/* HEADER */}
      <div className="max-w-6xl mx-auto px-6 mb-8 text-center">

        <h2 className="text-4xl md:text-5xl sm:text-6xl font-extrabold  leading-tight perspective-1000 tracking-tight">
          Find Food <span className="text-5xl sm:text-6xl font-extrabold text-orange-500  leading-tight perspective-1000">Near You</span>
        </h2>

        <p className="text-gray-500 mt-3 text-lg">
          Discover nearby cities and explore restaurants & delivery options in Sri Lanka 🇱🇰
        </p>

        <div className="mt-4 flex justify-center">
          <div className="flex items-center gap-2 text-orange-500 font-semibold">
            <FaMapMarkedAlt />
            Live Location Based Search
          </div>
        </div>

      </div>

      {/* MAP CARD */}
      <div className="max-w-6xl mx-auto px-6">
        <div className="overflow-hidden rounded-[32px] border border-orange-500/20 bg-zinc-900 shadow-[0_0_60px_rgba(249,115,22,0.15)]">
          <MapContainer
            center={[7.8731, 80.7718]}
            zoom={8}
            className="h-[500px] w-full"
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

            {cities.map((city) => (
              <Marker key={city.name} position={[city.lat, city.lng]}>
                <Popup>{city.name}</Popup>
              </Marker>
            ))}

            {userPos && (
              <Marker position={[userPos.lat, userPos.lng]}>
                <Popup>Your Location</Popup>
              </Marker>
            )}
          </MapContainer>
        </div>
      </div>

    </section>
  );
}