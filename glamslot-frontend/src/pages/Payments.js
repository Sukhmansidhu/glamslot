import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/payments.css";

export default function Payments() {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    const savedCart =
      JSON.parse(localStorage.getItem("glamslot_cart")) || [];
    setCart(savedCart);
  }, []);

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  const handlePayment = () => {
    if (cart.length === 0) {
      alert("Cart is empty");
      return;
    }

    setProcessing(true);

    setTimeout(() => {
      const order = {
        id: Date.now(),
        items: cart,
        total,
        date: new Date().toLocaleString(),
        status: "Processing",
        paymentMode: "Demo Payment",
        paymentId: "DEMO-" + Date.now(),
      };

      const orders =
        JSON.parse(localStorage.getItem("glamslot_orders")) || [];

      localStorage.setItem(
        "glamslot_orders",
        JSON.stringify([...orders, order])
      );

      window.dispatchEvent(new Event("ordersUpdated"));
      localStorage.removeItem("glamslot_cart");
      window.dispatchEvent(new Event("cartUpdated"));

      setProcessing(false);
      navigate("/orders");
    }, 1500);
  };

  return (
    <div className="payment-page">
      <h1 className="payment-title">💳 Payment</h1>

      {cart.length === 0 ? (
        <p className="payment-empty">Your cart is empty.</p>
      ) : (
        <>
          <div className="payment-box">
            {cart.map((item, i) => (
              <div key={i} className="payment-row">
                <span>
                  {item.name} × {item.qty}
                </span>
                <strong>₹{item.price * item.qty}</strong>
              </div>
            ))}

            <hr className="payment-divider" />

            <div className="payment-row total">
              <strong>Total</strong>
              <strong>₹{total}</strong>
            </div>
          </div>

          <button
            onClick={handlePayment}
            disabled={processing}
            className={`pay-btn ${processing ? "disabled" : ""}`}
          >
            {processing ? "Processing Payment..." : "Pay Now"}
          </button>

          <p className="payment-note">
            ⚠ This is a demo payment. No real money is charged.
          </p>
        </>
      )}
    </div>
  );
}















// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// export default function Payments() {
//   const navigate = useNavigate();
//   const [cart, setCart] = useState([]);
//   const [processing, setProcessing] = useState(false);

//   useEffect(() => {
//     const savedCart =
//       JSON.parse(localStorage.getItem("glamslot_cart")) || [];
//     setCart(savedCart);
//   }, []);

//   const total = cart.reduce(
//     (sum, item) => sum + item.price * item.qty,
//     0
//   );

//   const handlePayment = () => {
//     if (cart.length === 0) {
//       alert("Cart is empty");
//       return;
//     }

//     setProcessing(true);

//     setTimeout(() => {
//       const order = {
//         id: Date.now(),
//         items: cart,
//         total,
//         date: new Date().toLocaleString(),

//         status: "Processing", 
//         paymentMode: "Demo Payment",
//         paymentId: "DEMO-" + Date.now(),
//       };

//       const orders =
//         JSON.parse(localStorage.getItem("glamslot_orders")) || [];

//       localStorage.setItem(
//         "glamslot_orders",
//         JSON.stringify([...orders, order])
//       );
//       window.dispatchEvent(new Event("ordersUpdated"));
//       localStorage.removeItem("glamslot_cart");
//       window.dispatchEvent(new Event("cartUpdated"));

//       setProcessing(false);

//       navigate("/orders");
//     }, 1500);
//   };

//   return (
//     <div style={{ padding: 40, maxWidth: 900, margin: "auto" }}>
//       <h1 style={{ marginBottom: 30 }}>💳 Payment</h1>

//       {cart.length === 0 ? (
//         <p>Your cart is empty.</p>
//       ) : (
//         <>
//           <div style={box}>
//             {cart.map((item, i) => (
//               <div key={i} style={row}>
//                 <span>
//                   {item.name} × {item.qty}
//                 </span>
//                 <strong>₹{item.price * item.qty}</strong>
//               </div>
//             ))}

//             <hr style={{ margin: "20px 0" }} />

//             <div style={row}>
//               <strong>Total</strong>
//               <strong>₹{total}</strong>
//             </div>
//           </div>

//           <button
//             onClick={handlePayment}
//             disabled={processing}
//             style={{
//               ...payBtn,
//               opacity: processing ? 0.6 : 1,
//             }}
//           >
//             {processing ? "Processing Payment..." : "Pay Now"}
//           </button>

//           <p style={{ marginTop: 12, fontSize: 13, color: "gray" }}>
//             ⚠ This is a demo payment. No real money is charged.
//           </p>
//         </>
//       )}
//     </div>
//   );
// }


// const box = {
//   background: "#fff",
//   padding: 25,
//   borderRadius: 16,
//   boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
// };

// const row = {
//   display: "flex",
//   justifyContent: "space-between",
//   marginBottom: 10,
// };

// const payBtn = {
//   marginTop: 30,
//   padding: "14px 40px",
//   borderRadius: 30,
//   border: "none",
//   background: "black",
//   color: "white",
//   cursor: "pointer",
//   fontSize: 16,
// };