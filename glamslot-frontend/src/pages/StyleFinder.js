import { useEffect, useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import "../styles/styleFinder.css";

export default function StyleFinder() {
  const [styles, setStyles] = useState([]);
  const [filter, setFilter] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/styles").then((res) => setStyles(res.data));
  }, []);

  const filtered =
    filter === ""
      ? styles
      : styles.filter((s) => s.category === filter);

  return (
    <div className="style-page">
      <h2 className="style-title">✨ Style Finder</h2>

      <select
        className="style-filter"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      >
        <option value="">All Styles</option>
        <option>Haircut</option>
        <option>Color</option>
        <option>Beard</option>
        <option>Bridal</option>
        <option>Styling</option>
      </select>

      <div className="style-grid">
        {filtered.map((s) => (
          <div
            key={s._id}
            className="style-card"
            onClick={() => navigate("/")}
          >
            <img
              src={s.image}
              alt={s.title}
              className="style-image"
            />

            <div className="style-info">
              <b>{s.title}</b>
              <p className="style-category">{s.category}</p>
              {s.isTrending && (
                <span className="style-trending">🔥 Trending</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}















// import { useEffect, useState } from "react";
// import api from "../api/axios";
// import { useNavigate } from "react-router-dom";

// export default function StyleFinder() {
//   const [styles, setStyles] = useState([]);
//   const [filter, setFilter] = useState("");
//   const navigate = useNavigate();

//   useEffect(() => {
//     api.get("/styles").then((res) => setStyles(res.data));
//   }, []);

//   const filtered =
//     filter === ""
//       ? styles
//       : styles.filter((s) => s.category === filter);

//   return (
//     <div style={{ padding: 20 }}>
//       <h2>✨ Style Finder</h2>

//       <select
//         value={filter}
//         onChange={(e) => setFilter(e.target.value)}
//         style={{ marginBottom: 20 }}
//       >
//         <option value="">All Styles</option>
//         <option>Haircut</option>
//         <option>Color</option>
//         <option>Beard</option>
//         <option>Bridal</option>
//         <option>Styling</option>
//       </select>

//       <div
//         style={{
//           display: "grid",
//           gridTemplateColumns: "repeat(auto-fill, minmax(220px,1fr))",
//           gap: 16,
//         }}
//       >
//         {filtered.map((s) => (
//           <div
//             key={s._id}
//             style={{
//               borderRadius: 12,
//               overflow: "hidden",
//               cursor: "pointer",
//               boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
//             }}
//             onClick={() => navigate("/")}
//           >
//             <img
//               src={s.image}
//               alt={s.title}
//               style={{ width: "100%", height: 240, objectFit: "cover" }}
//             />
//             <div style={{ padding: 10 }}>
//               <b>{s.title}</b>
//               <p style={{ fontSize: 13 }}>{s.category}</p>
//               {s.isTrending && <span>🔥 Trending</span>}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }