import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";
import SlotPicker from "../components/SlotPicker";
import StaffReviews from "../components/StaffReviews";
import "../styles/bookingPage.css";
const toMinutes = (t) => {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
};

export default function BookingPage() {
  const { id } = useParams();

  const [service, setService] = useState(null);
  const [staffList, setStaffList] = useState([]);
  const [staffRatings, setStaffRatings] = useState({});
  const [staffId, setStaffId] = useState("");
  const [date, setDate] = useState("");
  const [message, setMessage] = useState("");
  const [isHoliday, setIsHoliday] = useState(false);
  const [loadingStaff, setLoadingStaff] = useState(true);

  const [giftCode, setGiftCode] = useState("");
  const [discount, setDiscount] = useState(0);

  const [wallet, setWallet] = useState(0);
  const [useWallet, setUseWallet] = useState(false);

  useEffect(() => {
    api.get("/users/wallet").then((res) => {
      setWallet(res.data.balance);
    });
  }, []);

  useEffect(() => {
    api.get(`/services/${id}`).then((res) => {
      setService(res.data);
    });
  }, [id]);

  useEffect(() => {
    const loadStaff = async () => {
      try {
        setLoadingStaff(true);
        const res = await api.get("/staff");

        const filtered = res.data.filter((s) =>
          s.services?.some((svc) => svc._id === id)
        );

        setStaffList(filtered);

        const ratings = {};
        await Promise.all(
          filtered.map(async (s) => {
            try {
              const r = await api.get(`/reviews/staff/${s._id}/summary`);
              ratings[s._id] = r.data;
            } catch {
              ratings[s._id] = { averageRating: 0, totalReviews: 0 };
            }
          })
        );

        setStaffRatings(ratings);
      } catch (err) {
        console.log("Failed to load staff", err);
      } finally {
        setLoadingStaff(false);
      }
    };

    loadStaff();
  }, [id]);

  useEffect(() => {
    if (!date) return;

    const checkHoliday = async () => {
      try {
        const res = await api.get("/holidays");
        const found = res.data.some((h) => h.date === date);
        setIsHoliday(found);
        setMessage(found ? "🚫 Restaurant is closed on this date" : "");
      } catch {
        console.log("Holiday check failed");
      }
    };

    checkHoliday();
  }, [date]);

  const getPriceForTime = (startTime) => {
    if (!service?.peakPricing?.enabled) return service.price;

    const start = toMinutes(startTime);
    const peakStart = toMinutes(service.peakPricing.startTime);
    const peakEnd = toMinutes(service.peakPricing.endTime);

    if (start >= peakStart && start < peakEnd) {
      return Math.round(service.price * service.peakPricing.multiplier);
    }
    return service.price;
  };

  const redeemGiftCard = async () => {
    if (!giftCode) {
      alert("Enter gift card code");
      return;
    }

    try {
      const res = await api.post("/giftcards/redeem", { code: giftCode });
      setDiscount(res.data.amount);
      alert("🎉 Gift card applied successfully");
    } catch (err) {
      alert(err.response?.data?.message || "Invalid gift card");
    }
  };

  const makeBooking = async (startTime) => {
    try {
      const originalPrice = getPriceForTime(startTime);
      const afterGift = Math.max(originalPrice - discount, 0);
      const walletUsed = useWallet ? Math.min(wallet, afterGift) : 0;
      const finalPrice = afterGift - walletUsed;

      await api.post("/bookings", {
        serviceId: id,
        staffId,
        date,
        startTime,
        finalPrice,
        giftCode: discount > 0 ? giftCode : null,
        walletUsed,
      });

      setMessage(
        `🎉 Booking Successful!
Gift: ₹${discount}
Wallet Used: ₹${walletUsed}
Paid: ₹${finalPrice}`
      );

      setDiscount(0);
      setGiftCode("");
      setUseWallet(false);
      window.dispatchEvent(new Event("wallet-updated"));
    } catch (err) {
      setMessage("❌ Booking failed: " + err.response?.data?.message);
    }
  };

 return (
  <div className="booking-page">

    <h1 className="page-title">✨ Book Now</h1>

    {service && (
      <div className="service-info">
        <h2>{service.title}</h2>
        <p>{service.description}</p>
        <p className="service-meta">
          ⏱ {service.durationMinutes} mins · 💰 ₹{service.price}
        </p>
      </div>
    )}

    <section className="booking-step">
      <h3 className="step-title">1️⃣ Choose Your Stylist</h3>
      {loadingStaff && <p>Loading staff...</p>}

      <div className="staff-grid">
        {staffList.map((s) => {
          const disabled = !s.isAvailable || s.isOnLeave;
          const active = staffId === s._id;
          const rating = staffRatings[s._id];

          return (
            <div
              key={s._id}
              className={`staff-card ${active ? "active" : ""} ${
                disabled ? "disabled" : ""
              }`}
              onClick={() => !disabled && setStaffId(s._id)}
            >
              <strong>{s.name}</strong>
              <p>₹{s.fees}</p>
              <p className="staff-rating">
                ⭐ {rating?.averageRating || 0} (
                {rating?.totalReviews || 0})
              </p>
            </div>
          );
        })}
      </div>
    </section>

    <section className="booking-step">
      <h3 className="step-title">2️⃣ Select Appointment Date</h3>

      <div className="date-picker">
        <input
          type="date"
          value={date}
          onChange={(e) => {
            setDate(e.target.value);
            setStaffId("");
          }}
        />
      </div>
    </section>

    <section className="booking-step">
      <h3 className="step-title">3️⃣ Offers & Wallet</h3>

      <div className="gift-section">
        <h4>🎁 Apply Gift Card</h4>

        <input
          placeholder="Enter Gift Card Code"
          value={giftCode}
          onChange={(e) => setGiftCode(e.target.value)}
        />

        <button onClick={redeemGiftCard}>Apply Gift Card</button>

        {discount > 0 && (
          <p className="discount-text">
            Gift Discount: ₹{discount}
          </p>
        )}
      </div>

      <div className="wallet-section">
        <label>
          <input
            type="checkbox"
            checked={useWallet}
            onChange={(e) => setUseWallet(e.target.checked)}
          />{" "}
          Use Wallet (₹{wallet})
        </label>
      </div>
    </section>

    {!isHoliday && staffId && date && (
      <section className="booking-step">
        <h3 className="step-title">4️⃣ Choose Time Slot</h3>

        <SlotPicker
          serviceId={id}
          staffId={staffId}
          date={date}
          onBook={(startTime) => makeBooking(startTime)}
        />
      </section>
    )}

    {staffId && (
      <section className="booking-step">
        <h3 className="step-title">⭐ What Customers Say</h3>
        <StaffReviews staffId={staffId} />
      </section>
    )}

    {message && (
      <div className="booking-message">{message}</div>
    )}

  </div>
);
}

















// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import api from "../api/axios";
// import SlotPicker from "../components/SlotPicker";
// import StaffReviews from "../components/StaffReviews";

// const toMinutes = (t) => {
//   const [h, m] = t.split(":").map(Number);
//   return h * 60 + m;
// };

// export default function BookingPage() {
//   const { id } = useParams(); 

//   const [service, setService] = useState(null);
//   const [staffList, setStaffList] = useState([]);
//   const [staffRatings, setStaffRatings] = useState({});
//   const [staffId, setStaffId] = useState("");
//   const [date, setDate] = useState("");
//   const [message, setMessage] = useState("");
//   const [isHoliday, setIsHoliday] = useState(false);
//   const [loadingStaff, setLoadingStaff] = useState(true);

//   const [giftCode, setGiftCode] = useState("");
//   const [discount, setDiscount] = useState(0);

//   const [wallet, setWallet] = useState(0);
//   const [useWallet, setUseWallet] = useState(false);

//   useEffect(() => {
//     api.get("/users/wallet").then((res) => {
//       setWallet(res.data.balance);
//     });
//   }, []);

//   useEffect(() => {
//     api.get(`/services/${id}`).then((res) => {
//       setService(res.data);
//     });
//   }, [id]);

//   useEffect(() => {
//     const loadStaff = async () => {
//       try {
//         setLoadingStaff(true);
//         const res = await api.get("/staff");

//         const filtered = res.data.filter((s) =>
//           s.services?.some((svc) => svc._id === id)
//         );

//         setStaffList(filtered);

//         const ratings = {};
//         await Promise.all(
//           filtered.map(async (s) => {
//             try {
//               const r = await api.get(`/reviews/staff/${s._id}/summary`);
//               ratings[s._id] = r.data;
//             } catch {
//               ratings[s._id] = { averageRating: 0, totalReviews: 0 };
//             }
//           })
//         );

//         setStaffRatings(ratings);
//       } catch (err) {
//         console.log("Failed to load staff", err);
//       } finally {
//         setLoadingStaff(false);
//       }
//     };

//     loadStaff();
//   }, [id]);

//   useEffect(() => {
//     if (!date) return;

//     const checkHoliday = async () => {
//       try {
//         const res = await api.get("/holidays");
//         const found = res.data.some((h) => h.date === date);
//         setIsHoliday(found);
//         setMessage(found ? "🚫 Restaurant is closed on this date" : "");
//       } catch {
//         console.log("Holiday check failed");
//       }
//     };

//     checkHoliday();
//   }, [date]);

//   const getPriceForTime = (startTime) => {
//     if (!service?.peakPricing?.enabled) return service.price;

