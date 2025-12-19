import { useState } from "react";
import api from "../api/axios";
import "../styles/redeemGiftCard.css";

export default function RedeemGiftCard() {
  const [code, setCode] = useState("");

  const redeem = async () => {
    try {
      const res = await api.post("/giftcards/redeem", { code });
      alert(`₹${res.data.amount} added successfully 🎉`);
      setCode("");
    } catch (err) {
      alert(err.response?.data?.message);
    }
  };

  return (
    <div className="redeem-page">
      <div className="redeem-card">
        <h2 className="redeem-title">🎁 Redeem Gift Card</h2>

        <p className="redeem-subtitle">
          Enter your gift card code below to add balance to your wallet.
        </p>

        <input
          className="redeem-input"
          placeholder="Enter gift card code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />

        <button className="redeem-btn" onClick={redeem}>
          Redeem
        </button>
      </div>
    </div>
  );
}














// import { useState } from "react";
// import api from "../api/axios";

// export default function RedeemGiftCard() {
//   const [code, setCode] = useState("");

//   const redeem = async () => {
//     try {
//       const res = await api.post("/giftcards/redeem", { code });
//       alert(`₹${res.data.amount} added successfully 🎉`);
//       setCode("");
//     } catch (err) {
//       alert(err.response?.data?.message);
//     }
//   };

//   return (
//     <div style={{ padding: 20 }}>
//       <h2>🎁 Redeem Gift Card</h2>

//       <input
//         placeholder="Enter gift card code"
//         value={code}
//         onChange={(e) => setCode(e.target.value)}
//       />
//       <button onClick={redeem}>Redeem</button>
//     </div>
//   );
// }