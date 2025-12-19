import { useEffect, useState } from "react";
import api from "../api/axios";
import "../styles/salonFinder.css";
import Footer from "../sections/Footer";

const getDistanceKm = (lat1, lon1, lat2, lon2) => {
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
  return (R * c).toFixed(1);
};

export default function SalonFinder() {
  const [salons, setSalons] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [nearMe, setNearMe] = useState(false);
  const [search, setSearch] = useState("");
  const [cityFilter, setCityFilter] = useState("");

  useEffect(() => {
    api.get("/salons").then((res) => setSalons(res.data));
  }, []);

  const detectLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
        setNearMe(true);
      },
      () => alert("Location permission denied")
    );
  };
  const hasSearch =
  search.trim() !== "" || cityFilter !== "" || nearMe;

  let displaySalons = hasSearch ? [...salons] : [];

  if (nearMe && userLocation) {
    displaySalons = displaySalons
      .filter((s) => s.location?.lat && s.location?.lng)
      .map((s) => ({
        ...s,
        distance: getDistanceKm(
          userLocation.lat,
          userLocation.lng,
          s.location.lat,
          s.location.lng
        ),
      }))
      .sort((a, b) => a.distance - b.distance);
  }

  if (cityFilter) {
    displaySalons = displaySalons.filter(
      (s) => s.city.toLowerCase() === cityFilter.toLowerCase()
    );
  }

  if (search) {
    displaySalons = displaySalons.filter(
      (s) =>
        s.name.toLowerCase().includes(search.toLowerCase()) ||
        s.city.toLowerCase().includes(search.toLowerCase())
    );
  }

  const cities = [...new Set(salons.map((s) => s.city))];

  return (
    <div className="salon-page">
      <div className="salon-hero">
        <h1 className="salon-title">SALON FINDER</h1>

        <div className="salon-search-bar">
          <input
            placeholder="Country, town, city or postcode..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            value={cityFilter}
            onChange={(e) => setCityFilter(e.target.value)}
          >
            <option value="">All Cities</option>
            {cities.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>

          <button onClick={detectLocation}>NEAR ME</button>
        </div>
      </div>

      <div className="salon-results">
        {hasSearch && displaySalons.length === 0 && (
  <p className="empty-text">No salons found</p>
)}

        {displaySalons.map((s) => (
          <div key={s._id} className="salon-card">
            <b>{s.name}</b>
            <small>{s.address}</small>
            <small>{s.city}</small>

            {s.distance && <p>📏 {s.distance} km away</p>}

            {s.location?.lat && (
              <iframe
                title={s.name}
                src={`https://www.google.com/maps?q=${s.location.lat},${s.location.lng}&z=15&output=embed`}
              />
            )}
          </div>
        ))}
      </div>

      <Footer />
    </div>
  );
}







// import { useEffect, useState } from "react";
// import api from "../api/axios";
// import "../styles/salonFinder.css";
// const getDistanceKm = (lat1, lon1, lat2, lon2) => {
//   const R = 6371;
//   const dLat = ((lat2 - lat1) * Math.PI) / 180;
//   const dLon = ((lon2 - lon1) * Math.PI) / 180;

//   const a =
//     Math.sin(dLat / 2) * Math.sin(dLat / 2) +
//     Math.cos((lat1 * Math.PI) / 180) *
//       Math.cos((lat2 * Math.PI) / 180) *
//       Math.sin(dLon / 2) *
//       Math.sin(dLon / 2);

//   const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//   return (R * c).toFixed(1);
// };

// export default function SalonFinder() {
//   const [salons, setSalons] = useState([]);
//   const [userLocation, setUserLocation] = useState(null);
//   const [nearMe, setNearMe] = useState(false);

//   const [search, setSearch] = useState("");
//   const [cityFilter, setCityFilter] = useState("");

//   useEffect(() => {
//     api.get("/salons").then((res) => setSalons(res.data));
//   }, []);

//   const detectLocation = () => {
//     navigator.geolocation.getCurrentPosition(
//       (pos) => {
//         setUserLocation({
//           lat: pos.coords.latitude,
//           lng: pos.coords.longitude,
//         });
//         setNearMe(true);
//       },
//       () => alert("Location permission denied")
//     );
//   };

//   let displaySalons = [...salons];

//   if (nearMe && userLocation) {
//     displaySalons = displaySalons
//       .filter((s) => s.location?.lat && s.location?.lng)
//       .map((s) => ({
//         ...s,
//         distance: getDistanceKm(
//           userLocation.lat,
//           userLocation.lng,
//           s.location.lat,
//           s.location.lng
//         ),
//       }))
//       .sort((a, b) => a.distance - b.distance);
//   }

//   if (cityFilter) {
//     displaySalons = displaySalons.filter(
//       (s) => s.city.toLowerCase() === cityFilter.toLowerCase()
//     );
//   }

//   if (search) {
//     displaySalons = displaySalons.filter((s) =>
//       s.name.toLowerCase().includes(search.toLowerCase())
//     );
//   }

//   const cities = [...new Set(salons.map((s) => s.city))];

//   return (
//     <div style={{ padding: 20 }}>
//       <h2>📍 Find a Salon</h2>

//       <div
//         style={{
//           display: "flex",
//           gap: 10,
//           flexWrap: "wrap",
//           marginBottom: 20,
//         }}
//       >
//         <input
//           placeholder="Search salon..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//         />

//         <select
//           value={cityFilter}
//           onChange={(e) => setCityFilter(e.target.value)}
//         >
//           <option value="">All Cities</option>
//           {cities.map((c) => (
//             <option key={c}>{c}</option>
//           ))}
//         </select>

//         <button onClick={detectLocation}>📍 Near Me</button>
//       </div>

//       {displaySalons.length === 0 && <p>No salons found</p>}

//       {displaySalons.map((s) => (
//         <div
//           key={s._id}
//           style={{
//             border: "1px solid #ccc",
//             padding: 14,
//             borderRadius: 10,
//             marginBottom: 14,
//           }}
//         >
//           <b>{s.name}</b>
//           <br />
//           <small>{s.address}</small>
//           <br />
//           <small>{s.city}</small>

//           {s.distance && <p>📏 {s.distance} km away</p>}

//           {s.location?.lat && (
//             <iframe
//               title={s.name}
//               width="100%"
//               height="180"
//               style={{ borderRadius: 8, marginTop: 8 }}
//               src={`https://www.google.com/maps?q=${s.location.lat},${s.location.lng}&z=15&output=embed`}
//             />
//           )}
//         </div>
//       ))}
//     </div>
//   );
// }