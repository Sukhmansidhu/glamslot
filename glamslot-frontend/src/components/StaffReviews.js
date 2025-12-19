import { useEffect, useState, useCallback } from "react";
import api from "../api/axios";
import "../styles/staffReviews.css";

export default function StaffReviews({ staffId }) {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [editRating, setEditRating] = useState(5);
  const [editComment, setEditComment] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.id;
  const isAdmin = user?.role === "admin";

  const loadReviews = useCallback(async () => {
    if (!staffId) return;

    try {
      setLoading(true);
      const res = await api.get(`/reviews/staff/${staffId}`);
      setReviews(res.data);
    } catch {
      console.log("Failed to load reviews");
    } finally {
      setLoading(false);
    }
  }, [staffId]);

  useEffect(() => {
    loadReviews();
  }, [loadReviews]);

  const startEdit = (r) => {
    setEditingId(r._id);
    setEditRating(r.rating);
    setEditComment(r.comment || "");
  };

  const saveEdit = async (id) => {
    try {
      await api.patch(`/reviews/${id}`, {
        rating: editRating,
        comment: editComment,
      });
      setEditingId(null);
      loadReviews();
    } catch {
      alert("Failed to update review");
    }
  };

  const deleteReview = async (id) => {
    if (!window.confirm("Delete this review?")) return;
    try {
      await api.delete(`/reviews/${id}`);
      loadReviews();
    } catch {
      alert("Failed to delete review");
    }
  };

  if (loading) return <p className="reviews-loading">Loading reviews...</p>;
  if (reviews.length === 0)
    return <p className="reviews-empty">No reviews yet</p>;

  return (
    <div className="reviews-wrapper">
      <h4 className="reviews-title">⭐ Customer Reviews</h4>

      {reviews.map((r) => {
        const isOwner = r.userId?._id === userId;

        return (
          <div key={r._id} className="review-card">
            <strong className="review-user">
              {r.userId?.name || "User"}
            </strong>

            {editingId === r._id ? (
              <div className="review-edit">
                <select
                  value={editRating}
                  onChange={(e) => setEditRating(Number(e.target.value))}
                >
                  {[1, 2, 3, 4, 5].map((n) => (
                    <option key={n} value={n}>
                      {n} ⭐
                    </option>
                  ))}
                </select>

                <textarea
                  rows={2}
                  value={editComment}
                  onChange={(e) => setEditComment(e.target.value)}
                />

                <div className="review-actions">
                  <button
                    className="btn-primary"
                    onClick={() => saveEdit(r._id)}
                  >
                    Save
                  </button>
                  <button
                    className="btn-text"
                    onClick={() => setEditingId(null)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="review-stars">
                  {"⭐".repeat(r.rating)}
                  {"☆".repeat(5 - r.rating)}
                </div>

                {r.comment && (
                  <p className="review-comment">{r.comment}</p>
                )}

                <small className="review-date">
                  {new Date(r.createdAt).toLocaleDateString()}
                </small>

                {(isOwner || isAdmin) && (
                  <div className="review-controls">
                    {isOwner && (
                      <button
                        className="btn-secondary"
                        onClick={() => startEdit(r)}
                      >
                        Edit
                      </button>
                    )}

                    <button
                      className="btn-danger-outline"
                      onClick={() => deleteReview(r._id)}
                    >
                      Delete
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        );
      })}
    </div>
  );
}



// import { useEffect, useState, useCallback } from "react";
// import api from "../api/axios";

// export default function StaffReviews({ staffId }) {
//   const [reviews, setReviews] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [editingId, setEditingId] = useState(null);
//   const [editRating, setEditRating] = useState(5);
//   const [editComment, setEditComment] = useState("");

//   // ✅ logged-in user
//   const user = JSON.parse(localStorage.getItem("user"));
//   const userId = user?.id;
//   const isAdmin = user?.role === "admin";

//   /* ================= LOAD REVIEWS ================= */
//   const loadReviews = useCallback(async () => {
//     if (!staffId) return;

//     try {
//       setLoading(true);
//       const res = await api.get(`/reviews/staff/${staffId}`);
//       setReviews(res.data);
//     } catch (err) {
//       console.log("Failed to load reviews");
//     } finally {
//       setLoading(false);
//     }
//   }, [staffId]);

//   useEffect(() => {
//     loadReviews();
//   }, [loadReviews]);

//   /* ================= EDIT ================= */
//   const startEdit = (r) => {
//     setEditingId(r._id);
//     setEditRating(r.rating);
//     setEditComment(r.comment || "");
//   };

//   const saveEdit = async (id) => {
//     try {
//       await api.patch(`/reviews/${id}`, {
//         rating: editRating,
//         comment: editComment,
//       });
//       setEditingId(null);
//       loadReviews();
//     } catch {
//       alert("Failed to update review");
//     }
//   };

//   /* ================= DELETE ================= */
//   const deleteReview = async (id) => {
//     if (!window.confirm("Delete this review?")) return;
//     try {
//       await api.delete(`/reviews/${id}`);
//       loadReviews();
//     } catch {
//       alert("Failed to delete review");
//     }
//   };

//   if (loading) return <p>Loading reviews...</p>;

//   if (reviews.length === 0)
//     return <p style={{ color: "gray" }}>No reviews yet</p>;

//   return (
//     <div style={{ marginTop: 25 }}>
//       <h4>⭐ Customer Reviews</h4>

//       {reviews.map((r) => {
//         const isOwner = r.userId?._id === userId;

//         return (
//           <div
//             key={r._id}
//             style={{
//               border: "1px solid #eee",
//               padding: 12,
//               marginBottom: 12,
//               borderRadius: 8,
//               background: "#fafafa",
//             }}
//           >
//             <strong>{r.userId?.name || "User"}</strong>

//             {editingId === r._id ? (
//               <>
//                 <div>
//                   <select
//                     value={editRating}
//                     onChange={(e) =>
//                       setEditRating(Number(e.target.value))
//                     }
//                   >
//                     {[1, 2, 3, 4, 5].map((n) => (
//                       <option key={n} value={n}>
//                         {n} ⭐
//                       </option>
//                     ))}
//                   </select>
//                 </div>

//                 <textarea
//                   rows={2}
//                   value={editComment}
//                   onChange={(e) => setEditComment(e.target.value)}
//                 />

//                 <button onClick={() => saveEdit(r._id)}>Save</button>
//                 <button onClick={() => setEditingId(null)}>Cancel</button>
//               </>
//             ) : (
//               <>
//                 <div style={{ fontSize: 14 }}>
//                   {"⭐".repeat(r.rating)}
//                   {"☆".repeat(5 - r.rating)}
//                 </div>

//                 {r.comment && <p>{r.comment}</p>}

//                 <small style={{ color: "#777" }}>
//                   {new Date(r.createdAt).toLocaleDateString()}
//                 </small>

//                 {/* ✅ OWNER OR ADMIN CONTROLS */}
//                 {(isOwner || isAdmin) && (
//                   <div style={{ marginTop: 6 }}>
//                     {isOwner && (
//                       <button onClick={() => startEdit(r)}>
//                         Edit
//                       </button>
//                     )}

//                     <button
//                       style={{ color: "red", marginLeft: 6 }}
//                       onClick={() => deleteReview(r._id)}
//                     >
//                       Delete
//                     </button>
//                   </div>
//                 )}
//               </>
//             )}
//           </div>
//         );
//       })}
//     </div>
//   );
// }