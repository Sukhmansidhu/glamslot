import Footer from "../sections/Footer";
import "../styles/followUs.css";

export default function FollowUs() {
  const posts = [
    "https://images.unsplash.com/photo-1519744792095-2f2205e87b6f",
    "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb",
    "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e",
    "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9",
    "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91",
    "https://images.unsplash.com/photo-1519415943484-9fa1873496d4",
    "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2",
    "https://images.unsplash.com/photo-1517841905240-472988babdf9",
    "https://images.unsplash.com/photo-1500917293891-ef795e70e1f6",
    "https://images.unsplash.com/photo-1487412912498-0447578fcca8",
    "https://images.unsplash.com/photo-1520975916090-3105956dac38",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
  ];

  return (
    <div className="follow-page">
      <section className="follow-hero">
        <h1>📸 Follow Us</h1>
        <p>
          Step inside our world of beauty, creativity and transformation.
          Discover real stories, real clients and real confidence.
        </p>
      </section>

      <section className="follow-why">
        <h2>Why Follow Us?</h2>
        <ul>
          <li>✨ Daily hair & beauty inspiration</li>
          <li>🎨 Latest trends curated by professionals</li>
          <li>💇‍♀️ Real client transformations</li>
          <li>🎥 Behind-the-scenes salon moments</li>
          <li>🎓 Expert tips from top stylists</li>
          <li>🌍 Global fashion meets local artistry</li>
        </ul>

        <p className="follow-text">
          Our social platforms are more than just photos — they’re a community
          of confidence, self-expression and creativity.
        </p>
      </section>

      <section className="follow-gallery">
        <h2>Trending Styles</h2>
        <p className="section-desc">
          From runway-inspired looks to everyday elegance, explore what’s
          trending inside our salons.
        </p>

        <div className="gallery-grid">
          {posts.map((img, i) => (
            <img key={i} src={img} alt="Style" />
          ))}
        </div>
      </section>

      <section className="follow-connect">
        <h2>Connect With Us</h2>
        <p>
          Join our growing community across social platforms and never miss a
          trend.
        </p>

        <div className="social-links">
          <a href="https://www.instagram.com" target="_blank" rel="noreferrer">
            Instagram
          </a>
          <a href="https://www.facebook.com" target="_blank" rel="noreferrer">
            Facebook
          </a>
          <a href="https://www.youtube.com" target="_blank" rel="noreferrer">
            YouTube
          </a>
          <a href="https://www.pinterest.com" target="_blank" rel="noreferrer">
            Pinterest
          </a>
        </div>
      </section>

      <section className="follow-story">
        <h2>Our Creative Journey</h2>
        <p>
          Our brand is built on creativity, confidence and craftsmanship.
          Every style you see is a result of passion, training and innovation.
        </p>
        <p>
          We believe beauty is personal — and every transformation tells a
          story worth sharing.
        </p>
      </section>

      <section className="follow-cta">
        <h2>Be Part of the Style Movement</h2>
        <p>
          Follow us, tag us & get featured. Your style deserves the spotlight.
        </p>

        <a
          href="https://www.instagram.com"
          target="_blank"
          rel="noreferrer"
          className="cta-btn"
        >
          Follow @GlamSlot
        </a>
      </section>

      <Footer />
    </div>
  );
}






// export default function FollowUs() {
//   const posts = [
//     "https://images.unsplash.com/photo-1519744792095-2f2205e87b6f",
//     "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb",
//     "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e",
//     "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9",
//     "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91",
//     "https://images.unsplash.com/photo-1519415943484-9fa1873496d4",
//     "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2",
//     "https://images.unsplash.com/photo-1517841905240-472988babdf9",
//     "https://images.unsplash.com/photo-1500917293891-ef795e70e1f6",
//     "https://images.unsplash.com/photo-1487412912498-0447578fcca8",
//     "https://images.unsplash.com/photo-1520975916090-3105956dac38",
//     "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
//   ];

