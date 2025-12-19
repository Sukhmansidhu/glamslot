import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";
import "../styles/adminDashboard.css";

export default function AdminDashboard() {
  const [staffList, setStaffList] = useState([]);
  const [holidays, setHolidays] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [orderStats, setOrderStats] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    processing: 0,
    shipped: 0,
    delivered: 0,
  });

  const loadOrderAnalytics = () => {
    const orders = JSON.parse(localStorage.getItem("glamslot_orders")) || [];
    let revenue = 0, processing = 0, shipped = 0, delivered = 0;

    orders.forEach((o) => {
      revenue += o.total || 0;
      if (o.status === "Processing") processing++;
      if (o.status === "Shipped") shipped++;
      if (o.status === "Delivered") delivered++;
    });

    setOrderStats({
      totalOrders: orders.length,
      totalRevenue: revenue,
      processing,
      shipped,
      delivered,
    });
  };

  const loadStaff = async () => {
    const res = await api.get("/staff");
    setStaffList(res.data);
  };

  const loadHolidays = async () => {
    const res = await api.get("/holidays");
    setHolidays(res.data);
  };

  const loadBookings = async () => {
    const res = await api.get("/bookings");
    setBookings(res.data);
  };

  useEffect(() => {
    loadStaff();
    loadHolidays();
    loadBookings();
    loadOrderAnalytics();
  }, []);

  return (
    <div className="admin-dashboard">
      <h2 className="admin-title">Admin Dashboard</h2>

      <div className="stats-grid">
        <div className="stat-card">📦 Orders <b>{orderStats.totalOrders}</b></div>
        <div className="stat-card">💰 Revenue <b>₹{orderStats.totalRevenue}</b></div>
        <div className="stat-card">⏳ Processing <b>{orderStats.processing}</b></div>
        <div className="stat-card">🚚 Shipped <b>{orderStats.shipped}</b></div>
        <div className="stat-card">✅ Delivered <b>{orderStats.delivered}</b></div>
      </div>

      <div className="admin-actions">
        <Link to="/admin/services/add"><button>➕ Add Service</button></Link>
        <Link to="/admin/staff/add"><button>➕ Add Staff</button></Link>
        <Link to="/admin/salons/add"><button>➕ Add Salon</button></Link>
        <Link to="/admin/bookings"><button>📅 View Bookings</button></Link>
        <Link to="/admin/orders"><button>📦 Orders</button></Link>
        <Link to="/admin/referrals"><button>📊 Referrals</button></Link>
      </div>

      <div className="admin-section">
        <h3>🏖 Restaurant Holidays</h3>

        {holidays.length === 0 && (
          <p className="muted-text">No holidays added</p>
        )}

        {holidays.map((h) => (
          <div key={h._id} className="holiday-row">
            <span>
              <b>{h.date}</b> {h.reason && `— ${h.reason}`}
            </span>
          </div>
        ))}
      </div>

      <h3 className="section-title">📅 Recent Bookings</h3>

      {bookings.slice(0, 5).map((b) => (
        <div key={b._id} className="booking-row">
          <b>{b.staffId?.name}</b> — {b.serviceId?.title}
          <div className="booking-meta">
            {b.date} | {b.startTime} – {b.endTime}
          </div>
          <span className={`status ${b.status}`}>{b.status}</span>
        </div>
      ))}

      <h3 className="section-title">👥 Staff</h3>

      {staffList.map((s) => (
        <div key={s._id} className="staff-row">
          <div>
            <b>{s.name}</b>
            <small>{s.restaurantName}</small>
          </div>

          <div className="staff-actions">
            <Link to={`/admin/availability/${s._id}`}>
              <button>Availability</button>
            </Link>
            <Link to={`/admin/staff/edit/${s._id}`}>
              <button>Edit</button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}











// import { useEffect, useState } from "react";
// import api from "../api/axios";
// import { Link } from "react-router-dom";

// export default function AdminDashboard() {
//   const [staffList, setStaffList] = useState([]);
//   const [holidays, setHolidays] = useState([]);
//   const [bookings, setBookings] = useState([]);

//   const [orderStats, setOrderStats] = useState({
//     totalOrders: 0,
//     totalRevenue: 0,
//     processing: 0,
//     shipped: 0,
//     delivered: 0,
//   });

//   const loadOrderAnalytics = () => {
//     const orders =
//       JSON.parse(localStorage.getItem("glamslot_orders")) || [];

//     let revenue = 0;
//     let processing = 0;
//     let shipped = 0;
//     let delivered = 0;

//     orders.forEach((o) => {
//       revenue += o.total || 0;
//       if (o.status === "Processing") processing++;
//       if (o.status === "Shipped") shipped++;
//       if (o.status === "Delivered") delivered++;
//     });

//     setOrderStats({
//       totalOrders: orders.length,
//       totalRevenue: revenue,
//       processing,
//       shipped,
//       delivered,
//     });
//   };

//   const loadStaff = async () => {
//     const res = await api.get("/staff");
//     setStaffList(res.data);
//   };

//   const loadHolidays = async () => {
//     const res = await api.get("/holidays");
//     setHolidays(res.data);
//   };

//   const loadBookings = async () => {
//     const res = await api.get("/bookings");
//     setBookings(res.data);
//   };

//   useEffect(() => {
//     loadStaff();
//     loadHolidays();
//     loadBookings();
//     loadOrderAnalytics();

//     window.addEventListener("ordersUpdated", loadOrderAnalytics);
//     return () =>
//       window.removeEventListener("ordersUpdated", loadOrderAnalytics);
//   }, []);

//   const [holidayDate, setHolidayDate] = useState("");
//   const [holidayReason, setHolidayReason] = useState("");

//   const addHoliday = async () => {
//     if (!holidayDate) {
//       alert("Please select a date");
//       return;
//     }

//     try {
//       await api.post("/holidays", {
//         date: holidayDate,
//         reason: holidayReason,
//       });

//       setHolidayDate("");
//       setHolidayReason("");
//       loadHolidays();
//     } catch (err) {
//       alert(err.response?.data?.message || "Failed to add holiday");
//     }
//   };

//   const deleteHoliday = async (id) => {
//     if (!window.confirm("Remove this holiday?")) return;
//     await api.delete(`/holidays/${id}`);
//     loadHolidays();
//   };

//   const markCompleted = async (id) => {
//     try {
//       await api.put(`/bookings/${id}/complete`);
//       loadBookings();
//       alert("Booking marked as completed");
//     } catch {
//       alert("Failed to update booking");
//     }
//   };

//   return (
//     <div style={{ padding: 20 }}>
//       <h2>Admin Dashboard</h2>

//       <div
//         style={{
//           display: "grid",
//           gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
//           gap: 15,
//           marginBottom: 30,
//         }}
//       >
//         <div style={card}>📦 Orders<br /><b>{orderStats.totalOrders}</b></div>
//         <div style={card}>💰 Revenue<br /><b>₹{orderStats.totalRevenue}</b></div>
//         <div style={card}>⏳ Processing<br /><b>{orderStats.processing}</b></div>
//         <div style={card}>🚚 Shipped<br /><b>{orderStats.shipped}</b></div>
//         <div style={card}>✅ Delivered<br /><b>{orderStats.delivered}</b></div>
//       </div>

//       <div style={{ marginBottom: 20, display: "flex", gap: 10, flexWrap: "wrap" }}>
//         <Link to="/admin/services/add">
//           <button>➕ Add Service</button>
//         </Link>

//         <Link to="/admin/staff/add">
//           <button>➕ Add Staff</button>
//         </Link>

//         <Link to="/admin/salons/add">
//           <button>➕ Add Salon</button>
//         </Link>

//         <Link to="/admin/bookings">
//           <button>📅 View All Bookings</button>
//         </Link>

//         <Link to="/admin/referrals">
//           <button>📊 Referral Analytics</button>
//         </Link>

//         <Link to="/admin/orders">
//           <button>📦 Orders</button>
//         </Link>
//       </div>

//       <div
//         style={{
//           border: "1px solid #ccc",
//           padding: 15,
//           borderRadius: 8,
//           maxWidth: 420,
//           marginBottom: 30,
//         }}
//       >
//         <h3>🏖 Restaurant Holidays</h3>

//         <input
//           type="date"
//           value={holidayDate}
//           onChange={(e) => setHolidayDate(e.target.value)}
//         />

//         <input
//           placeholder="Reason (optional)"
//           value={holidayReason}
//           onChange={(e) => setHolidayReason(e.target.value)}
//         />

//         <br />
//         <button onClick={addHoliday}>Add Holiday</button>

//         {holidays.length === 0 && (
//           <p style={{ fontSize: 13, color: "gray" }}>No holidays added</p>
//         )}

//         {holidays.map((h) => (
//           <div
//             key={h._id}
//             style={{
//               marginTop: 8,
//               padding: 8,
//               border: "1px solid #eee",
//               borderRadius: 6,
//               display: "flex",
//               justifyContent: "space-between",
//             }}
//           >
//             <span>
//               <b>{h.date}</b> {h.reason && `— ${h.reason}`}
//             </span>
//             <button
//               style={{ background: "red", color: "white" }}
//               onClick={() => deleteHoliday(h._id)}
//             >
//               X
//             </button>
//           </div>
//         ))}
//       </div>

//       <h3>📅 Recent Bookings</h3>

//       {bookings.length === 0 && <p>No bookings found</p>}

//       {bookings.slice(0, 5).map((b) => (
//         <div
//           key={b._id}
//           style={{
//             border: "1px solid #ccc",
//             padding: 12,
//             marginBottom: 10,
//             borderRadius: 8,
//           }}
//         >
//           <b>{b.staffId?.name || "Staff"}</b> — {b.serviceId?.title}
//           <br />
//           <small>
//             {b.date} | {b.startTime} – {b.endTime}
//           </small>
//           <br />
//           <strong>Status:</strong>{" "}
//           <span style={{ textTransform: "capitalize" }}>{b.status}</span>

//           {b.status === "confirmed" && (
//             <div style={{ marginTop: 8 }}>
//               <button
//                 onClick={() => markCompleted(b._id)}
//                 style={{
//                   background: "green",
//                   color: "white",
//                   padding: "6px 10px",
//                   borderRadius: 6,
//                 }}
//               >
//                 ✅ Mark Completed
//               </button>
//             </div>
//           )}
//         </div>
//       ))}

//       <h3 style={{ marginTop: 30 }}>Manage Staff</h3>

//       {staffList.length === 0 && <p>No staff added yet</p>}

//       {staffList.map((s) => (
//         <div
//           key={s._id}
//           style={{
//             border: "1px solid #ccc",
//             padding: 12,
//             marginBottom: 8,
//             borderRadius: 8,
//           }}
//         >
//           <b>{s.name}</b> — ₹{s.fees}
//           <br />
//           <small>{s.restaurantName}</small>

//           <div style={{ marginTop: 6, display: "flex", gap: 8 }}>
//             <Link to={`/admin/availability/${s._id}`}>
//               <button>Availability</button>
//             </Link>

//             <Link to={`/admin/staff/edit/${s._id}`}>
//               <button>Edit</button>
//             </Link>

//             <button
//               style={{ background: "red", color: "white" }}
//               onClick={async () => {
//                 if (!window.confirm("Delete this staff?")) return;
//                 await api.delete(`/staff/${s._id}`);
//                 loadStaff();
//               }}
//             >
//               Delete
//             </button>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }

// const card = {
//   background: "#fff",
//   padding: 15,
//   borderRadius: 10,
//   boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
//   fontSize: 14,
// };