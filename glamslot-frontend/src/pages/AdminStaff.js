import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";
import "../styles/adminStaff.css";

export default function AdminStaff() {
  const [staff, setStaff] = useState([]);

  const loadStaff = () => {
    api.get("/staff").then((res) => setStaff(res.data));
  };

  useEffect(() => {
    loadStaff();
  }, []);

  const deleteStaff = async (id) => {
    if (!window.confirm("Delete staff?")) return;
    await api.delete(`/staff/${id}`);
    loadStaff();
  };

  return (
    <div className="admin-staff">
      <h2 className="admin-staff-title">Staff Management</h2>

      <Link to="/admin/staff/add">
        <button className="btn-primary">Add New Staff</button>
      </Link>

      <br />
      <br />

      {staff.map((s) => (
        <div key={s._id} className="staff-card">
          <div className="staff-info">
            <b className="staff-name">{s.name}</b>
            <span className="staff-fees">₹{s.fees}</span>

            <p className="staff-restaurant">
              Restaurant: {s.restaurantName}
            </p>
          </div>

          <div className="staff-actions">
            <Link to={`/admin/availability/${s._id}`}>
              <button className="btn-secondary">
                Manage Availability
              </button>
            </Link>

            <button
              className="btn-danger"
              onClick={() => deleteStaff(s._id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}












// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import api from "../api/axios";

// export default function AdminStaff() {
//   const [staff, setStaff] = useState([]);

//   const loadStaff = () => {
//     api.get("/staff").then((res) => setStaff(res.data));
//   };

//   useEffect(() => {
//     loadStaff();
//   }, []);

//   const deleteStaff = async (id) => {
//     if (!window.confirm("Delete staff?")) return;
//     await api.delete(`/staff/${id}`);
//     loadStaff();
//   };

//   return (
//     <div style={{ padding: 20 }}>
//       <h2>Staff Management</h2>

//       <Link to="/admin/staff/add">
//         <button>Add New Staff</button>
//       </Link>

//       <br /><br />

//       {staff.map((s) => (
//         <div
//           key={s._id}
//           style={{
//             border: "1px solid #ccc",
//             padding: 10,
//             marginBottom: 10,
//             width: 500,
//           }}
//         >
//           <b>{s.name}</b> — ₹{s.fees}  
//           <br />
//           Restaurant: {s.restaurantName}
//           <br />

//           <Link to={`/admin/availability/${s._id}`}>
//             <button>Manage Availability</button>
//           </Link>

//           <button onClick={() => deleteStaff(s._id)}>Delete</button>
//         </div>
//       ))}
//     </div>
//   );
// }