//     const start = toMinutes(startTime);
//     const peakStart = toMinutes(service.peakPricing.startTime);
//     const peakEnd = toMinutes(service.peakPricing.endTime);

//     if (start >= peakStart && start < peakEnd) {
//       return Math.round(service.price * service.peakPricing.multiplier);
//     }
//     return service.price;
//   };

//   const redeemGiftCard = async () => {
//     if (!giftCode) {
//       alert("Enter gift card code");
//       return;
//     }

//     try {
//       const res = await api.post("/giftcards/redeem", { code: giftCode });
//       setDiscount(res.data.amount);
//       alert("🎉 Gift card applied successfully");
//     } catch (err) {
//       alert(err.response?.data?.message || "Invalid gift card");
//     }
//   };

//   const makeBooking = async (startTime) => {
//     try {
//       const originalPrice = getPriceForTime(startTime);

//       const afterGift = Math.max(originalPrice - discount, 0);
//       const walletUsed = useWallet
//         ? Math.min(wallet, afterGift)
//         : 0;

//       const finalPrice = afterGift - walletUsed;

//       await api.post("/bookings", {
//         serviceId: id,
//         staffId,
//         date,
//         startTime,
//         finalPrice,
//         giftCode: discount > 0 ? giftCode : null,
//         walletUsed, 
//       });

//       setMessage(
//         `🎉 Booking Successful!
// Gift: ₹${discount}
// Wallet Used: ₹${walletUsed}
// Paid: ₹${finalPrice}`
//       );

//       setDiscount(0);
//       setGiftCode("");
//       setUseWallet(false);
//       window.dispatchEvent(new Event("wallet-updated"));
//     } catch (err) {
//       setMessage("❌ Booking failed: " + err.response?.data?.message);
//     }
//   };

//   return (
//     <div style={{ padding: 20, maxWidth: 900, margin: "0 auto" }}>
//       {service && (
//         <div style={{ marginBottom: 20 }}>
//           <h2>{service.title}</h2>
//           <p>{service.description}</p>
//           <p>
//             ⏱ {service.durationMinutes} mins · 💰 ₹{service.price}
//           </p>
//         </div>
//       )}

//       <h3>Select Staff</h3>
//       {loadingStaff && <p>Loading staff...</p>}

//       <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
//         {staffList.map((s) => {
//           const disabled = !s.isAvailable || s.isOnLeave;
//           const active = staffId === s._id;
//           const rating = staffRatings[s._id];

//           return (
//             <div
//               key={s._id}
//               onClick={() => !disabled && setStaffId(s._id)}
//               style={{
//                 width: 190,
//                 padding: 12,
//                 cursor: disabled ? "not-allowed" : "pointer",
//                 borderRadius: 12,
//                 border: active ? "2px solid #007bff" : "1px solid #ddd",
//                 opacity: disabled ? 0.6 : 1,
//               }}
//             >
//               <strong>{s.name}</strong>
//               <p>₹{s.fees}</p>
//               <p style={{ fontSize: 13 }}>
//                 ⭐ {rating?.averageRating || 0} ({rating?.totalReviews || 0})
//               </p>
//             </div>
//           );
//         })}
//       </div>

//       <div style={{ marginTop: 30 }}>
//         <h3>Select Date</h3>
//         <input
//           type="date"
//           value={date}
//           onChange={(e) => {
//             setDate(e.target.value);
//             setStaffId("");
//           }}
//         />
//       </div>

//       <div style={{ marginTop: 20 }}>
//         <h4>🎁 Have a Gift Card?</h4>

//         <input
//           placeholder="Enter Gift Card Code"
//           value={giftCode}
//           onChange={(e) => setGiftCode(e.target.value)}
//           style={{ padding: 8, width: "100%", marginBottom: 10 }}
//         />

//         <button onClick={redeemGiftCard}>Apply Gift Card</button>

//         {discount > 0 && (
//           <p style={{ color: "green" }}>
//             Gift Discount: ₹{discount}
//           </p>
//         )}
//       </div>

//       <div style={{ marginTop: 20 }}>
//         <label>
//           <input
//             type="checkbox"
//             checked={useWallet}
//             onChange={(e) => setUseWallet(e.target.checked)}
//           />{" "}
//           Use Wallet (₹{wallet})
//         </label>
//       </div>

//       {!isHoliday && staffId && date && (
//         <SlotPicker
//           serviceId={id}
//           staffId={staffId}
//           date={date}
//           onBook={(startTime) => makeBooking(startTime)}
//         />
//       )}

//       {staffId && <StaffReviews staffId={staffId} />}
//       {message && (
//         <div style={{ marginTop: 20, fontWeight: "bold" }}>
//           {message}
//         </div>
//       )}
//     </div>
//   );
// }