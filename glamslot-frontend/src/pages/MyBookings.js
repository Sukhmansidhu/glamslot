import { useEffect, useState } from "react";
import api from "../api/axios";
import "../styles/myBookings.css";
import Footer from "../sections/Footer";
export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [reviewsMap, setReviewsMap] = useState({});
  const [showFormFor, setShowFormFor] = useState(null);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const userId = JSON.parse(localStorage.getItem("user"))?.id;

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await api.get("/bookings/my");
        setBookings(res.data);

        const map = {};

        await Promise.all(
          res.data.map(async (b) => {
            if (!b.staffId?._id) return;

            const r = await api.get(`/reviews/staff/${b.staffId._id}`);

            const myReview = r.data.find(
              (rv) =>
                rv.bookingId === b._id &&
                rv.userId?._id === userId
            );

            if (myReview) map[b._id] = myReview;
          })
        );

        setReviewsMap(map);
      } catch (err) {
        console.log(err);
      }
    };

    loadData();
  }, [userId]);

  const cancelBooking = async (id) => {
    try {
      await api.put(`/bookings/${id}/cancel`);
      alert("Booking cancelled!");
      window.location.reload();
    } catch {
      alert("Failed to cancel booking");
    }
  };

  const saveReview = async (bookingId) => {
    try {
      await api.post("/reviews", {
        bookingId,
        rating,
        comment,
      });
      setShowFormFor(null);
      setRating(5);
      setComment("");
      window.location.reload();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to add review");
    }
  };

  const updateReview = async (reviewId) => {
    await api.patch(`/reviews/${reviewId}`, { rating, comment });
    setShowFormFor(null);
    window.location.reload();
  };

  const deleteReview = async (reviewId) => {
    if (!window.confirm("Delete review?")) return;
    await api.delete(`/reviews/${reviewId}`);
    window.location.reload();
  };

  return (
    <div className="my-bookings">
      <h2 className="my-bookings-title">My Bookings</h2>

      {bookings.length === 0 ? (
        <p className="empty-text">No bookings found</p>
      ) : (
        bookings.map((b) => {
          const review = reviewsMap[b._id];
          const canReview = b.status === "completed";

          return (
            <div key={b._id} className="booking-card">
              <img
                src={b.staffId?.photo || "https://i.pravatar.cc/150"}
                alt="Staff"
                className="staff-avatar"
              />

              <div className="booking-info">
                <h3 className="staff-name">
                  {b.staffId?.name || "Unknown Staff"}
                </h3>

                <p><strong>Service:</strong> {b.serviceId.title}</p>
                <p><strong>Date:</strong> {b.date}</p>
                <p><strong>Time:</strong> {b.startTime} – {b.endTime}</p>

                <p className={`status ${b.status}`}>
                  <strong>Status:</strong> {b.status}
                </p>

                {canReview && (
                  <div className="review-section">
                    {!review && (
                      <button
                        className="btn-secondary"
                        onClick={() => setShowFormFor(b._id)}
                      >
                        Add Review
                      </button>
                    )}

                    {review && (
                      <>
                        <p className="review-text">
                          ⭐ {review.rating} – {review.comment}
                        </p>

                        <button
                          className="btn-secondary"
                          onClick={() => {
                            setShowFormFor(b._id);
                            setRating(review.rating);
                            setComment(review.comment || "");
                          }}
                        >
                          Edit Review
                        </button>

                        <button
                          className="btn-danger-outline"
                          onClick={() => deleteReview(review._id)}
                        >
                          Delete Review
                        </button>
                      </>
                    )}

                    {showFormFor === b._id && (
                      <div className="review-form">
                        <select
                          value={rating}
                          onChange={(e) =>
                            setRating(Number(e.target.value))
                          }
                        >
                          {[1, 2, 3, 4, 5].map((n) => (
                            <option key={n} value={n}>
                              {n} ⭐
                            </option>
                          ))}
                        </select>

                        <textarea
                          rows={2}
                          value={comment}
                          onChange={(e) =>
                            setComment(e.target.value)
                          }
                        />

                        <div className="review-actions">
                          {!review ? (
                            <button
                              className="btn-primary"
                              onClick={() => saveReview(b._id)}
                            >
                              Submit
                            </button>
                          ) : (
                            <button
                              className="btn-primary"
                              onClick={() => updateReview(review._id)}
                            >
                              Update
                            </button>
                          )}

                          <button
                            className="btn-text"
                            onClick={() => setShowFormFor(null)}
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {b.status !== "cancelled" && (
                <button
                  className="btn-cancel"
                  onClick={() => cancelBooking(b._id)}
                >
                  Cancel
                </button>
              )}
            </div>
          );
        })
      )}
      <Footer />
    </div>
  );
}












// import { useEffect, useState } from "react";
// import api from "../api/axios";

// export default function MyBookings() {
//   const [bookings, setBookings] = useState([]);
//   const [reviewsMap, setReviewsMap] = useState({});
//   const [showFormFor, setShowFormFor] = useState(null);
//   const [rating, setRating] = useState(5);
//   const [comment, setComment] = useState("");

//   const userId = JSON.parse(localStorage.getItem("user"))?.id;

//   useEffect(() => {
//     const loadData = async () => {
//       try {
//         const res = await api.get("/bookings/my");
//         setBookings(res.data);

//         const map = {};

//         await Promise.all(
//           res.data.map(async (b) => {
//             if (!b.staffId?._id) return;

//             const r = await api.get(`/reviews/staff/${b.staffId._id}`);

//             const myReview = r.data.find(
//               (rv) =>
//                 rv.bookingId === b._id &&
//                 rv.userId?._id === userId
//             );

//             if (myReview) map[b._id] = myReview;
//           })
//         );

//         setReviewsMap(map);
//       } catch (err) {
//         console.log(err);
//       }
//     };

//     loadData();
//   }, [userId]);

//   const cancelBooking = async (id) => {
//     try {
//       await api.put(`/bookings/${id}/cancel`);
//       alert("Booking cancelled!");
//       window.location.reload();
//     } catch {
//       alert("Failed to cancel booking");
//     }
//   };

//   const saveReview = async (bookingId) => {
//     try {
//       await api.post("/reviews", {
//         bookingId,
//         rating,
//         comment,
//       });
//       setShowFormFor(null);
//       setRating(5);
//       setComment("");
//       window.location.reload();
//     } catch (err) {
//       alert(err.response?.data?.message || "Failed to add review");
//     }
//   };

//   const updateReview = async (reviewId) => {
//     await api.patch(`/reviews/${reviewId}`, { rating, comment });
//     setShowFormFor(null);
//     window.location.reload();
//   };

//   const deleteReview = async (reviewId) => {
//     if (!window.confirm("Delete review?")) return;
//     await api.delete(`/reviews/${reviewId}`);
//     window.location.reload();
//   };

//   return (
//     <div style={{ padding: 20 }}>
//       <h2>My Bookings</h2>

//       {bookings.length === 0 ? (
//         <p>No bookings found</p>
//       ) : (
//         bookings.map((b) => {
//           const review = reviewsMap[b._id];
//           const canReview = b.status === "completed";

//           return (
//             <div
//               key={b._id}
//               style={{
//                 border: "1px solid #ccc",
//                 padding: 15,
//                 marginBottom: 15,
//                 borderRadius: 12,
//                 display: "flex",
//                 gap: 20,
//                 alignItems: "flex-start",
//               }}
//             >
//               <img
//                 src={b.staffId?.photo || "https://i.pravatar.cc/150"}
//                 alt="Staff"
//                 style={{
//                   width: 70,
//                   height: 70,
//                   borderRadius: "50%",
//                 }}
//               />

//               <div style={{ flexGrow: 1 }}>
//                 <h3>{b.staffId?.name || "Unknown Staff"}</h3>

//                 <p><strong>Service:</strong> {b.serviceId.title}</p>
//                 <p><strong>Date:</strong> {b.date}</p>
//                 <p><strong>Time:</strong> {b.startTime} – {b.endTime}</p>
//                 <p>
//                   <strong>Status:</strong>{" "}
//                   <span style={{ textTransform: "capitalize" }}>
//                     {b.status}
//                   </span>
//                 </p>

//                 {canReview && (
//                   <>
//                     {!review && (
//                       <button onClick={() => setShowFormFor(b._id)}>
//                         Add Review
//                       </button>
//                     )}

//                     {review && (
//                       <>
//                         <p>⭐ {review.rating} – {review.comment}</p>
//                         <button
//                           onClick={() => {
//                             setShowFormFor(b._id);
//                             setRating(review.rating);
//                             setComment(review.comment || "");
//                           }}
//                         >
//                           Edit Review
//                         </button>
//                         <button
//                           style={{ color: "red", marginLeft: 6 }}
//                           onClick={() => deleteReview(review._id)}
//                         >
//                           Delete Review
//                         </button>
//                       </>
//                     )}

//                     {showFormFor === b._id && (
//                       <div style={{ marginTop: 10 }}>
//                         <select
//                           value={rating}
//                           onChange={(e) =>
//                             setRating(Number(e.target.value))
//                           }
//                         >
//                           {[1, 2, 3, 4, 5].map((n) => (
//                             <option key={n} value={n}>
//                               {n} ⭐
//                             </option>
//                           ))}
//                         </select>

//                         <textarea
//                           rows={2}
//                           value={comment}
//                           onChange={(e) =>
//                             setComment(e.target.value)
//                           }
//                         />

//                         <div>
//                           {!review ? (
//                             <button onClick={() => saveReview(b._id)}>
//                               Submit
//                             </button>
//                           ) : (
//                             <button onClick={() => updateReview(review._id)}>
//                               Update
//                             </button>
//                           )}
//                           <button onClick={() => setShowFormFor(null)}>
//                             Cancel
//                           </button>
//                         </div>
//                       </div>
//                     )}
//                   </>
//                 )}
//               </div>

//               {b.status !== "cancelled" && (
//                 <button
//                   onClick={() => cancelBooking(b._id)}
//                   style={{
//                     background: "red",
//                     color: "white",
//                     padding: "8px 14px",
//                     borderRadius: 6,
//                     border: "none",
//                   }}
//                 >
//                   Cancel
//                 </button>
//               )}
//             </div>
//           );
//         })
//       )}
//     </div>
//   );
// }