import { useRef, useEffect, useState } from "react";
import "../styles/shop.css";
import Footer from "../sections/Footer";
export default function Shop() {
  const productsRef = useRef(null);

  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("glamslot_cart");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("glamslot_cart", JSON.stringify(cart));
    window.dispatchEvent(new Event("cartUpdated"));
  }, [cart]);

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((p) => p.name === product.name);
      if (existing) {
        return prev.map((p) =>
          p.name === product.name ? { ...p, qty: p.qty + 1 } : p
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem("glamslot_wishlist");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("glamslot_wishlist", JSON.stringify(wishlist));
    window.dispatchEvent(new Event("wishlistUpdated"));
  }, [wishlist]);

  const toggleWishlist = (product) => {
    setWishlist((prev) => {
      const exists = prev.find((p) => p.name === product.name);
      if (exists) {
        return prev.filter((p) => p.name !== product.name);
      }
      return [...prev, product];
    });
  };

  const scrollToProducts = () => {
    productsRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const productImages = [
    "https://images.unsplash.com/photo-1585386959984-a41552231693",
    "https://images.unsplash.com/photo-1596462502278-27bfdc403348",
    "https://images.unsplash.com/photo-1600180758890-6b94519a8ba6",
    "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e",
    "https://images.unsplash.com/photo-1519744792095-2f2205e87b6f",
    "https://images.unsplash.com/photo-1517841905240-472988babdf9",
    "https://images.unsplash.com/photo-1500917293891-ef795e70e1f6",
    "https://images.unsplash.com/photo-1582095133179-bfd08e2fc6b3",
  ];

  const products = Array.from({ length: 50 }).map((_, i) => ({
    name: `Salon Care Product ${i + 1}`,
    price: 499 + (i % 6) * 250,
    img: productImages[i % productImages.length],
    desc: "Professional salon-grade care for everyday use",
  }));

  return (
    <div className="shop-page">
      <section className="shop-hero">
        <div className="shop-hero-content">
          <h1>GlamSlot Shop</h1>
          <p>Luxury salon products curated by professionals</p>
          <button onClick={scrollToProducts}>
            Start Shopping
          </button>
        </div>
      </section>

      <section className="shop-why">
        <h2>Why Shop With GlamSlot?</h2>

        <div className="why-grid">
          {whyData.map((w, i) => (
            <div key={i} className="why-card">
              <img src={w.img} alt={w.title} />
              <h4>{w.title}</h4>
              <p>{w.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="shop-products" ref={productsRef}>
        <h2>All Products</h2>

        <div className="products-grid">
          {products.map((p, i) => {
            const inCart = cart.find((c) => c.name === p.name);
            const inWishlist = wishlist.find((w) => w.name === p.name);

            return (
              <div key={i} className="product-card">
                <span
                  className={`wishlist-icon ${inWishlist ? "active" : ""}`}
                  onClick={() => toggleWishlist(p)}
                >
                  ♥
                </span>

                <img src={p.img} alt={p.name} />
                <h3>{p.name}</h3>
                <p className="desc">{p.desc}</p>
                <p className="price">₹{p.price}</p>

                <button
                  className={inCart ? "added" : ""}
                  onClick={() => addToCart(p)}
                >
                  {inCart ? `Added (${inCart.qty}) ✓` : "Add to Cart"}
                </button>
              </div>
            );
          })}
        </div>
      </section>

      <section className="shop-cta">
        <h2>Upgrade Your Routine</h2>
        <p>Bring the salon experience home</p>
        <button onClick={scrollToProducts}>
          Explore Products
        </button>
      </section>
      <Footer />
    </div>
  );
}

const whyData = [
  {
    title: "Professional Approved",
    text: "Used & trusted by certified salon professionals",
    img: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e",
  },
  {
    title: "Authentic Products",
    text: "100% genuine products from verified brands",
    img: "https://images.unsplash.com/photo-1585386959984-a41552231693",
  },
  {
    title: "Luxury Experience",
    text: "Premium care that delivers visible results",
    img: "https://images.unsplash.com/photo-1519744792095-2f2205e87b6f",
  },
  {
    title: "Fast Delivery",
    text: "Quick, safe & reliable doorstep delivery",
    img: "https://images.unsplash.com/photo-1600180758890-6b94519a8ba6",
  },
];





















// import { useRef, useEffect, useState } from "react";

// export default function Shop() {
//   const productsRef = useRef(null);
//   const [scrollY, setScrollY] = useState(0);

//   const [cart, setCart] = useState(() => {
//     const saved = localStorage.getItem("glamslot_cart");
//     return saved ? JSON.parse(saved) : [];
//   });
//   useEffect(() => {
//     localStorage.setItem("glamslot_cart", JSON.stringify(cart));
//     window.dispatchEvent(new Event("cartUpdated"));
//   }, [cart]);

//   const addToCart = (product) => {
//     setCart((prev) => {
//       const existing = prev.find((p) => p.name === product.name);
//       if (existing) {
//         return prev.map((p) =>
//           p.name === product.name ? { ...p, qty: p.qty + 1 } : p
//         );
//       }
//       return [...prev, { ...product, qty: 1 }];
//     });
//   };

//   const [wishlist, setWishlist] = useState(() => {
//     const saved = localStorage.getItem("glamslot_wishlist");
//     return saved ? JSON.parse(saved) : [];
//   });

//   useEffect(() => {
//     localStorage.setItem("glamslot_wishlist", JSON.stringify(wishlist));
//     window.dispatchEvent(new Event("wishlistUpdated"));
//   }, [wishlist]);

//   const toggleWishlist = (product) => {
//     setWishlist((prev) => {
//       const exists = prev.find((p) => p.name === product.name);
//       if (exists) {
//         return prev.filter((p) => p.name !== product.name);
//       }
//       return [...prev, product];
//     });
//   };

//   useEffect(() => {
//     const onScroll = () => setScrollY(window.scrollY);
//     window.addEventListener("scroll", onScroll);
//     return () => window.removeEventListener("scroll", onScroll);
//   }, []);

//   const scrollToProducts = () => {
//     productsRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   const productImages = [
//     "https://images.unsplash.com/photo-1585386959984-a41552231693",
//     "https://images.unsplash.com/photo-1596462502278-27bfdc403348",
//     "https://images.unsplash.com/photo-1600180758890-6b94519a8ba6",
//     "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e",
//     "https://images.unsplash.com/photo-1519744792095-2f2205e87b6f",
//     "https://images.unsplash.com/photo-1517841905240-472988babdf9",
//     "https://images.unsplash.com/photo-1500917293891-ef795e70e1f6",
//     "https://images.unsplash.com/photo-1582095133179-bfd08e2fc6b3",
//   ];

//   const products = Array.from({ length: 50 }).map((_, i) => ({
//     name: `Salon Care Product ${i + 1}`,
//     price: 499 + (i % 6) * 250,
//     img: productImages[i % productImages.length],
//     desc: "Professional salon-grade care for everyday use",
//   }));

//   return (
//     <div style={{ fontFamily: "sans-serif", overflowX: "hidden" }}>
//       <section
//         style={{
//           ...hero,
//           backgroundImage:
//             "url(https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb)",
//           transform: `translateY(${scrollY * 0.25}px)`,
//         }}
//         className="fade"
//       >
//         <div style={overlay} />
//         <div style={heroContent}>
//           <h1 style={heroTitle}>GlamSlot Shop</h1>
//           <p style={heroText}>
//             Luxury salon products curated by professionals
//           </p>
//           <button style={heroBtn} onClick={scrollToProducts}>
//             Start Shopping
//           </button>
//         </div>
//       </section>

//       <div style={{ height: 80 }} />

//       <section
//         style={{
//           ...heroSmall,
//           backgroundImage:
//             "url(https://images.unsplash.com/photo-1515378791036-0648a3ef77b2)",
//           transform: `translateY(${scrollY * 0.15}px)`,
//         }}
//         className="fade delay"
//       >
//         <div style={overlay} />
//         <div style={heroContent}>
//           <h2 style={{ fontSize: 42 }}>Salon Quality at Home</h2>
//           <p style={{ maxWidth: 520 }}>
//             Maintain your style with authentic, expert-approved products
//           </p>
//         </div>
//       </section>

//       <section style={whySection} className="fade">
//         <h2 style={heading}>Why Shop With GlamSlot?</h2>

//         <div style={whyGrid}>
//           {whyData.map((w, i) => (
//             <div key={i} style={whyCard}>
//               <img src={w.img} alt={w.title} style={whyImg} />
//               <h4>{w.title}</h4>
//               <p style={{ color: "#555" }}>{w.text}</p>
//             </div>
//           ))}
//         </div>
//       </section>

//       <section style={section} ref={productsRef} className="fade">
//         <h2 style={heading}>All Products</h2>

//         <div style={grid}>
//           {products.map((p, i) => {
//             const inCart = cart.find((c) => c.name === p.name);
//             const inWishlist = wishlist.find((w) => w.name === p.name);

//             return (
//               <div key={i} style={productCard} className="hover-card">
//                 <span
//                   onClick={() => toggleWishlist(p)}
//                   style={{
//                     position: "absolute",
//                     top: 14,
//                     right: 16,
//                     fontSize: 22,
//                     cursor: "pointer",
//                     color: inWishlist ? "red" : "#ccc",
//                   }}
//                 >
//                   ♥
//                 </span>

//                 <img
//                   src={p.img}
//                   alt={p.name}
//                   style={productImg}
//                   onError={(e) => {
//                     e.target.src =
//                       "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e";
//                   }}
//                 />
//                 <h3>{p.name}</h3>
//                 <p style={desc}>{p.desc}</p>
//                 <p style={price}>₹{p.price}</p>

//                 <button
//                   style={{
//                     ...btn,
//                     background: inCart ? "green" : "black",
//                   }}
//                   onClick={() => addToCart(p)}
//                 >
//                   {inCart ? `Added (${inCart.qty}) ✓` : "Add to Cart"}
//                 </button>
//               </div>
//             );
//           })}
//         </div>
//       </section>

//       <section style={cta} className="fade">
//         <h2>Upgrade Your Routine</h2>
//         <p>Bring the salon experience home</p>
//         <button style={ctaBtn} onClick={scrollToProducts}>
//           Explore Products
//         </button>
//       </section>

//       <style>{css}</style>
//     </div>
//   );
// }

// const whyData = [
//   {
//     title: "Professional Approved",
//     text: "Used & trusted by certified salon professionals",
//     img: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e",
//   },
//   {
//     title: "Authentic Products",
//     text: "100% genuine products from verified brands",
//     img: "https://images.unsplash.com/photo-1585386959984-a41552231693",
//   },
//   {
//     title: "Luxury Experience",
//     text: "Premium care that delivers visible results",
//     img: "https://images.unsplash.com/photo-1519744792095-2f2205e87b6f",
//   },
//   {
//     title: "Fast Delivery",
//     text: "Quick, safe & reliable doorstep delivery",
//     img: "https://images.unsplash.com/photo-1600180758890-6b94519a8ba6",
//   },
// ];

// const hero = {
//   height: "85vh",
//   backgroundSize: "cover",
//   backgroundPosition: "center",
//   position: "relative",
// };

// const heroSmall = {
//   height: "65vh",
//   backgroundSize: "cover",
//   backgroundPosition: "center",
//   position: "relative",
// };

// const overlay = {
//   position: "absolute",
//   inset: 0,
//   background: "rgba(0,0,0,0.6)",
// };

// const heroContent = {
//   position: "relative",
//   zIndex: 2,
//   height: "100%",
//   display: "flex",
//   flexDirection: "column",
//   justifyContent: "center",
//   alignItems: "center",
//   color: "white",
//   textAlign: "center",
// };

// const heroTitle = { fontSize: 56 };
// const heroText = { fontSize: 18, maxWidth: 600 };

// const heroBtn = {
//   marginTop: 25,
//   padding: "14px 38px",
//   borderRadius: 30,
//   border: "none",
//   cursor: "pointer",
// };

// const section = { padding: "100px 20px", maxWidth: 1300, margin: "auto" };
// const whySection = { padding: "100px 20px", background: "#f9f9f9" };
// const heading = { fontSize: 36, marginBottom: 40 };

// const whyGrid = {
//   display: "grid",
//   gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
//   gap: 30,
//   maxWidth: 1200,
//   margin: "auto",
// };

// const whyCard = {
//   background: "white",
//   padding: 20,
//   borderRadius: 18,
//   boxShadow: "0 15px 35px rgba(0,0,0,0.08)",
// };

// const whyImg = {
//   width: "100%",
//   height: 180,
//   objectFit: "cover",
//   borderRadius: 14,
//   marginBottom: 15,
// };

// const grid = {
//   display: "grid",
//   gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
//   gap: 40,
// };

// const productCard = {
//   position: "relative",
//   background: "white",
//   padding: 22,
//   borderRadius: 20,
//   boxShadow: "0 15px 40px rgba(0,0,0,0.08)",
//   textAlign: "center",
//   transition: "0.4s ease",
// };

// const productImg = {
//   width: "100%",
//   height: 260,
//   objectFit: "cover",
//   borderRadius: 16,
//   marginBottom: 15,
// };

// const desc = { fontSize: 14, color: "#666" };
// const price = { fontSize: 20, fontWeight: "bold" };

// const btn = {
//   padding: "10px 26px",
//   borderRadius: 30,
//   background: "black",
//   color: "white",
//   border: "none",
//   cursor: "pointer",
// };

// const cta = {
//   padding: 100,
//   background: "black",
//   color: "white",
//   textAlign: "center",
// };

// const ctaBtn = {
//   marginTop: 20,
//   padding: "14px 40px",
//   borderRadius: 30,
//   border: "none",
// };

// const css = `
// .fade {
//   animation: fadeUp 1.1s ease both;
// }
// .delay {
//   animation-delay: .3s;
// }
// @keyframes fadeUp {
//   from { opacity: 0; transform: translateY(60px); }
//   to { opacity: 1; transform: translateY(0); }
// }
// .hover-card:hover {
//   transform: translateY(-12px) scale(1.05);
// }
// `;