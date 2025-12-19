import { useEffect, useState } from "react";
import api from "../api/axios";
import "../styles/adminHoliday.css";

export default function AdminHoliday() {
  const [date, setDate] = useState("");
  const [reason, setReason] = useState("");
  const [holidays, setHolidays] = useState([]);

  const loadHolidays = () => {
    api.get("/holidays").then((res) => setHolidays(res.data));
  };

  useEffect(() => {
    loadHolidays();
  }, []);

  const addHoliday = async () => {
    await api.post("/holidays", { date, reason });
    setDate("");
    setReason("");
    loadHolidays();
  };

  return (
    <div className="admin-holiday">
      <h2 className="admin-holiday-title">Restaurant Holidays</h2>

      <div className="holiday-form">
        <input
          className="holiday-input"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <input
          className="holiday-input"
          placeholder="Reason"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        />

        <button className="holiday-btn" onClick={addHoliday}>
          Add Holiday
        </button>
      </div>

      <ul className="holiday-list">
        {holidays.map((h) => (
          <li key={h._id} className="holiday-item">
            <span className="holiday-text">
              {h.date} — {h.reason}
            </span>

            <button
              className="holiday-delete"
              onClick={async () => {
                await api.delete(`/holidays/${h._id}`);
                loadHolidays();
              }}
            >
              ❌
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}













// import { useEffect, useState } from "react";
// import api from "../api/axios";

// export default function AdminHoliday() {
//   const [date, setDate] = useState("");
//   const [reason, setReason] = useState("");
//   const [holidays, setHolidays] = useState([]);

//   const loadHolidays = () => {
//     api.get("/holidays").then((res) => setHolidays(res.data));
//   };

//   useEffect(() => {
//     loadHolidays();
//   }, []);

//   const addHoliday = async () => {
//     await api.post("/holidays", { date, reason });
//     setDate("");
//     setReason("");
//     loadHolidays();
//   };

//   return (
//     <div style={{ padding: 20 }}>
//       <h2>Restaurant Holidays</h2>

//       <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
//       <input
//         placeholder="Reason"
//         value={reason}
//         onChange={(e) => setReason(e.target.value)}
//       />
//       <button onClick={addHoliday}>Add Holiday</button>

//       <ul style={{ marginTop: 20 }}>
//         {holidays.map((h) => (
//           <li key={h._id}>
//             {h.date} — {h.reason}
//             <button
//               style={{ marginLeft: 10 }}
//               onClick={async () => {
//                 await api.delete(`/holidays/${h._id}`);
//                 loadHolidays();
//               }}
//             >
//               ❌
//             </button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }