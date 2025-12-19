import { useState,useEffect } from "react";
import api from "../api/axios";
import "../styles/giftCards.css";
import Footer from "../sections/Footer";
import { createPortal } from "react-dom";
export default function GiftCards() {
  const [selectedCard, setSelectedCard] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  const cards = [
    {
      amount: 1000,
      desc: "Perfect for a quick refresh",
      img: "https://cdn-icons-png.flaticon.com/512/2331/2331940.png",
    },
    {
      amount: 2500,
      desc: "Ideal for premium services",
      img: "https://cdn-icons-png.flaticon.com/512/3534/3534064.png",
    },
    {
      amount: 5000,
      desc: "Luxury salon experience",
      img: "https://cdn-icons-png.flaticon.com/512/869/869636.png",
    },
  ];

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const closeModal = () => {
    setSelectedCard(null);
    setName("");
    setEmail("");
    setLoading(false);
  };

  const confirmPurchase = async () => {
    if (!name || !email) {
      showToast("Please fill all details", "error");
      return;
    }

    try {
      setLoading(true);
      await api.post("/giftcards/send", {
        email,
        amount: selectedCard.amount,
        name,
      });

      showToast(
        `🎉 Gift Card of ₹${selectedCard.amount} sent to ${email}`,
        "success"
      );
      closeModal();
    } catch {
      showToast("❌ Email sending failed", "error");
      setLoading(false);
    }
  };
useEffect(() => {
  console.log("Selected card:", selectedCard);
}, [selectedCard]);
  return (
    <div className="gift-page">
      {toast && (
        <div className={`toast ${toast.type}`}>
          {toast.message}
        </div>
      )}

      {/* PAGE 1 — HERO */}
      <section className="gift-hero">
        <h1>🎁 GlamSlot Gift Cards</h1>
        <p>
          The most thoughtful way to gift confidence, style & self-care.
          Redeemable across all GlamSlot salons with instant delivery.
        </p>
      </section>

      {/* PAGE 2 — GIFT CARDS */}
      <section className="gift-grid">
        {cards.map((c, i) => (
          <div
            key={i}
            className="gift-card"
            onClick={() => setSelectedCard(c)}
          >
            <img src={c.img} alt="gift" />
            <h2>₹{c.amount}</h2>
            <p>{c.desc}</p>

            <ul>
              <li>✔ Valid at all salons</li>
              <li>✔ No expiry date</li>
              <li>✔ Instant email delivery</li>
              <li>✔ Easy redemption</li>
            </ul>

            <button>Buy Now</button>
          </div>
        ))}
      </section>

      {/* PAGE 3 — WHY GIFT */}
      <section className="gift-benefits">
        <h2>Why Choose GlamSlot Gift Cards?</h2>
        <div className="benefits-grid">
          <div>
            <h4>💇‍♀️ Premium Experiences</h4>
            <p>Hair, beauty & grooming services by trained professionals.</p>
          </div>
          <div>
            <h4>⏱ Flexible Usage</h4>
            <p>Redeem anytime — no expiry, no pressure.</p>
          </div>
          <div>
            <h4>🎯 Perfect for Everyone</h4>
            <p>Birthdays, anniversaries, weddings & self-care.</p>
          </div>
          <div>
            <h4>🔐 Safe & Digital</h4>
            <p>Secure codes delivered instantly via email.</p>
          </div>
        </div>
      </section>

      {/* PAGE 4 — HOW IT WORKS */}
      <section className="gift-steps">
        <h2>How It Works</h2>
        <div className="steps-grid">
          {[
            "Choose a gift card amount",
            "Enter recipient details",
            "Instant email delivery",
            "Redeem during booking",
          ].map((step, i) => (
            <div key={i} className="step-card">
              <h3>Step {i + 1}</h3>
              <p>{step}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PAGE 5 — USE CASES */}
      <section className="gift-occasions">
        <h2>Perfect For Every Occasion</h2>
        <div className="occasion-grid">
          <span>🎂 Birthdays</span>
          <span>💍 Weddings</span>
          <span>🎉 Festivals</span>
          <span>👩‍❤️‍👨 Anniversaries</span>
          <span>🎁 Corporate Gifting</span>
          <span>🖤 Self Love</span>
        </div>
      </section>

      {/* PAGE 6 — TRUST */}
      <section className="gift-trust">
        <h2>Trusted by Thousands</h2>
        <p>
          GlamSlot gift cards are loved by clients across cities for their
          flexibility, premium experience and seamless booking.
        </p>
        <p>
          Once gifted, always remembered.
        </p>
      </section>

      {/* MODAL */}
     {selectedCard &&
  createPortal(
    <div className="gift-modal-overlay">
      <div className="gift-modal">
        <h3>Checkout</h3>
        <p>Gift Card: ₹{selectedCard.amount}</p>

        <input
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          placeholder="Recipient Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button onClick={confirmPurchase} disabled={loading}>
          {loading ? "Sending..." : "Confirm Purchase"}
        </button>

        <button className="cancel-btn" onClick={closeModal}>
          Cancel
        </button>
      </div>
    </div>,
    document.getElementById("modal-root")
  )
}

      {/* FOOTER */}
      <Footer />
    </div>
  );
}










// import { useState } from "react";
// import api from "../api/axios";

// export default function GiftCards() {
//   const [selectedCard, setSelectedCard] = useState(null);
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [toast, setToast] = useState(null);

//   const cards = [
//     {
//       amount: 1000,
//       desc: "Perfect for a quick refresh",
//       img: "https://cdn-icons-png.flaticon.com/512/2331/2331940.png",
//     },
//     {
//       amount: 2500,
//       desc: "Ideal for premium services",
//       img: "https://cdn-icons-png.flaticon.com/512/3534/3534064.png",
//     },
//     {
//       amount: 5000,
//       desc: "Luxury salon experience",
//       img: "https://cdn-icons-png.flaticon.com/512/869/869636.png",
//     },
//   ];

//   const showToast = (message, type = "success") => {
//     setToast({ message, type });
//     setTimeout(() => setToast(null), 3000);
//   };

//   const closeModal = () => {
//     setSelectedCard(null);
//     setName("");
//     setEmail("");
//     setLoading(false);
//   };

//   const confirmPurchase = async () => {
//     if (!name || !email) {
//       showToast("Please fill all details", "error");
//       return;
//     }

//     try {
//       setLoading(true);
//       await api.post("/giftcards/send", {
//         email,
//         amount: selectedCard.amount,
//         name,
//       });

//       showToast(
//         `🎉 Gift Card of ₹${selectedCard.amount} sent to ${email}`,
//         "success"
//       );
//       closeModal();
//     } catch {
//       showToast("❌ Email sending failed", "error");
//       setLoading(false);
//     }
//   };

//   return (
//     <div style={{ padding: 50, maxWidth: 1200, margin: "auto" }}>
//       {toast && (
//         <div
//           style={{
//             position: "fixed",
//             top: 20,
//             right: 20,
//             padding: "14px 20px",
//             borderRadius: 10,
//             background: toast.type === "success" ? "#16a34a" : "#dc2626",
//             color: "white",
//             zIndex: 2000,
//             animation: "fadeIn 0.4s ease",
//           }}
//         >
//           {toast.message}
//         </div>
//       )}

//       <section style={{ marginBottom: 70 }}>
//         <h1 style={{ fontSize: 44 }}>🎁 GlamSlot Gift Cards</h1>
//         <p style={{ fontSize: 18, color: "#555", maxWidth: 750 }}>
//           A perfect way to treat your loved ones. Redeemable across all GlamSlot
//           salons with no expiry and instant email delivery.
//         </p>
//       </section>

//       <section
//         style={{
//           display: "grid",
//           gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
//           gap: 35,
//         }}
//       >
//         {cards.map((c, i) => (
//           <div
//             key={i}
//             style={{
//               borderRadius: 20,
//               padding: 35,
//               background: "white",
//               boxShadow: "0 20px 40px rgba(0,0,0,0.12)",
//               transition: "transform 0.3s ease, box-shadow 0.3s ease",
//             }}
//             onMouseEnter={(e) => {
//               e.currentTarget.style.transform = "translateY(-8px)";
//               e.currentTarget.style.boxShadow =
//                 "0 30px 60px rgba(0,0,0,0.18)";
//             }}
//             onMouseLeave={(e) => {
//               e.currentTarget.style.transform = "translateY(0)";
//               e.currentTarget.style.boxShadow =
//                 "0 20px 40px rgba(0,0,0,0.12)";
//             }}
//           >
//             <img
//               src={c.img}
//               alt="gift"
//               style={{ width: 80, marginBottom: 20 }}
//             />

//             <h2 style={{ fontSize: 34 }}>₹{c.amount}</h2>
//             <p style={{ color: "#666", marginBottom: 15 }}>{c.desc}</p>

//             <ul style={{ color: "#555", lineHeight: "28px" }}>
//               <li>✔ Valid at all salons</li>
//               <li>✔ No expiry date</li>
//               <li>✔ Instant email delivery</li>
//               <li>✔ Easy redemption</li>
//             </ul>

//             <button
//               onClick={() => setSelectedCard(c)}
//               style={{
//                 marginTop: 25,
//                 padding: "12px 26px",
//                 borderRadius: 30,
//                 background: "black",
//                 color: "white",
//                 border: "none",
//                 fontSize: 16,
//                 cursor: "pointer",
//               }}
//             >
//               Buy Now
//             </button>
//           </div>
//         ))}
//       </section>

//       <section style={{ marginTop: 80 }}>
//         <h2>How It Works</h2>
//         <div
//           style={{
//             display: "grid",
//             gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
//             gap: 30,
//             marginTop: 20,
//           }}
//         >
//           {[
//             "Choose a gift card amount",
//             "Enter recipient details",
//             "Instant email delivery",
//             "Redeem during booking",
//           ].map((step, i) => (
//             <div
//               key={i}
//               style={{
//                 padding: 25,
//                 borderRadius: 16,
//                 background: "#f9fafb",
//                 boxShadow: "0 10px 20px rgba(0,0,0,0.08)",
//               }}
//             >
//               <h3>Step {i + 1}</h3>
//               <p style={{ color: "#555" }}>{step}</p>
//             </div>
//           ))}
//         </div>
//       </section>

//       {selectedCard && (
//         <div
//           style={{
//             position: "fixed",
//             inset: 0,
//             background: "rgba(0,0,0,0.6)",
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//             zIndex: 1000,
//           }}
//         >
//           <div
//             style={{
//               background: "white",
//               padding: 30,
//               borderRadius: 18,
//               width: 380,
//               animation: "fadeIn 0.3s ease",
//             }}
//           >
//             <h3>Checkout</h3>
//             <p>Gift Card: ₹{selectedCard.amount}</p>

//             <input
//               placeholder="Your Name"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               style={{ width: "100%", marginBottom: 10, padding: 10 }}
//             />

//             <input
//               placeholder="Recipient Email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               style={{ width: "100%", marginBottom: 15, padding: 10 }}
//             />

//             <button
//               onClick={confirmPurchase}
//               disabled={loading}
//               style={{
//                 width: "100%",
//                 padding: 12,
//                 background: "black",
//                 color: "white",
//                 borderRadius: 25,
//                 border: "none",
//               }}
//             >
//               {loading ? "Sending..." : "Confirm Purchase"}
//             </button>

//             <button
//               onClick={closeModal}
//               style={{
//                 marginTop: 10,
//                 width: "100%",
//                 background: "transparent",
//                 border: "none",
//                 color: "#777",
//               }}
//             >
//               Cancel
//             </button>
//           </div>
//         </div>
//       )}

//       <style>
//         {`
//           @keyframes fadeIn {
//             from { opacity: 0; transform: scale(0.95); }
//             to { opacity: 1; transform: scale(1); }
//           }
//         `}
//       </style>
//     </div>
//   );
// }