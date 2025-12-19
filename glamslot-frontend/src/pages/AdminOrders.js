import { useEffect, useState } from "react";
import "../styles/adminOrders.css";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const saved =
      JSON.parse(localStorage.getItem("glamslot_orders")) || [];
    setOrders(saved.reverse());
  }, []);

  const updateStatus = (id, status) => {
    const updated = orders.map((o) =>
      o.id === id ? { ...o, status } : o
    );

    setOrders(updated);

    localStorage.setItem(
      "glamslot_orders",
      JSON.stringify([...updated].reverse())
    );

    window.dispatchEvent(new Event("ordersUpdated"));
  };

  return (
    <div className="admin-orders">
      <h1 className="admin-orders-title">📦 Admin Orders</h1>

      {orders.length === 0 && (
        <p className="empty-text">No orders placed yet.</p>
      )}

      {orders.map((order) => (
        <div key={order.id} className="order-card">
          <div className="order-info">
            <strong>Order #{order.id}</strong>
            <p>Date: {order.date}</p>
            <p>Total: ₹{order.total}</p>

            <p>
              Status:{" "}
              <strong
                className={`order-status ${order.status.toLowerCase()}`}
              >
                {order.status}
              </strong>
            </p>

            <ul className="order-items">
              {order.items.map((item, i) => (
                <li key={i}>
                  {item.name} × {item.qty}
                </li>
              ))}
            </ul>
          </div>

          <div className="order-actions">
            <button
              className="btn-processing"
              onClick={() => updateStatus(order.id, "Processing")}
            >
              Processing
            </button>
            <button
              className="btn-shipped"
              onClick={() => updateStatus(order.id, "Shipped")}
            >
              Shipped
            </button>
            <button
              className="btn-delivered"
              onClick={() => updateStatus(order.id, "Delivered")}
            >
              Delivered
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}









// import { useEffect, useState } from "react";

// export default function AdminOrders() {
//   const [orders, setOrders] = useState([]);

//   useEffect(() => {
//     const saved =
//       JSON.parse(localStorage.getItem("glamslot_orders")) || [];
//     setOrders(saved.reverse());
//   }, []);

//   const updateStatus = (id, status) => {
//     const updated = orders.map((o) =>
//       o.id === id ? { ...o, status } : o
//     );

//     setOrders(updated);

//     localStorage.setItem(
//       "glamslot_orders",
//       JSON.stringify([...updated].reverse())
//     );

//     window.dispatchEvent(new Event("ordersUpdated"));
//   };

//   return (
//     <div style={{ padding: 40, maxWidth: 1100, margin: "auto" }}>
//       <h1>📦 Admin Orders</h1>

//       {orders.length === 0 && (
//         <p>No orders placed yet.</p>
//       )}

//       {orders.map((order) => (
//         <div key={order.id} style={card}>
//           <div>
//             <strong>Order #{order.id}</strong>
//             <p>Date: {order.date}</p>
//             <p>Total: ₹{order.total}</p>

//             <p>
//               Status:{" "}
//               <strong style={{ color: statusColor(order.status) }}>
//                 {order.status}
//               </strong>
//             </p>

//             <ul style={{ paddingLeft: 18 }}>
//               {order.items.map((item, i) => (
//                 <li key={i}>
//                   {item.name} × {item.qty}
//                 </li>
//               ))}
//             </ul>
//           </div>

//           <div style={{ display: "flex", gap: 10 }}>
//             <button onClick={() => updateStatus(order.id, "Processing")}>
//               Processing
//             </button>
//             <button onClick={() => updateStatus(order.id, "Shipped")}>
//               Shipped
//             </button>
//             <button onClick={() => updateStatus(order.id, "Delivered")}>
//               Delivered
//             </button>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }

// const card = {
//   display: "flex",
//   justifyContent: "space-between",
//   alignItems: "flex-start",
//   gap: 20,
//   padding: 20,
//   marginBottom: 20,
//   background: "#fff",
//   borderRadius: 12,
//   boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
// };

// const statusColor = (status) => {
//   if (status === "Processing") return "orange";
//   if (status === "Shipped") return "blue";
//   if (status === "Delivered") return "green";
//   return "black";
// };