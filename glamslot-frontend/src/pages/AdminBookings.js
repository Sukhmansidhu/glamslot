
import { useEffect, useState } from "react";
import api from "../api/axios";
import "../styles/adminBookings.css";

export default function AdminBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadBookings = async () => {
    try {
      setLoading(true);
      const res = await api.get("/bookings");
      setBookings(res.data);
    } catch (err) {
      alert("Failed to load bookings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBookings();
  }, []);

  const markCompleted = async (id) => {
    if (!window.confirm("Mark this booking as completed?")) return;

    try {
      await api.put(`/bookings/${id}/complete`);
      loadBookings();
    } catch {
      alert("Failed to mark completed");
    }
  };

  if (loading) return <p className="admin-bookings-loading">Loading bookings...</p>;

  return (
    <div className="admin-bookings">
      <h2 className="admin-bookings-title">Admin Bookings</h2>

      {bookings.length === 0 && (
        <p className="admin-bookings-empty">No bookings found</p>
      )}

      {bookings.map((b) => (
        <div key={b._id} className="admin-booking-card">
          <p><strong>User:</strong> {b.userId?.name || "Unknown"}</p>
          <p><strong>Staff:</strong> {b.staffId?.name || "N/A"}</p>
          <p><strong>Service:</strong> {b.serviceId?.title}</p>
          <p><strong>Date:</strong> {b.date}</p>
          <p><strong>Time:</strong> {b.startTime} – {b.endTime}</p>

          <p className={`booking-status ${b.status}`}>
            <strong>Status:</strong> {b.status}
          </p>

          {b.status === "confirmed" && (
            <div className="admin-booking-actions">
              <button
                className="btn-complete"
                onClick={() => markCompleted(b._id)}
              >
                Mark Completed
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}












// import { useEffect, useState } from "react";
// import api from "../api/axios";

// export default function AdminBookings() {
//   const [bookings, setBookings] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const loadBookings = async () => {
//     try {
//       setLoading(true);
//       const res = await api.get("/bookings"); 
//       setBookings(res.data);
//     } catch (err) {
//       alert("Failed to load bookings");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     loadBookings();
//   }, []);

//   const markCompleted = async (id) => {
//     if (!window.confirm("Mark this booking as completed?")) return;

//     try {
//       await api.put(`/bookings/${id}/complete`);
//       loadBookings();
//     } catch {
//       alert("Failed to mark completed");
//     }
//   };

//   if (loading) return <p style={{ padding: 20 }}>Loading bookings...</p>;

//   return (
//     <div style={{ padding: 20 }}>
//       <h2>Admin Bookings</h2>

//       {bookings.length === 0 && <p>No bookings found</p>}

//       {bookings.map((b) => (
//         <div
//           key={b._id}
//           style={{
//             border: "1px solid #ccc",
//             padding: 15,
//             marginBottom: 12,
//             borderRadius: 10,
//             background: "#fafafa",
//           }}
//         >
//           <b>User:</b> {b.userId?.name || "Unknown"}
//           <br />
//           <b>Staff:</b> {b.staffId?.name || "N/A"}
//           <br />
//           <b>Service:</b> {b.serviceId?.title}
//           <br />
//           <b>Date:</b> {b.date}
//           <br />
//           <b>Time:</b> {b.startTime} – {b.endTime}
//           <br />
//           <b>Status:</b>{" "}
//           <span style={{ textTransform: "capitalize" }}>{b.status}</span>

//           {b.status === "confirmed" && (
//             <div style={{ marginTop: 10 }}>
//               <button
//                 onClick={() => markCompleted(b._id)}
//                 style={{
//                   background: "green",
//                   color: "white",
//                   border: "none",
//                   padding: "6px 12px",
//                   borderRadius: 6,
//                   cursor: "pointer",
//                 }}
//               >
//                 Mark Completed
//               </button>
//             </div>
//           )}
//         </div>
//       ))}
//     </div>
//   );
// }