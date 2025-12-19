import { useContext, useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "../styles/navbar.css";
import snapchatIcon from "../assets/images/snapchat.png";
import instagramIcon from "../assets/images/insta.png";
import facebookIcon from "../assets/images/facebook.png";
import youtubeIcon from "../assets/images/youtube.png";
export default function Navbar() {
  const { user, wallet, logout } = useContext(AuthContext);

  const [open, setOpen] = useState(false);

  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [ordersCount, setOrdersCount] = useState(0);

  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);

  useEffect(() => {
    const loadAll = () => {
      const cart = JSON.parse(localStorage.getItem("glamslot_cart")) || [];
      const wishlist =
        JSON.parse(localStorage.getItem("glamslot_wishlist")) || [];
      const orders =
        JSON.parse(localStorage.getItem("glamslot_orders")) || [];

      setCartCount(cart.reduce((s, i) => s + (i.qty || 0), 0));
      setWishlistCount(wishlist.length);
      setOrdersCount(orders.length);
    };

    loadAll();
    window.addEventListener("cartUpdated", loadAll);
    window.addEventListener("wishlistUpdated", loadAll);
    window.addEventListener("ordersUpdated", loadAll);

    return () => {
      window.removeEventListener("cartUpdated", loadAll);
      window.removeEventListener("wishlistUpdated", loadAll);
      window.removeEventListener("ordersUpdated", loadAll);
    };
  }, []);

  return (
    <>
      <div className="topbar">
        <button
          className="menu-btn"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? "✕" : "☰"}
        </button>

        <Link
          to="/"
          className="logo"
          onClick={() => setOpen(false)}
        >
          GlamSlot
        </Link>

        <div className="top-actions1">
          <Link to="/salons">SALON FINDER</Link>
          <Link to="/shop">SHOP ONLINE</Link>
        </div>
      </div>

      {open && <div className="overlay" onClick={() => setOpen(false)} />}

      <nav className={`sidebar ${open ? "open" : ""}`}>
        <div className="nav-links">
          <Link to="/services" onClick={() => setOpen(false)}>
            🏠 Services
          </Link>

          <Link to="/salons" onClick={() => setOpen(false)}>
            📍 Find a Salon
          </Link>

          <Link to="/my-bookings" onClick={() => setOpen(false)}>
            📅 My Bookings
          </Link>

          <Link to="/our-story" onClick={() => setOpen(false)}>
            📖 Our Story
          </Link>

          <Link to="/shop" onClick={() => setOpen(false)}>
            🛍 Shop
          </Link>

          <Link to="/gift-cards" onClick={() => setOpen(false)}>
            🎁 Gift Cards
          </Link>

          <Link to="/refer" onClick={() => setOpen(false)}>
            🤝 Refer a Friend
          </Link>

          {wishlistCount > 0 && (
            <Link to="/wishlist" onClick={() => setOpen(false)}>
              ❤️ Wishlist ({wishlistCount})
            </Link>
          )}

          {cartCount > 0 && (
            <Link to="/cart" onClick={() => setOpen(false)}>
              🛒 Cart ({cartCount})
            </Link>
          )}

          {ordersCount > 0 && (
            <Link to="/orders" onClick={() => setOpen(false)}>
              📦 Orders ({ordersCount})
            </Link>
          )}

          {user && (
            <div className="wallet">
              💰 Wallet: ₹{wallet}
            </div>
          )}

          {user?.role === "admin" && (
            <>
              <Link to="/admin" onClick={() => setOpen(false)}>
                🛠 Admin Panel
              </Link>
              <Link to="/admin/orders" onClick={() => setOpen(false)}>
                📦 Admin Orders
              </Link>
            </>
          )}

          {user ? (
            <button className="logout" to="/" onClick={logout}>
              Logout
            </button>
          ) : (
            <>
              <Link
                className="login"
                to="/login"
                onClick={() => setOpen(false)}
              >
                Login
              </Link>

              <Link
                className="register"
                to="/register"
                onClick={() => setOpen(false)}
              >
                Register
              </Link>
            </>
          )}
        </div>

       <div className="social-footer">
  <a href="https://www.instagram.com/sukhmansidhu091" target="_blank" rel="noreferrer">
    <img src={instagramIcon} alt="Instagram" />
  </a>

  <a href="https://facebook.com/" target="_blank" rel="noreferrer">
    <img src={facebookIcon} alt="Facebook" />
  </a>

  <a href="https://www.youtube.com/@simranjeetsingh7106" target="_blank" rel="noreferrer">
    <img src={youtubeIcon} alt="YouTube" />
  </a>

  <a href="https://www.snapchat.com/@sukhman1565" target="_blank" rel="noreferrer">
    <img src={snapchatIcon} alt="Snapchat" />
  </a>
</div>
      </nav>
    </>
  );
}

// import { useContext, useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { AuthContext } from "../context/AuthContext";
// import socialLinks from "../config/socialLinks";

// import "../styles/navbar.css";
// const dropdownItem = {
//   display: "block",
//   padding: "10px 16px",
//   textDecoration: "none",
//   color: "#333",
//   fontSize: 14,
//   cursor: "pointer",
//   transition: "background 0.2s ease",
// };

