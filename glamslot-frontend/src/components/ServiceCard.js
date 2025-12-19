import { Link } from "react-router-dom";
import Footer from "../sections/Footer";
import "../styles/serviceCard.css";
export default function ServiceCard({ service }) {
  return (
    <div
      className="service-card"
      style={{
        border: "1px solid #ccc",
        padding: 20,
        borderRadius: 10,
      }}
    >
      <h3 className="service-title">{service.title}</h3>

      <p className="service-description">{service.description}</p>

      <p className="service-meta">
        <strong>Price:</strong> ₹{service.price}
      </p>

      <p className="service-meta">
        <strong>Duration:</strong> {service.durationMinutes} mins
      </p>

      <Link
        to={`/book/${service._id}`}
        className="service-book-btn"
      >
        Book Now
      </Link>
      <Footer />
    </div>
  );
}









// import { Link } from "react-router-dom";

// export default function ServiceCard({ service }) {
//   return (
//     <div style={{
//       border: "1px solid #ccc",
//       padding: 20,
//       borderRadius: 10
//     }}>
//       <h3>{service.title}</h3>
//       <p>{service.description}</p>
//       <p><strong>Price:</strong> ₹{service.price}</p>
//       <p><strong>Duration:</strong> {service.durationMinutes} mins</p>

//       <Link
//         to={`/book/${service._id}`}
//         style={{
//           display: "inline-block",
//           marginTop: 10,
//           padding: "8px 15px",
//           background: "black",
//           color: "white",
//           borderRadius: 5
//         }}
//       >
//         Book Now
//       </Link>
//     </div>
//   );
// }