import { useEffect, useState } from "react";
import api from "../api/axios";
import "../styles/education.css";

export default function Education() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    api.get("/courses").then((res) => setCourses(res.data));
  }, []);

  return (
    <div className="education-page">
      <h2 className="education-title">🎓 Academy & Education</h2>

      <div className="education-grid">
        {courses.map((c) => (
          <div key={c._id} className="course-card">
            {c.image && (
              <img
                src={c.image}
                alt={c.title}
                className="course-image"
              />
            )}

            <div className="course-body">
              <h4 className="course-title">{c.title}</h4>

              <p className="course-level">{c.level} Level</p>
              <p className="course-duration">⏱ {c.duration}</p>

              <b className="course-price">₹{c.price}</b>

              <p className="course-desc">{c.description}</p>

              <button className="course-btn">Enroll Now</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}










// import { useEffect, useState } from "react";
// import api from "../api/axios";

// export default function Education() {
//   const [courses, setCourses] = useState([]);

//   useEffect(() => {
//     api.get("/courses").then((res) => setCourses(res.data));
//   }, []);

//   return (
//     <div style={{ padding: 20 }}>
//       <h2>🎓 Academy & Education</h2>

//       <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 15 }}>
//         {courses.map((c) => (
//           <div
//             key={c._id}
//             style={{
//               border: "1px solid #ddd",
//               padding: 12,
//               borderRadius: 8,
//             }}
//           >
//             {c.image && (
//               <img
//                 src={c.image}
//                 alt={c.title}
//                 style={{ width: "100%", height: 160, objectFit: "cover" }}
//               />
//             )}
//             <h4>{c.title}</h4>
//             <p>{c.level} Level</p>
//             <p>⏱ {c.duration}</p>
//             <b>₹{c.price}</b>
//             <p>{c.description}</p>
//             <button>Enroll Now</button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }