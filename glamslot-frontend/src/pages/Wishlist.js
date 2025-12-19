import { useEffect, useState } from "react";
import "../styles/wishlist.css";

export default function Wishlist() {
  const [wishlist, setWishlist] = useState([]);

  const loadWishlist = () => {
    const saved =
      JSON.parse(localStorage.getItem("glamslot_wishlist")) || [];
    setWishlist(saved);
  };

  useEffect(() => {
    loadWishlist();

    const handler = () => loadWishlist();
    window.addEventListener("wishlistUpdated", handler);

    return () => {
      window.removeEventListener("wishlistUpdated", handler);
    };
  }, []);

  const updateWishlist = (updated) => {
    setWishlist(updated);
    localStorage.setItem(
      "glamslot_wishlist",
      JSON.stringify(updated)
    );

    window.dispatchEvent(new Event("wishlistUpdated"));
  };

  const removeItem = (index) => {
    const updated = [...wishlist];
    updated.splice(index, 1);
    updateWishlist(updated);
  };

  return (
    <div className="wishlist-page">
      <h1 className="wishlist-title">❤️ Your Wishlist</h1>

      {wishlist.length === 0 ? (
        <p className="wishlist-empty">
          Your wishlist is empty.
        </p>
      ) : (
        wishlist.map((item, index) => (
          <div key={index} className="wishlist-card">
            <img
              src={item.img}
              alt={item.name}
              className="wishlist-img"
            />

            <div className="wishlist-info">
              <h3>{item.name}</h3>
              <p className="wishlist-price">₹{item.price}</p>
            </div>

            <button
              onClick={() => removeItem(index)}
              className="wishlist-remove"
            >
              Remove
            </button>
          </div>
        ))
      )}
    </div>
  );
}
















// import { useEffect, useState } from "react";

// export default function Wishlist() {
//   const [wishlist, setWishlist] = useState([]);

//   const loadWishlist = () => {
//     const saved =
//       JSON.parse(localStorage.getItem("glamslot_wishlist")) || [];
//     setWishlist(saved);
//   };

//   useEffect(() => {
//     loadWishlist();

//     const handler = () => loadWishlist();
//     window.addEventListener("wishlistUpdated", handler);

//     return () => {
//       window.removeEventListener("wishlistUpdated", handler);
//     };
//   }, []);

//   const updateWishlist = (updated) => {
//     setWishlist(updated);
//     localStorage.setItem(
//       "glamslot_wishlist",
//       JSON.stringify(updated)
//     );

//     window.dispatchEvent(new Event("wishlistUpdated"));
//   };

//   const removeItem = (index) => {
//     const updated = [...wishlist];
//     updated.splice(index, 1);
//     updateWishlist(updated);
//   };

//   return (
//     <div style={{ padding: 40, maxWidth: 1100, margin: "auto" }}>
//       <h1 style={{ marginBottom: 30 }}>❤️ Your Wishlist</h1>

//       {wishlist.length === 0 ? (
//         <p>Your wishlist is empty.</p>
//       ) : (
//         wishlist.map((item, index) => (
//           <div key={index} style={card}>
//             <img src={item.img} alt={item.name} style={img} />

//             <div style={{ flex: 1 }}>
//               <h3>{item.name}</h3>
//               <p>₹{item.price}</p>
//             </div>

//             <button
//               onClick={() => removeItem(index)}
//               style={removeBtn}
//             >
//               Remove
//             </button>
//           </div>
//         ))
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

// const removeBtn = {
//   padding: "8px 20px",
//   borderRadius: 20,
//   border: "none",
//   background: "#e53935",
//   color: "white",
//   cursor: "pointer",
// };