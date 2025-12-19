import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";
import Footer from "../sections/Footer";
import "../styles/services.css";
import haircutImg from "../assets/images/haircut.png";
import massageImg from "../assets/images/massage.png";
import facialImg from "../assets/images/facial.png";
import nailImg from "../assets/images/nail.png";

export default function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadServices = async () => {
      try {
        const res = await api.get("/services");
        setServices(res.data);
      } catch (error) {
        console.log("Error loading services:", error);
      } finally {
        setLoading(false);
      }
    };

    loadServices();
  }, []);

  const getServiceImage = (title) => {
    const t = title.toLowerCase();
    if (t.includes("hair")) return haircutImg;
    if (t.includes("massage")) return massageImg;
    if (t.includes("facial")) return facialImg;
    if (t.includes("nail")) return nailImg;
  
  };

  if (loading) return <p className="services-loading">Loading services...</p>;

  return (
    <>
      <div className="services-page">
        <h2 className="services-title">Available Services</h2>

        {services.length === 0 ? (
          <p className="services-empty">No services found.</p>
        ) : (
          <div className="services-grid">
            {services.map((svc) => (
              <Link
                key={svc._id}
                to={`/book/${svc._id}`}
                className="service-card"
              >
                <div className="service-img">
                  <img
                    src={getServiceImage(svc.title)}
                    alt={svc.title}
                  />
                </div>

                <div className="service-info">
                  <h3>{svc.title}</h3>
                  <p>
                    {svc.durationMinutes} mins • ₹{svc.price}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </>
  );
}






// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import api from "../api/axios";

// export default function Services() {
//   const [services, setServices] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const loadServices = async () => {
//       try {
//         console.log("Calling API:", process.env.REACT_APP_API + "/services"); 
//         const res = await api.get("/services");
//         console.log("API Response:", res.data); 
//         setServices(res.data);
//       } catch (error) {
//         console.log("Error loading services:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadServices();
//   }, []);

//   if (loading) return <p style={{ padding: 20 }}>Loading services...</p>;

//   return (
//     <div style={{ padding: 20 }}>
//       <h2>Available Services</h2>

//       {services.length === 0 ? (
//         <p>No services found.</p>
//       ) : (
//         <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
//           {services.map((svc) => (
//             <Link
//               key={svc._id}
//               to={`/book/${svc._id}`}
//               style={{
//                 padding: 12,
//                 border: "1px solid #ccc",
//                 borderRadius: 6,
//                 textDecoration: "none",
//                 color: "black",
//               }}
//             >
//               <strong>{svc.title}</strong> — {svc.durationMinutes} mins — ₹{svc.price}
//             </Link>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }