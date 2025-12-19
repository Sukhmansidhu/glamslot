import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";
import "../styles/availabilityManager.css";

export default function AvailabilityManager() {
  const { staffId } = useParams();
  const [staff, setStaff] = useState(null);
  const [availability, setAvailability] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [day, setDay] = useState("Monday");
  const [startTime, setStartTime] = useState("10:00");
  const [endTime, setEndTime] = useState("18:00");

  const loadAvailability = useCallback(() => {
    if (!staffId) return;
    api.get(`/availability/${staffId}`).then((res) => {
      setAvailability(res.data);
    });
  }, [staffId]);

  useEffect(() => {
    if (!staffId) return;

    api.get(`/staff/${staffId}`).then((res) => setStaff(res.data));
    loadAvailability();
  }, [staffId, loadAvailability]);

  const resetForm = () => {
    setEditingId(null);
    setDay("Monday");
    setStartTime("10:00");
    setEndTime("18:00");
  };

  const addOrUpdateAvailability = async () => {
    try {
      if (editingId) {
        await api.put(`/availability/${editingId}`, {
          staffId,
          day,
          startTime,
          endTime,
        });
        alert("Availability updated");
      } else {
        await api.post("/availability", {
          staffId,
          day,
          startTime,
          endTime,
        });
        alert("Availability added");
      }

      resetForm();
      loadAvailability();
    } catch (err) {
      alert(err.response?.data?.message || "Operation failed");
    }
  };

  const deleteAvailability = async (id) => {
    if (!window.confirm("Delete this availability?")) return;

    try {
      await api.delete(`/availability/${id}`);
      loadAvailability();
    } catch (err) {
      alert("Failed to delete");
    }
  };

  const startEdit = (a) => {
    setEditingId(a._id);
    setDay(a.day);
    setStartTime(a.startTime);
    setEndTime(a.endTime);
  };

  return (
    <div className="availability-page">
      <h2 className="page-title">
        Manage Availability for {staff?.name}
      </h2>

      {staff && (
        <div className="staff-profile-card">
          <img
            src={staff.photo || "https://via.placeholder.com/120"}
            alt={staff.name}
            className="staff-photo"
          />

          <div className="staff-details">
            <h3>{staff.name}</h3>

            <p><b>Restaurant:</b> {staff.restaurantName || "N/A"}</p>
            <p><b>Fees:</b> ₹{staff.fees ?? "N/A"}</p>
            <p><b>Phone:</b> {staff.phone || "N/A"}</p>
            <p><b>Description:</b> {staff.description || "N/A"}</p>

            <p>
              <b>Status:</b>{" "}
              {staff.isOnLeave ? (
                <span className="status-leave">On Leave</span>
              ) : (
                <span className="status-available">Available</span>
              )}
            </p>

            <p>
              <b>Skills:</b>{" "}
              {staff.skills && staff.skills.length > 0
                ? staff.skills.join(", ")
                : "Not specified"}
            </p>
          </div>
        </div>
      )}

      <div className="availability-form-card">
        <h3>{editingId ? "Edit Availability" : "Add Availability"}</h3>

        <select value={day} onChange={(e) => setDay(e.target.value)}>
          {[
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
          ].map((d) => (
            <option key={d}>{d}</option>
          ))}
        </select>

        <input
          type="time"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
        />

        <input
          type="time"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
        />

        <div className="form-actions">
          <button className="btn-primary" onClick={addOrUpdateAvailability}>
            {editingId ? "Update" : "Add"}
          </button>

          {editingId && (
            <button className="btn-secondary" onClick={resetForm}>
              Cancel
            </button>
          )}
        </div>
      </div>

      <h3 className="section-title">Existing Availability</h3>

      {availability.map((a) => (
        <div key={a._id} className="availability-item">
          <span>
            <b>{a.day}</b>: {a.startTime} - {a.endTime}
          </span>

          <div className="availability-actions">
            <button
              className="btn-secondary"
              onClick={() => startEdit(a)}
            >
              Edit
            </button>
            <button
              className="btn-danger"
              onClick={() => deleteAvailability(a._id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

















// import { useEffect, useState, useCallback } from "react";
// import { useParams } from "react-router-dom";
// import api from "../api/axios";

// export default function AvailabilityManager() {
//   const { staffId } = useParams();
//   const [staff, setStaff] = useState(null);
//   const [availability, setAvailability] = useState([]);
//   const [editingId, setEditingId] = useState(null);
//   const [day, setDay] = useState("Monday");
//   const [startTime, setStartTime] = useState("10:00");
//   const [endTime, setEndTime] = useState("18:00");

//   const loadAvailability = useCallback(() => {
//     if (!staffId) return;
//     api.get(`/availability/${staffId}`).then((res) => {
//       setAvailability(res.data);
//     });
//   }, [staffId]);

//   useEffect(() => {
//     if (!staffId) return;

//     api.get(`/staff/${staffId}`).then((res) => setStaff(res.data));
//     loadAvailability();
//   }, [staffId, loadAvailability]);

//   const resetForm = () => {
//     setEditingId(null);
//     setDay("Monday");
//     setStartTime("10:00");
//     setEndTime("18:00");
//   };

//   const addOrUpdateAvailability = async () => {
//     try {
//       if (editingId) {
//         await api.put(`/availability/${editingId}`, {
//           staffId,
//           day,
//           startTime,
//           endTime,
//         });
//         alert("Availability updated");
//       } else {
//         await api.post("/availability", {
//           staffId,
//           day,
//           startTime,
//           endTime,
//         });
//         alert("Availability added");
//       }

//       resetForm();
//       loadAvailability();
//     } catch (err) {
//       alert(err.response?.data?.message || "Operation failed");
//     }
//   };

//   const deleteAvailability = async (id) => {
//     if (!window.confirm("Delete this availability?")) return;

//     try {
//       await api.delete(`/availability/${id}`);
//       loadAvailability();
//     } catch (err) {
//       alert("Failed to delete");
//     }
//   };

//   const startEdit = (a) => {
//     setEditingId(a._id);
//     setDay(a.day);
//     setStartTime(a.startTime);
//     setEndTime(a.endTime);
//   };

//   return (
//     <div style={{ padding: 20 }}>
//       <h2>Manage Availability for {staff?.name}</h2>

//       {staff && (
//         <div
//           style={{
//             display: "flex",
//             gap: 20,
//             border: "1px solid #ccc",
//             padding: 15,
//             borderRadius: 8,
//             width: 600,
//             marginBottom: 25,
//           }}
//         >
//           <img
//             src={staff.photo || "https://via.placeholder.com/120"}
//             alt={staff.name}
//             style={{
//               width: 120,
//               height: 120,
//               objectFit: "cover",
//               borderRadius: 8,
//             }}
//           />

//           <div>
//             <h3>{staff.name}</h3>

//             <p>
//               <b>Restaurant:</b> {staff.restaurantName || "N/A"}
//             </p>

//             <p>
//               <b>Fees:</b> ₹{staff.fees ?? "N/A"}
//             </p>

//             <p>
//               <b>Phone:</b> {staff.phone || "N/A"}
//             </p>

//             <p>
//               <b>Description:</b> {staff.description || "N/A"}
//             </p>

//             <p>
//               <b>Status:</b>{" "}
//               {staff.isOnLeave ? (
//                 <span style={{ color: "red" }}>On Leave</span>
//               ) : (
//                 <span style={{ color: "green" }}>Available</span>
//               )}
//             </p>

//             <p>
//               <b>Skills:</b>{" "}
//               {staff.skills && staff.skills.length > 0
//                 ? staff.skills.join(", ")
//                 : "Not specified"}
//             </p>
//           </div>
//         </div>
//       )}

//       <div style={{ border: "1px solid #ccc", padding: 15, width: 350 }}>
//         <h3>{editingId ? "Edit Availability" : "Add Availability"}</h3>

//         <select value={day} onChange={(e) => setDay(e.target.value)}>
//           {[
//             "Monday",
//             "Tuesday",
//             "Wednesday",
//             "Thursday",
//             "Friday",
//             "Saturday",
//             "Sunday",
//           ].map((d) => (
//             <option key={d}>{d}</option>
//           ))}
//         </select>

//         <input
//           type="time"
//           value={startTime}
//           onChange={(e) => setStartTime(e.target.value)}
//         />

//         <input
//           type="time"
//           value={endTime}
//           onChange={(e) => setEndTime(e.target.value)}
//         />

//         <button onClick={addOrUpdateAvailability}>
//           {editingId ? "Update" : "Add"}
//         </button>

//         {editingId && <button onClick={resetForm}>Cancel</button>}
//       </div>

//       <h3 style={{ marginTop: 30 }}>Existing Availability</h3>

//       {availability.map((a) => (
//         <div
//           key={a._id}
//           style={{
//             display: "flex",
//             justifyContent: "space-between",
//             border: "1px solid #ddd",
//             padding: 10,
//             width: 350,
//             marginBottom: 6,
//           }}
//         >
//           <span>
//             <b>{a.day}</b>: {a.startTime} - {a.endTime}
//           </span>

//           <div>
//             <button onClick={() => startEdit(a)}>Edit</button>
//             <button onClick={() => deleteAvailability(a._id)}>Delete</button>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }