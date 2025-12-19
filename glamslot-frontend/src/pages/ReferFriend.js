import { useEffect, useState } from "react";
import api from "../api/axios";
import { toast } from "react-toastify";
import "../styles/referFriend.css";

export default function ReferFriend() {
  const [code, setCode] = useState("");
  const [myReferrals, setMyReferrals] = useState([]);
  const [applyCode, setApplyCode] = useState("");
  const [loading, setLoading] = useState(false);

  const generateCode = async () => {
    try {
      setLoading(true);
      const res = await api.post("/referrals/create");
      setCode(res.data.code);
      toast.success("🎉 Referral code generated successfully");
    } catch {
      toast.error("❌ Failed to generate referral code");
    } finally {
      setLoading(false);
    }
  };

  const loadMyReferrals = async () => {
    try {
      const res = await api.get("/referrals/my");
      setMyReferrals(res.data);
    } catch {
      toast.error("❌ Failed to load referrals");
    }
  };

  const submitCode = async () => {
    if (!applyCode) {
      toast.warning("⚠️ Please enter referral code");
      return;
    }

    try {
      await api.post("/referrals/apply", { code: applyCode });
      toast.success("🎉 Referral applied! ₹50 added to your wallet");
      setApplyCode("");
      loadMyReferrals();
      window.dispatchEvent(new Event("wallet-updated"));
    } catch (err) {
      toast.error(err.response?.data?.message || "❌ Invalid referral code");
    }
  };

  useEffect(() => {
    loadMyReferrals();
  }, []);

  return (
    <div className="refer-page">
      <h1 className="refer-title">🤝 Refer a Friend</h1>
      <p className="refer-subtitle">
        Invite friends & earn wallet rewards when they join GlamSlot.
      </p>

      <div className="refer-box">
        <h3>🎁 How You Benefit</h3>
        <ul className="refer-benefits">
          <li>👤 You invite a friend → <b>You get ₹100</b></li>
          <li>🎉 Friend signs up → <b>They get ₹50</b></li>
          <li>💳 Wallet usable directly for bookings</li>
          <li>❌ No expiry · ❌ No minimum booking</li>
        </ul>
      </div>

      <div className="refer-box">
        <h3>Your Referral Code</h3>

        <button
          className="refer-btn dark"
          onClick={generateCode}
          disabled={loading}
        >
          {loading ? "Generating..." : "Generate Code"}
        </button>

        {code && (
          <p className="refer-code">
            🎁 <b>{code}</b>
          </p>
        )}
      </div>

      <div className="refer-box">
        <h3>Apply Referral Code</h3>

        <input
          className="refer-input"
          placeholder="Enter referral code"
          value={applyCode}
          onChange={(e) => setApplyCode(e.target.value)}
        />

        <button
          className="refer-btn success"
          onClick={submitCode}
        >
          Apply Code
        </button>
      </div>

      <div className="refer-history">
        <h3>📋 My Referrals</h3>

        {myReferrals.length === 0 && (
          <p className="empty-text">No referrals yet</p>
        )}

        {myReferrals.map((r) => (
          <div key={r._id} className="refer-item">
            <b>{r.code}</b> —{" "}
            <span
              className={
                r.rewardGiven ? "status success" : "status pending"
              }
            >
              {r.rewardGiven
                ? "Reward Credited ✅"
                : "Waiting for friend ⏳"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}















// import { useEffect, useState } from "react";
// import api from "../api/axios";
// import { toast } from "react-toastify";

// export default function ReferFriend() {
//   const [code, setCode] = useState("");
//   const [myReferrals, setMyReferrals] = useState([]);
//   const [applyCode, setApplyCode] = useState("");
//   const [loading, setLoading] = useState(false);

//   const generateCode = async () => {
//     try {
//       setLoading(true);
//       const res = await api.post("/referrals/create");
//       setCode(res.data.code);
//       toast.success("🎉 Referral code generated successfully");
//     } catch {
//       toast.error("❌ Failed to generate referral code");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const loadMyReferrals = async () => {
//     try {
//       const res = await api.get("/referrals/my");
//       setMyReferrals(res.data);
//     } catch {
//       toast.error("❌ Failed to load referrals");
//     }
//   };

//   const submitCode = async () => {
//     if (!applyCode) {
//       toast.warning("⚠️ Please enter referral code");
//       return;
//     }

//     try {
//       await api.post("/referrals/apply", { code: applyCode });

//       toast.success("🎉 Referral applied! ₹50 added to your wallet");

//       setApplyCode("");
//       loadMyReferrals();

//       window.dispatchEvent(new Event("wallet-updated"));
//     } catch (err) {
//       toast.error(err.response?.data?.message || "❌ Invalid referral code");
//     }
//   };

//   useEffect(() => {
//     loadMyReferrals();
//   }, []);

//   return (
//     <div style={{ padding: 30, maxWidth: 700, margin: "auto" }}>
//       <h1>🤝 Refer a Friend</h1>
//       <p style={{ color: "#555" }}>
//         Invite friends & earn wallet rewards when they join GlamSlot.
//       </p>

//       <div
//         style={{
//           marginTop: 20,
//           padding: 20,
//           background: "#f9f9f9",
//           borderRadius: 12,
//           border: "1px solid #eee",
//         }}
//       >
//         <h3>🎁 How You Benefit</h3>
//         <ul style={{ lineHeight: "28px", color: "#444" }}>
//           <li>👤 You invite a friend → <b>You get ₹100</b> in wallet</li>
//           <li>🎉 Friend signs up using your code → <b>They get ₹50</b></li>
//           <li>💳 Wallet money can be used directly while booking</li>
//           <li>❌ No expiry · ❌ No minimum booking amount</li>
//         </ul>
//       </div>

//       <div
//         style={{
//           marginTop: 30,
//           padding: 20,
//           border: "1px solid #ddd",
//           borderRadius: 12,
//         }}
//       >
//         <h3>Your Referral Code</h3>

//         <button
//           onClick={generateCode}
//           disabled={loading}
//           style={{
//             padding: "10px 18px",
//             background: "black",
//             color: "white",
//             border: "none",
//             borderRadius: 20,
//             cursor: "pointer",
//           }}
//         >
//           {loading ? "Generating..." : "Generate Code"}
//         </button>

//         {code && (
//           <p style={{ marginTop: 15, fontSize: 18 }}>
//             🎁 <b>{code}</b>
//           </p>
//         )}
//       </div>

//       <div
//         style={{
//           marginTop: 40,
//           padding: 20,
//           border: "1px solid #ddd",
//           borderRadius: 12,
//         }}
//       >
//         <h3>Apply Referral Code</h3>

//         <input
//           placeholder="Enter referral code"
//           value={applyCode}
//           onChange={(e) => setApplyCode(e.target.value)}
//           style={{ width: "100%", padding: 10, marginBottom: 10 }}
//         />

//         <button
//           onClick={submitCode}
//           style={{
//             padding: "10px 18px",
//             background: "green",
//             color: "white",
//             border: "none",
//             borderRadius: 20,
//             cursor: "pointer",
//           }}
//         >
//           Apply Code
//         </button>
//       </div>

//       <div style={{ marginTop: 40 }}>
//         <h3>📋 My Referrals</h3>

//         {myReferrals.length === 0 && (
//           <p style={{ color: "#777" }}>No referrals yet</p>
//         )}

//         {myReferrals.map((r) => (
//           <div
//             key={r._id}
//             style={{
//               marginTop: 8,
//               padding: 10,
//               border: "1px solid #eee",
//               borderRadius: 8,
//             }}
//           >
//             <b>{r.code}</b> —{" "}
//             <span style={{ color: r.rewardGiven ? "green" : "orange" }}>
//               {r.rewardGiven ? "Reward Credited ✅" : "Waiting for friend ⏳"}
//             </span>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }