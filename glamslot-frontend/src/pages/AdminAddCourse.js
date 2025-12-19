import { useState } from "react";
import api from "../api/axios";
import "../styles/adminAddCourse.css";

export default function AdminAddCourse() {
  const [form, setForm] = useState({
    title: "",
    level: "Beginner",
    duration: "",
    price: "",
    image: "",
    description: "",
  });

  const submit = async () => {
    await api.post("/courses", form);
    alert("Course added");
    setForm({
      title: "",
      level: "Beginner",
      duration: "",
      price: "",
      image: "",
      description: "",
    });
  };

  return (
    <div className="admin-course-page">
      <h2 className="admin-course-title">🎓 Add Education Course</h2>

      <div className="admin-course-form">
        <input
          className="admin-input"
          placeholder="Course title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />

        <select
          className="admin-input"
          value={form.level}
          onChange={(e) => setForm({ ...form, level: e.target.value })}
        >
          <option>Beginner</option>
          <option>Intermediate</option>
          <option>Advanced</option>
        </select>

        <input
          className="admin-input"
          placeholder="Duration (e.g. 3 Months)"
          value={form.duration}
          onChange={(e) => setForm({ ...form, duration: e.target.value })}
        />

        <input
          className="admin-input"
          placeholder="Price"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
        />

        <input
          className="admin-input"
          placeholder="Image URL"
          value={form.image}
          onChange={(e) => setForm({ ...form, image: e.target.value })}
        />

        <textarea
          className="admin-textarea"
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />

        <button className="admin-btn" onClick={submit}>
          Add Course
        </button>
      </div>
    </div>
  );
}





// import { useState } from "react";
// import api from "../api/axios";

// export default function AdminAddCourse() {
//   const [form, setForm] = useState({
//     title: "",
//     level: "Beginner",
//     duration: "",
//     price: "",
//     image: "",
//     description: "",
//   });

//   const submit = async () => {
//     await api.post("/courses", form);
//     alert("Course added");
//     setForm({
//       title: "",
//       level: "Beginner",
//       duration: "",
//       price: "",
//       image: "",
//       description: "",
//     });
//   };

//   return (
//     <div style={{ padding: 20 }}>
//       <h2>🎓 Add Education Course</h2>

//       <input
//         placeholder="Course title"
//         value={form.title}
//         onChange={(e) => setForm({ ...form, title: e.target.value })}
//       />

//       <select
//         value={form.level}
//         onChange={(e) => setForm({ ...form, level: e.target.value })}
//       >
//         <option>Beginner</option>
//         <option>Intermediate</option>
//         <option>Advanced</option>
//       </select>

//       <input
//         placeholder="Duration (e.g. 3 Months)"
//         value={form.duration}
//         onChange={(e) => setForm({ ...form, duration: e.target.value })}
//       />

//       <input
//         placeholder="Price"
//         value={form.price}
//         onChange={(e) => setForm({ ...form, price: e.target.value })}
//       />

//       <input
//         placeholder="Image URL"
//         value={form.image}
//         onChange={(e) => setForm({ ...form, image: e.target.value })}
//       />

//       <textarea
//         placeholder="Description"
//         value={form.description}
//         onChange={(e) => setForm({ ...form, description: e.target.value })}
//       />

//       <button onClick={submit}>Add Course</button>
//     </div>
//   );
// }