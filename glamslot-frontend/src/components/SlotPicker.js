import { useEffect, useState } from "react";
import api from "../api/axios";
import "../styles/slotPicker.css";

export default function SlotPicker({ serviceId, staffId, date, onBook }) {
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!serviceId || !staffId || !date) return;

    const loadSlots = async () => {
      try {
        setLoading(true);
        setSlots([]);

        const res = await api.get(
          `/bookings/slots?serviceId=${serviceId}&staffId=${staffId}&date=${date}`
        );

        setSlots(res.data);
      } catch (err) {
        console.log("Error fetching slots:", err);
      } finally {
        setLoading(false);
      }
    };

    loadSlots();
  }, [serviceId, staffId, date]);

  const handleBook = async () => {
    if (!selectedSlot) return;

    try {
      await onBook(selectedSlot);
      setMessage("🎉 Booking Succeeded!");
      setSelectedSlot("");

      const res = await api.get(
        `/bookings/slots?serviceId=${serviceId}&staffId=${staffId}&date=${date}`
      );
      setSlots(res.data);
    } catch (err) {
      setMessage("❌ Booking failed: " + err.response?.data?.message);
    }
  };

  return (
    <div className="slot-picker">
      <h3 className="slot-title">Available Time Slots</h3>

      {message && <div className="slot-message">{message}</div>}

      {loading && <p className="slot-loading">Loading slots...</p>}

      {!loading && slots.length === 0 && (
        <p className="slot-empty">No slots available for this date.</p>
      )}

      <div className="slot-grid">
        {slots.map((slot, i) => (
          <button
            key={i}
            onClick={() => setSelectedSlot(slot.startTime)}
            className={`slot-btn ${
              selectedSlot === slot.startTime ? "active" : ""
            }`}
          >
            {slot.startTime} – {slot.endTime}
          </button>
        ))}
      </div>

      {selectedSlot && (
        <button className="slot-confirm-btn" onClick={handleBook}>
          Confirm Booking ({selectedSlot})
        </button>
      )}
    </div>
  );
}

// import { useEffect, useState } from "react";
// import api from "../api/axios";

// export default function SlotPicker({ serviceId, staffId, date, onBook }) {
//   const [slots, setSlots] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [selectedSlot, setSelectedSlot] = useState("");
//   const [message, setMessage] = useState("");

//   // Load slots when inputs change
//   useEffect(() => {
//     if (!serviceId || !staffId || !date) return;

//     const loadSlots = async () => {
//       try {
//         setLoading(true);
//         setSlots([]);

//         const res = await api.get(
//           `/bookings/slots?serviceId=${serviceId}&staffId=${staffId}&date=${date}`
//         );

//         setSlots(res.data);
//       } catch (err) {
//         console.log("Error fetching slots:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadSlots();
//   }, [serviceId, staffId, date]);

//   const handleBook = async () => {
//     if (!selectedSlot) return;

//     try {
//       await onBook(selectedSlot);
//       setMessage("🎉 Booking Succeeded!");
//       setSelectedSlot("");

//       // Refresh slots
//       const res = await api.get(
//         `/bookings/slots?serviceId=${serviceId}&staffId=${staffId}&date=${date}`
//       );
//       setSlots(res.data);
//     } catch (err) {
//       setMessage("❌ Booking failed: " + err.response?.data?.message);
//     }
//   };

//   return (
//     <div style={{ marginTop: 20 }}>
//       <h3>Available Time Slots</h3>

//       {message && (
//         <div
//           style={{
//             padding: 10,
//             background: "#e6ffe6",
//             border: "1px solid green",
//             borderRadius: 6,
//             marginBottom: 10
//           }}
//         >
//           {message}
//         </div>
//       )}

//       {loading && <p>Loading slots...</p>}

//       {!loading && slots.length === 0 && (
//         <p style={{ color: "#777" }}>No slots available for this date.</p>
//       )}

//       <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
//         {slots.map((slot, i) => (
//           <button
//             key={i}
//             onClick={() => setSelectedSlot(slot.startTime)}
//             style={{
//               padding: "10px 15px",
//               borderRadius: 6,
//               border: selectedSlot === slot.startTime
//                 ? "2px solid blue"
//                 : "1px solid #333",
//               background: selectedSlot === slot.startTime ? "#007bff" : "black",
//               color: "white",
//               cursor: "pointer"
//             }}
//           >
//             {slot.startTime} – {slot.endTime}
//           </button>
//         ))}
//       </div>

//       {selectedSlot && (
//         <button
//           onClick={handleBook}
//           style={{
//             marginTop: 20,
//             padding: "10px 20px",
//             background: "green",
//             color: "white",
//             borderRadius: 6,
//             border: "none",
//             cursor: "pointer"
//           }}
//         >
//           Confirm Booking ({selectedSlot})
//         </button>
//       )}
//     </div>
//   );
// }