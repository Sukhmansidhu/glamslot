import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/cart.css";

export default function Cart() {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate(); 

  useEffect(() => {
    const loadCart = () => {
      const savedCart =
        JSON.parse(localStorage.getItem("glamslot_cart")) || [];
      setCart(savedCart);
    };

    loadCart(); 

    window.addEventListener("cartUpdated", loadCart);
    return () =>
      window.removeEventListener("cartUpdated", loadCart);
  }, []);

  const updateCart = (updatedCart) => {
    setCart(updatedCart); 
    localStorage.setItem("glamslot_cart", JSON.stringify(updatedCart));
    window.dispatchEvent(new Event("cartUpdated")); 
  };

  const increaseQty = (index) => {
    const updated = [...cart];
    updated[index].qty += 1;
    updateCart(updated);
  };

  const decreaseQty = (index) => {
    const updated = [...cart];
    if (updated[index].qty > 1) {
      updated[index].qty -= 1;
    } else {
      updated.splice(index, 1);
    }
    updateCart(updated);
  };

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  return (
    <div className="cart-page">
      <h1 className="cart-title">🛒 Your Cart</h1>

      {cart.length === 0 ? (
        <p className="empty-cart">Your cart is empty.</p>
      ) : (
        <>
          {cart.map((item, index) => (
            <div key={index} className="cart-card">
              <img
                src={item.img}
                alt={item.name}
                className="cart-image"
              />

              <div className="cart-info">
                <h3>{item.name}</h3>
                <p className="item-price">₹{item.price}</p>

                <div className="qty-box">
                  <button onClick={() => decreaseQty(index)}>-</button>
                  <span>{item.qty}</span>
                  <button onClick={() => increaseQty(index)}>+</button>
                </div>
              </div>

              <strong className="item-total">
                ₹{item.price * item.qty}
              </strong>
            </div>
          ))}

          <hr className="cart-divider" />

          <h2 className="cart-total">Total: ₹{total}</h2>

          <button
            className="checkout-btn"
            onClick={() => navigate("/payments")}
          >
            Proceed to Checkout
          </button>
        </>
      )}
    </div>
  );
}















// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// export default function Cart() {
//   const [cart, setCart] = useState([]);
//   const navigate = useNavigate(); 

//   useEffect(() => {
//     const loadCart = () => {
//       const savedCart =
//         JSON.parse(localStorage.getItem("glamslot_cart")) || [];
//       setCart(savedCart);
//     };

//     loadCart(); 

//     window.addEventListener("cartUpdated", loadCart);
//     return () =>
//       window.removeEventListener("cartUpdated", loadCart);
//   }, []);

//   const updateCart = (updatedCart) => {
//     setCart(updatedCart); 
//     localStorage.setItem("glamslot_cart", JSON.stringify(updatedCart));
//     window.dispatchEvent(new Event("cartUpdated")); 
//   };

//   const increaseQty = (index) => {
//     const updated = [...cart];
//     updated[index].qty += 1;
//     updateCart(updated);
//   };

//   const decreaseQty = (index) => {
//     const updated = [...cart];
//     if (updated[index].qty > 1) {
//       updated[index].qty -= 1;
//     } else {
//       updated.splice(index, 1);
//     }
//     updateCart(updated);
//   };

//   const total = cart.reduce(
//     (sum, item) => sum + item.price * item.qty,
//     0
//   );

//   return (
//     <div style={{ padding: 40, maxWidth: 1100, margin: "auto" }}>
//       <h1 style={{ marginBottom: 30 }}>🛒 Your Cart</h1>

//       {cart.length === 0 ? (
//         <p>Your cart is empty.</p>
//       ) : (
//         <>
//           {cart.map((item, index) => (
//             <div key={index} style={card}>
//               <img src={item.img} alt={item.name} style={img} />

//               <div style={{ flex: 1 }}>
//                 <h3>{item.name}</h3>
//                 <p>₹{item.price}</p>

//                 <div style={qtyBox}>
//                   <button onClick={() => decreaseQty(index)}>-</button>
//                   <span>{item.qty}</span>
//                   <button onClick={() => increaseQty(index)}>+</button>
//                 </div>
//               </div>

//               <strong>₹{item.price * item.qty}</strong>
//             </div>
//           ))}

//           <hr style={{ margin: "30px 0" }} />

//           <h2>Total: ₹{total}</h2>

//           <button
//             style={checkoutBtn}
//             onClick={() => navigate("/payments")}
//           >
//             Proceed to Checkout
//           </button>
//         </>
//       )}
//     </div>
//   );
// }

// const card = {
//   display: "flex",
//   alignItems: "center",
//   gap: 20,
//   padding: 20,
//   borderRadius: 16,
//   background: "#fff",
//   boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
//   marginBottom: 20,
// };

// const img = {
//   width: 100,
//   height: 100,
//   objectFit: "cover",
//   borderRadius: 12,
// };

// const qtyBox = {
//   display: "flex",
//   alignItems: "center",
//   gap: 10,
//   marginTop: 10,
// };

// const checkoutBtn = {
//   marginTop: 20,
//   padding: "14px 40px",
//   borderRadius: 30,
//   border: "none",
//   background: "black",
//   color: "white",
//   cursor: "pointer",
// };