//   return (
//     <div style={{ padding: "40px 20px", maxWidth: 1200, margin: "auto" }}>
//       <section style={{ marginBottom: 50 }}>
//         <h1 style={{ fontSize: 36 }}>📸 Follow Us</h1>
//         <p style={{ fontSize: 18, color: "#555", maxWidth: 700 }}>
//           Discover the latest styles, transformations, backstage moments and
//           creative inspiration from our artists across all our salons.
//         </p>
//       </section>

//       <section style={{ marginBottom: 60 }}>
//         <h2>Why Follow Us?</h2>
//         <ul style={{ fontSize: 16, lineHeight: "28px", color: "#444" }}>
//           <li>✨ Daily hair & beauty inspiration</li>
//           <li>🎨 Latest trends curated by professionals</li>
//           <li>💇‍♀️ Real client transformations</li>
//           <li>🎥 Behind-the-scenes salon moments</li>
//           <li>🎓 Tips from expert stylists</li>
//         </ul>
//       </section>

//       <section style={{ marginBottom: 60 }}>
//         <h2 style={{ marginBottom: 20 }}>Trending Styles</h2>

//         <div
//           style={{
//             display: "grid",
//             gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
//             gap: 20,
//           }}
//         >
//           {posts.map((img, i) => (
//             <img
//               key={i}
//               src={img}
//               alt="Style"
//               style={{
//                 width: "100%",
//                 height: 260,
//                 objectFit: "cover",
//                 borderRadius: 12,
//                 boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
//               }}
//             />
//           ))}
//         </div>
//       </section>

//       <section style={{ marginBottom: 60 }}>
//         <h2>Connect With Us</h2>
//         <p style={{ color: "#555", marginBottom: 15 }}>
//           Join our community on social media and never miss a trend.
//         </p>

//         <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
//           <a
//             href="https://www.instagram.com"
//             target="_blank"
//             rel="noreferrer"
//             style={btnStyle}
//           >
//             Instagram
//           </a>

//           <a
//             href="https://www.facebook.com"
//             target="_blank"
//             rel="noreferrer"
//             style={btnStyle}
//           >
//             Facebook
//           </a>

//           <a
//             href="https://www.youtube.com"
//             target="_blank"
//             rel="noreferrer"
//             style={btnStyle}
//           >
//             YouTube
//           </a>

//           <a
//             href="https://www.pinterest.com"
//             target="_blank"
//             rel="noreferrer"
//             style={btnStyle}
//           >
//             Pinterest
//           </a>
//         </div>
//       </section>

//       <section style={{ marginBottom: 60 }}>
//         <h2>Our Creative Journey</h2>
//         <p style={{ fontSize: 16, color: "#444", lineHeight: "28px" }}>
//           Our brand is built on creativity, confidence and craftsmanship.
//           Every style you see is a result of passion, training and innovation.
//         </p>
//         <p style={{ fontSize: 16, color: "#444", lineHeight: "28px" }}>
//           From runway-inspired looks to everyday elegance, our stylists bring
//           global fashion into real life.
//         </p>
//       </section>

//       <section
//         style={{
//           background: "#f8f8f8",
//           padding: 40,
//           borderRadius: 12,
//           textAlign: "center",
//         }}
//       >
//         <h2>Be Part of the Style Movement</h2>
//         <p style={{ color: "#555", marginBottom: 20 }}>
//           Follow us, tag us & get featured on our page.
//         </p>

//         <a
//           href="https://www.instagram.com"
//           target="_blank"
//           rel="noreferrer"
//           style={{
//             display: "inline-block",
//             padding: "12px 30px",
//             fontSize: 16,
//             borderRadius: 30,
//             background: "black",
//             color: "white",
//             textDecoration: "none",
//           }}
//         >
//           Follow @YourSalon
//         </a>
//       </section>
//     </div>
//   );
// }

// const btnStyle = {
//   padding: "10px 18px",
//   border: "1px solid black",
//   borderRadius: 30,
//   textDecoration: "none",
//   color: "black",
//   fontWeight: 500,
// };