// export default function Navbar() {
//   const { user, wallet, logout } = useContext(AuthContext);
//   const [showFollow, setShowFollow] = useState(false);
//   const [cartCount, setCartCount] = useState(0);
//   const [wishlistCount, setWishlistCount] = useState(0);
//   const [ordersCount, setOrdersCount] = useState(0);

//   useEffect(() => {
//     const loadCart = () => {
//       const cart =
//         JSON.parse(localStorage.getItem("glamslot_cart")) || [];
//       const count = cart.reduce(
//         (sum, item) => sum + (item.qty || 0),
//         0
//       );
//       setCartCount(count);
//     };

//     const loadWishlist = () => {
//       const wishlist =
//         JSON.parse(localStorage.getItem("glamslot_wishlist")) || [];
//       setWishlistCount(wishlist.length);
//     };

//     const loadOrders = () => {
//       const orders =
//         JSON.parse(localStorage.getItem("glamslot_orders")) || [];
//       setOrdersCount(orders.length);
//     };

//     loadCart();
//     loadWishlist();
//     loadOrders();

//     window.addEventListener("cartUpdated", loadCart);
//     window.addEventListener("wishlistUpdated", loadWishlist);
//     window.addEventListener("ordersUpdated", loadOrders);
//     window.addEventListener("storage", () => {
//       loadCart();
//       loadWishlist();
//       loadOrders();
//     });

//     return () => {
//       window.removeEventListener("cartUpdated", loadCart);
//       window.removeEventListener("wishlistUpdated", loadWishlist);
//       window.removeEventListener("ordersUpdated", loadOrders);
//     };
//   }, []);

//   return (
//     <nav
//       style={{
//         padding: 10,
//         borderBottom: "1px solid #ddd",
//         display: "flex",
//         alignItems: "center",
//         gap: 14,
//         flexWrap: "wrap",
//       }}
//     >
//       <Link to="/">Services</Link>
//       <Link to="/salons">Find a Salon</Link>
//       <Link to="/my-bookings">My Bookings</Link>
//       <Link to="/our-story">Our Story</Link>

//       <div
//         style={{ position: "relative" }}
//         onMouseEnter={() => setShowFollow(true)}
//         onMouseLeave={() => setShowFollow(false)}
//       >
//         <Link to="/follow-us" style={{ textDecoration: "none", color: "inherit" }}>
//           Follow Us ▾
//         </Link>

//         {showFollow && (
//           <div
//             style={{
//               position: "absolute",
//               top: "100%",
//               left: 0,
//               background: "#fff",
//               borderRadius: 10,
//               boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
//               padding: "6px 0",
//               minWidth: 180,
//               zIndex: 999,
//             }}
//           >
//             <a href={socialLinks.instagram} target="_blank" rel="noreferrer" style={dropdownItem}>
//               📸 Instagram
//             </a>
//             <a href={socialLinks.facebook} target="_blank" rel="noreferrer" style={dropdownItem}>
//               📘 Facebook
//             </a>
//             <a href={socialLinks.youtube} target="_blank" rel="noreferrer" style={dropdownItem}>
//               ▶️ YouTube
//             </a>
//           </div>
//         )}
//       </div>

//       <Link to="/gift-cards">Gift Cards</Link>
//       <Link to="/refer">Refer a Friend</Link>
//       <Link to="/shop">Shop</Link>

//       {wishlistCount > 0 && (
//         <Link
//           to="/wishlist"
//           style={{
//             fontWeight: "bold",
//             background: "#ffe6eb",
//             padding: "6px 12px",
//             borderRadius: 20,
//           }}
//         >
//           ❤️ Wishlist ({wishlistCount})
//         </Link>
//       )}

//       {cartCount > 0 && (
//         <Link
//           to="/cart"
//           style={{
//             fontWeight: "bold",
//             background: "#f1f1f1",
//             padding: "6px 12px",
//             borderRadius: 20,
//           }}
//         >
//           🛒 Your Cart ({cartCount})
//         </Link>
//       )}

//       {ordersCount > 0 && (
//         <Link
//           to="/orders"
//           style={{
//             fontWeight: "bold",
//             background: "#e8f5e9",
//             padding: "6px 12px",
//             borderRadius: 20,
//           }}
//         >
//           📦 Orders ({ordersCount})
//         </Link>
//       )}

//       {user && (
//         <span style={{ marginLeft: 15, fontWeight: "bold", color: "green" }}>
//           💰 Wallet: ₹{wallet}
//         </span>
//       )}

// {user?.role === "admin" && (
//   <>
//     <Link to="/admin" style={{ fontWeight: "bold" }}>
//       Admin Panel
//     </Link>

//     <Link
//       to="/admin/orders"
//       style={{
//         fontWeight: "bold",
//         background: "#eef2ff",
//         padding: "6px 12px",
//         borderRadius: 20,
//       }}
//     >
//       📦 Orders
//     </Link>
//   </>
// )}
//       {user ? (
//         <button onClick={logout} style={{ marginLeft: 20 }}>
//           Logout
//         </button>
//       ) : (
//         <>
//           <Link to="/login">Login</Link>
//           <Link to="/register">Register</Link>
//         </>
//       )}
//     </nav>
//   );
// }
