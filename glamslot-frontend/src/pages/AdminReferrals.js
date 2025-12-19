import { useEffect, useState } from "react";
import api from "../api/axios";
import "../styles/adminReferrals.css";

export default function AdminReferrals() {
  const [summary, setSummary] = useState(null);
  const [referrals, setReferrals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadAnalytics = async () => {
    try {
      setLoading(true);
      const res = await api.get("/referrals/admin/analytics");

      setSummary(res.data.summary);
      setReferrals(res.data.referrals);
    } catch (err) {
      setError("Failed to load referral analytics");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAnalytics();
  }, []);

  if (loading) {
    return <p className="referral-loading">Loading referral analytics...</p>;
  }

  if (error) {
    return <p className="referral-error">{error}</p>;
  }

  return (
    <div className="admin-referrals">
      <h1 className="referrals-title">📊 Referral Analytics</h1>

      {summary && (
        <div className="referral-summary">
          <div className="summary-box">
            <h3>Total Referrals</h3>
            <p className="summary-value">{summary.totalReferrals}</p>
          </div>

          <div className="summary-box">
            <h3>Used Referrals</h3>
            <p className="summary-value">{summary.usedReferrals}</p>
          </div>

          <div className="summary-box">
            <h3>Total Rewards Given</h3>
            <p className="summary-value">₹{summary.totalRewards}</p>
          </div>
        </div>
      )}

      <h2 className="referral-list-title">📋 Referral List</h2>

      {referrals.length === 0 && (
        <p className="empty-text">No referrals found</p>
      )}

      {referrals.map((r) => (
        <div key={r._id} className="referral-card">
          <p>
            <b>Code:</b> {r.code}
          </p>

          <p>
            <b>Referrer:</b>{" "}
            {r.referrer?.name} ({r.referrer?.email})
          </p>

          <p>
            <b>Status:</b>{" "}
            <span
              className={`referral-status ${
                r.rewardGiven ? "used" : "unused"
              }`}
            >
              {r.rewardGiven ? "Used ✅" : "Not Used ❌"}
            </span>
          </p>

          {r.friendEmail && (
            <p>
              <b>Used By:</b> {r.friendEmail}
            </p>
          )}

          <p className="referral-date">
            Created: {new Date(r.createdAt).toLocaleString()}
          </p>
        </div>
      ))}
    </div>
  );
}







// import { useEffect, useState } from "react";
// import api from "../api/axios";

// export default function AdminReferrals() {
//   const [summary, setSummary] = useState(null);
//   const [referrals, setReferrals] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   /* ================= LOAD REFERRAL ANALYTICS ================= */
//   const loadAnalytics = async () => {
//     try {
//       setLoading(true);
//       const res = await api.get("/referrals/admin/analytics");

//       setSummary(res.data.summary);
//       setReferrals(res.data.referrals);
//     } catch (err) {
//       setError("Failed to load referral analytics");
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     loadAnalytics();
//   }, []);

//   if (loading) {
//     return <p style={{ padding: 20 }}>Loading referral analytics...</p>;
//   }

//   if (error) {
//     return (
//       <p style={{ padding: 20, color: "red", fontWeight: "bold" }}>
//         {error}
//       </p>
//     );
//   }

//   return (
//     <div style={{ padding: 30 }}>
//       <h1>📊 Referral Analytics</h1>

//       {summary && (
//         <div
//           style={{
//             display: "flex",
//             gap: 20,
//             marginTop: 20,
//             flexWrap: "wrap",
//           }}
//         >
//           <div style={boxStyle}>
//             <h3>Total Referrals</h3>
//             <p style={valueStyle}>{summary.totalReferrals}</p>
//           </div>

//           <div style={boxStyle}>
//             <h3>Used Referrals</h3>
//             <p style={valueStyle}>{summary.usedReferrals}</p>
//           </div>

//           <div style={boxStyle}>
//             <h3>Total Rewards Given</h3>
//             <p style={valueStyle}>₹{summary.totalRewards}</p>
//           </div>
//         </div>
//       )}

//       <h2 style={{ marginTop: 40 }}>📋 Referral List</h2>

//       {referrals.length === 0 && <p>No referrals found</p>}

//       {referrals.map((r) => (
//         <div
//           key={r._id}
//           style={{
//             border: "1px solid #ddd",
//             padding: 15,
//             borderRadius: 8,
//             marginTop: 10,
//           }}
//         >
//           <p>
//             <b>Code:</b> {r.code}
//           </p>

//           <p>
//             <b>Referrer:</b>{" "}
//             {r.referrer?.name} ({r.referrer?.email})
//           </p>

//           <p>
//             <b>Status:</b>{" "}
//             {r.rewardGiven ? "Used ✅" : "Not Used ❌"}
//           </p>

//           {r.friendEmail && (
//             <p>
//               <b>Used By:</b> {r.friendEmail}
//             </p>
//           )}

//           <p style={{ fontSize: 12, color: "#666" }}>
//             Created: {new Date(r.createdAt).toLocaleString()}
//           </p>
//         </div>
//       ))}
//     </div>
//   );
// }

// const boxStyle = {
//   border: "1px solid #ddd",
//   borderRadius: 10,
//   padding: 20,
//   minWidth: 180,
//   background: "#fafafa",
// };

// const valueStyle = {
//   fontSize: 24,
//   fontWeight: "bold",
//   marginTop: 5,
// };