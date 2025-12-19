import { useEffect, useState } from "react";
import api from "../api/axios";
import "../styles/adminGiftCards.css";

export default function AdminGiftCards() {
  const [amount, setAmount] = useState("");
  const [cards, setCards] = useState([]);

  const loadCards = async () => {
    const res = await api.get("/giftcards");
    setCards(res.data);
  };

  const createCard = async () => {
    if (!amount) return alert("Enter amount");

    await api.post("/giftcards", { amount });
    setAmount("");
    loadCards();
  };

  useEffect(() => {
    loadCards();
  }, []);

  return (
    <div className="admin-giftcards">
      <h2 className="admin-giftcards-title">🎁 Gift Cards (Admin)</h2>

      <div className="giftcard-form">
        <input
          className="giftcard-input"
          placeholder="Amount ₹"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <button className="giftcard-btn" onClick={createCard}>
          Create Gift Card
        </button>
      </div>

      <hr className="giftcard-divider" />

      <div className="giftcard-list">
        {cards.map((c) => (
          <div key={c._id} className="giftcard-item">
            <span className="giftcard-code">{c.code}</span>
            <span className="giftcard-amount">₹{c.amount}</span>
            <span
              className={`giftcard-status ${
                c.isRedeemed ? "used" : "active"
              }`}
            >
              {c.isRedeemed ? "Used ❌" : "Active ✅"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}










// import { useEffect, useState } from "react";
// import api from "../api/axios";

// export default function AdminGiftCards() {
//   const [amount, setAmount] = useState("");
//   const [cards, setCards] = useState([]);

//   const loadCards = async () => {
//     const res = await api.get("/giftcards");
//     setCards(res.data);
//   };

//   const createCard = async () => {
//     if (!amount) return alert("Enter amount");

//     await api.post("/giftcards", { amount });
//     setAmount("");
//     loadCards();
//   };

//   useEffect(() => {
//     loadCards();
//   }, []);

//   return (
//     <div style={{ padding: 20 }}>
//       <h2>🎁 Gift Cards (Admin)</h2>

//       <input
//         placeholder="Amount ₹"
//         value={amount}
//         onChange={(e) => setAmount(e.target.value)}
//       />
//       <button onClick={createCard}>Create Gift Card</button>

//       <hr />

//       {cards.map((c) => (
//         <div key={c._id} style={{ marginBottom: 8 }}>
//           <b>{c.code}</b> — ₹{c.amount} —{" "}
//           {c.isRedeemed ? "Used ❌" : "Active ✅"}
//         </div>
//       ))}
//     </div>
//   );
// }