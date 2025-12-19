import { useEffect, useState } from "react";
import jsPDF from "jspdf";
import "../styles/orders.css";
export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const STATUS_STEPS = ["Paid", "Processing", "Shipped", "Delivered"];

  useEffect(() => {
    const loadOrders = () => {
      const saved =
        JSON.parse(localStorage.getItem("glamslot_orders")) || [];
      setOrders(saved.reverse());
    };

    loadOrders();
    window.addEventListener("ordersUpdated", loadOrders);

    return () =>
      window.removeEventListener("ordersUpdated", loadOrders);
  }, []);

  const cancelOrder = (orderId) => {
    const updated = orders.map((o) =>
      o.id === orderId ? { ...o, status: "Cancelled" } : o
    );

    setOrders(updated);
    localStorage.setItem(
      "glamslot_orders",
      JSON.stringify([...updated].reverse())
    );

    window.dispatchEvent(new Event("ordersUpdated"));
  };

  const emailInvoice = (order) => {
    const body = `
GLAMSLOT INVOICE

Order ID: ${order.id}
Date: ${order.date}
Status: ${order.status}

Items:
${order.items
  .map(
    (i) => `${i.name} x ${i.qty} = ₹${i.price * i.qty}`
  )
  .join("\n")}

Total: ₹${order.total}

Thank you for shopping with GlamSlot!
`;

    window.location.href = `mailto:?subject=Invoice - Order ${order.id}&body=${encodeURIComponent(
      body
    )}`;
  };

  const downloadInvoice = (order) => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("GLAMSLOT INVOICE", 20, 20);
    doc.setFontSize(12);
    doc.text(`Order ID: ${order.id}`, 20, 35);
    doc.text(`Date: ${order.date}`, 20, 43);
    doc.text(`Status: ${order.status}`, 20, 51);
    doc.text("Items:", 20, 65);

    let y = 75;
    order.items.forEach((item) => {
      doc.text(
        `${item.name} x ${item.qty} = ₹${item.price * item.qty}`,
        20,
        y
      );
      y += 8;
    });

    doc.text(`Total: ₹${order.total}`, 20, y + 10);
    doc.text("Thank you for shopping with GlamSlot!", 20, y + 25);
    doc.save(`Invoice-${order.id}.pdf`);
  };

  const OrderTimeline = ({ status }) => {
    if (status === "Cancelled") return null;
    const currentIndex = STATUS_STEPS.indexOf(status);

    return (
      <div className="order-timeline">
        {STATUS_STEPS.map((step, index) => {
          const active = index <= currentIndex;
          return (
            <div key={step} className="timeline-step">
              <div
                className={`timeline-bar ${
                  active ? "active" : ""
                }`}
              />
              <small
                className={`timeline-label ${
                  active ? "active" : ""
                }`}
              >
                {step}
              </small>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="orders-page">
      <h1 className="orders-title">📦 My Orders</h1>

      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        orders.map((order) => (
          <div key={order.id} className="order-card">
            <div className="order-info">
              <strong>Order ID:</strong> #{order.id}
              <p><strong>Date:</strong> {order.date}</p>
              <p>
                <strong>Status:</strong>{" "}
                <span className={`status ${order.status}`}>
                  {order.status}
                </span>
              </p>
              <OrderTimeline status={order.status} />
            </div>

            <div className="order-actions">
              <strong className="order-total">
                ₹{order.total}
              </strong>

              <button
                className="btn primary"
                onClick={() => setSelectedOrder(order)}
              >
                View
              </button>

              <button
                className="btn secondary"
                onClick={() => downloadInvoice(order)}
              >
                Invoice
              </button>

              <button
                className="btn blue"
                onClick={() => emailInvoice(order)}
              >
                Email
              </button>

              {(order.status === "Paid" ||
                order.status === "Processing") && (
                <button
                  className="btn danger"
                  onClick={() => cancelOrder(order.id)}
                >
                  Cancel
                </button>
              )}
            </div>
          </div>
        ))
      )}

      {selectedOrder && (
        <div
          className="modal-overlay"
          onClick={() => setSelectedOrder(null)}
        >
          <div
            className="order-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <h2>🧾 Order Details</h2>

            <p>
              <strong>Status:</strong>{" "}
              <span
                className={`status ${selectedOrder.status}`}
              >
                {selectedOrder.status}
              </span>
            </p>

            <OrderTimeline status={selectedOrder.status} />

            <hr />

            {selectedOrder.items.map((item, i) => (
              <div key={i} className="item-row">
                <span>
                  {item.name} × {item.qty}
                </span>
                <strong>
                  ₹{item.price * item.qty}
                </strong>
              </div>
            ))}

            <h3>Total: ₹{selectedOrder.total}</h3>

            <button
              className="btn danger full"
              onClick={() => setSelectedOrder(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}








// import { useEffect, useState } from "react";
// import jsPDF from "jspdf";

// export default function Orders() {
//   const [orders, setOrders] = useState([]);
//   const [selectedOrder, setSelectedOrder] = useState(null);

//   const STATUS_STEPS = ["Paid", "Processing", "Shipped", "Delivered"];

//   useEffect(() => {
//     const loadOrders = () => {
//       const saved =
//         JSON.parse(localStorage.getItem("glamslot_orders")) || [];
//       setOrders(saved.reverse());
//     };

//     loadOrders();
//     window.addEventListener("ordersUpdated", loadOrders);

//     return () =>
//       window.removeEventListener("ordersUpdated", loadOrders);
//   }, []);

//   const cancelOrder = (orderId) => {
//     const updated = orders.map((o) =>
//       o.id === orderId ? { ...o, status: "Cancelled" } : o
//     );

//     setOrders(updated);
//     localStorage.setItem(
//       "glamslot_orders",
//       JSON.stringify([...updated].reverse())
//     );

//     window.dispatchEvent(new Event("ordersUpdated"));
//   };

//   const emailInvoice = (order) => {
//     const body = `
// GLAMSLOT INVOICE

// Order ID: ${order.id}
// Date: ${order.date}
// Status: ${order.status}

// Items:
// ${order.items
//   .map(
//     (i) => `${i.name} x ${i.qty} = ₹${i.price * i.qty}`
//   )
//   .join("\n")}

// Total: ₹${order.total}

// Thank you for shopping with GlamSlot!
// `;

//     window.location.href = `mailto:?subject=Invoice - Order ${order.id}&body=${encodeURIComponent(
//       body
//     )}`;
//   };

//   const downloadInvoice = (order) => {
//     const doc = new jsPDF();

//     doc.setFontSize(18);
//     doc.text("GLAMSLOT INVOICE", 20, 20);

//     doc.setFontSize(12);
//     doc.text(`Order ID: ${order.id}`, 20, 35);
//     doc.text(`Date: ${order.date}`, 20, 43);
//     doc.text(`Status: ${order.status}`, 20, 51);

//     doc.text("Items:", 20, 65);

//     let y = 75;
//     order.items.forEach((item) => {
//       doc.text(
//         `${item.name} x ${item.qty} = ₹${item.price * item.qty}`,
//         20,
//         y
//       );
//       y += 8;
//     });

//     doc.text(`Total: ₹${order.total}`, 20, y + 10);
//     doc.text("Thank you for shopping with GlamSlot!", 20, y + 25);

//     doc.save(`Invoice-${order.id}.pdf`);
//   };

//   const getStatusColor = (status) => {
//     switch (status) {
//       case "Paid":
//         return "blue";
//       case "Processing":
//         return "orange";
//       case "Shipped":
//         return "#6a1b9a";
//       case "Delivered":
//         return "green";
//       case "Cancelled":
//         return "red";
//       default:
//         return "gray";
//     }
//   };

//   const OrderTimeline = ({ status }) => {
//     if (status === "Cancelled") return null;

//     const currentIndex = STATUS_STEPS.indexOf(status);

//     return (
//       <div style={{ display: "flex", gap: 10, marginTop: 12 }}>
//         {STATUS_STEPS.map((step, index) => {
//           const active = index <= currentIndex;

//           return (
//             <div key={step} style={{ flex: 1, textAlign: "center" }}>
//               <div
//                 style={{
//                   height: 8,
//                   borderRadius: 10,
//                   background: active ? "green" : "#ddd",
//                   marginBottom: 6,
//                 }}
//               />
//               <small
//                 style={{
//                   color: active ? "green" : "#999",
//                   fontWeight: active ? "bold" : "normal",
//                 }}
//               >
//                 {step}
//               </small>
//             </div>
//           );
//         })}
//       </div>
//     );
//   };

//   return (
//     <div style={{ padding: 40, maxWidth: 1100, margin: "auto" }}>
//       <h1 style={{ marginBottom: 30 }}>📦 My Orders</h1>

//       {orders.length === 0 ? (
//         <p>You have no orders yet.</p>
//       ) : (
//         orders.map((order) => (
//           <div key={order.id} style={orderCard}>
//             <div style={{ flex: 1 }}>
//               <strong>Order ID:</strong> #{order.id}
//               <p><strong>Date:</strong> {order.date}</p>
//               <p>
//                 <strong>Status:</strong>{" "}
//                 <span style={{ color: getStatusColor(order.status) }}>
//                   {order.status}
//                 </span>
//               </p>

//               <OrderTimeline status={order.status} />
//             </div>

//             <div style={{ textAlign: "right" }}>
//               <strong>₹{order.total}</strong>
//               <br />

//               <button style={btn} onClick={() => setSelectedOrder(order)}>
//                 View
//               </button>

//               <button style={btnAlt} onClick={() => downloadInvoice(order)}>
//                 Invoice
//               </button>

//               <button
//                 style={{ ...btnAlt, background: "#1976d2" }}
//                 onClick={() => emailInvoice(order)}
//               >
//                 Email Invoice
//               </button>

//               {(order.status === "Paid" ||
//                 order.status === "Processing") && (
//                 <button
//                   style={{ ...btnAlt, background: "#e53935" }}
//                   onClick={() => cancelOrder(order.id)}
//                 >
//                   Cancel Order
//                 </button>
//               )}
//             </div>
//           </div>
//         ))
//       )}

//       {selectedOrder && (
//         <div style={overlay} onClick={() => setSelectedOrder(null)}>
//           <div style={modal} onClick={(e) => e.stopPropagation()}>
//             <h2>🧾 Order Details</h2>

//             <p>
//               <strong>Status:</strong>{" "}
//               <span style={{ color: getStatusColor(selectedOrder.status) }}>
//                 {selectedOrder.status}
//               </span>
//             </p>

//             <OrderTimeline status={selectedOrder.status} />

//             <hr style={{ margin: "16px 0" }} />

//             {selectedOrder.items.map((item, i) => (
//               <div key={i} style={itemRow}>
//                 <span>
//                   {item.name} × {item.qty}
//                 </span>
//                 <strong>₹{item.price * item.qty}</strong>
//               </div>
//             ))}

//             <h3>Total: ₹{selectedOrder.total}</h3>

//             <button style={closeBtn} onClick={() => setSelectedOrder(null)}>
//               Close
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// const orderCard = {
//   display: "flex",
//   justifyContent: "space-between",
//   padding: 20,
//   borderRadius: 16,
//   background: "#fff",
//   boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
//   marginBottom: 20,
// };

// const btn = {
//   marginTop: 6,
//   padding: "6px 14px",
//   borderRadius: 16,
//   border: "none",
//   background: "black",
//   color: "white",
//   cursor: "pointer",
// };

// const btnAlt = {
//   ...btn,
//   background: "#555",
//   marginLeft: 6,
// };

// const overlay = {
//   position: "fixed",
//   inset: 0,
//   background: "rgba(0,0,0,0.6)",
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "center",
// };

// const modal = {
//   background: "#fff",
//   padding: 30,
//   borderRadius: 18,
//   width: "90%",
//   maxWidth: 500,
// };

// const itemRow = {
//   display: "flex",
//   justifyContent: "space-between",
//   marginBottom: 10,
// };

// const closeBtn = {
//   marginTop: 20,
//   padding: "10px 30px",
//   borderRadius: 30,
//   border: "none",
//   background: "#e53935",
//   color: "white",
//   cursor: "pointer",
// };