import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import "../styles/adminAddSalon.css";

export default function AdminAddSalon() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/salons", {
        name,
        city,
        address,
        phone,
        location: { lat, lng },
      });

      alert("Salon added successfully");
      navigate("/admin");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to add salon");
    }
  };

  return (
    <div className="admin-salon">
      <h2 className="admin-salon-title">➕ Add Salon Branch</h2>

      <form className="admin-salon-form" onSubmit={handleSubmit}>
        <input placeholder="Salon Name" value={name} onChange={(e) => setName(e.target.value)} required />
        <input placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} required />
        <input placeholder="Full Address" value={address} onChange={(e) => setAddress(e.target.value)} required />
        <input placeholder="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} />
        <input placeholder="Latitude (optional)" value={lat} onChange={(e) => setLat(e.target.value)} />
        <input placeholder="Longitude (optional)" value={lng} onChange={(e) => setLng(e.target.value)} />

        <button type="submit" className="btn-primary">Add Salon</button>
      </form>
    </div>
  );
}





// import { useState } from "react";
// import api from "../api/axios";
// import { useNavigate } from "react-router-dom";

// export default function AdminAddSalon() {
//   const navigate = useNavigate();

//   const [name, setName] = useState("");
//   const [city, setCity] = useState("");
//   const [address, setAddress] = useState("");
//   const [phone, setPhone] = useState("");
//   const [lat, setLat] = useState("");
//   const [lng, setLng] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       await api.post("/salons", {
//         name,
//         city,
//         address,
//         phone,
//         location: {
//           lat,
//           lng,
//         },
//       });

//       alert("Salon added successfully");
//       navigate("/admin");
//     } catch (err) {
//       alert(err.response?.data?.message || "Failed to add salon");
//     }
//   };

//   return (
//     <div style={{ padding: 20, maxWidth: 500 }}>
//       <h2>➕ Add Salon Branch</h2>

//       <form
//         onSubmit={handleSubmit}
//         style={{ display: "flex", flexDirection: "column", gap: 10 }}
//       >
//         <input
//           placeholder="Salon Name"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           required
//         />

//         <input
//           placeholder="City"
//           value={city}
//           onChange={(e) => setCity(e.target.value)}
//           required
//         />

//         <input
//           placeholder="Full Address"
//           value={address}
//           onChange={(e) => setAddress(e.target.value)}
//           required
//         />

//         <input
//           placeholder="Phone Number"
//           value={phone}
//           onChange={(e) => setPhone(e.target.value)}
//         />

//         <input
//           placeholder="Latitude (optional)"
//           value={lat}
//           onChange={(e) => setLat(e.target.value)}
//         />

//         <input
//           placeholder="Longitude (optional)"
//           value={lng}
//           onChange={(e) => setLng(e.target.value)}
//         />

//         <button
//           type="submit"
//           style={{
//             padding: 10,
//             background: "black",
//             color: "white",
//             border: "none",
//             borderRadius: 6,
//             cursor: "pointer",
//           }}
//         >
//           Add Salon
//         </button>
//       </form>
//     </div>
//   );
// }