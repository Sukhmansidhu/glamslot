import { useEffect, useState } from "react";
import api from "../api/axios";
import "../styles/adminAddStaff.css";

export default function AdminAddStaff() {
  const [services, setServices] = useState([]);
  const [photo, setPhoto] = useState(null);

  const [form, setForm] = useState({
    restaurantName: "",
    name: "",
    phone: "",
    fees: "",
    skills: "",
    description: "",
    services: [],
    isAvailable: true,
    isOnLeave: false,
  });

  useEffect(() => {
    api.get("/services").then((res) => setServices(res.data));
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === "isOnLeave" && checked) {
      setForm({ ...form, isOnLeave: true, isAvailable: false });
    } else if (name === "isAvailable" && checked) {
      setForm({ ...form, isAvailable: true, isOnLeave: false });
    } else {
      setForm({ ...form, [name]: type === "checkbox" ? checked : value });
    }
  };

  const toggleService = (id) => {
    setForm((prev) => ({
      ...prev,
      services: prev.services.includes(id)
        ? prev.services.filter((s) => s !== id)
        : [...prev.services, id],
    }));
  };

  const submitStaff = async () => {
    try {
      const fd = new FormData();

      Object.keys(form).forEach((key) => {
        if (key === "services") {
          form.services.forEach((s) => fd.append("services", s));
        } else if (key === "fees") {
          fd.append(key, Number(form[key]));
        } else {
          fd.append(key, form[key]);
        }
      });

      if (photo) fd.append("photo", photo);

      await api.post("/staff", fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("✅ Staff added successfully");

      setForm({
        restaurantName: "",
        name: "",
        phone: "",
        fees: "",
        skills: "",
        description: "",
        services: [],
        isAvailable: true,
        isOnLeave: false,
      });
      setPhoto(null);
    } catch (err) {
      alert(err.response?.data?.message || "❌ Failed to add staff");
    }
  };

  return (
    <div className="admin-staff">
      <h2 className="admin-title">Add Staff</h2>

      <div className="staff-form">
        <input
          placeholder="Restaurant Name"
          name="restaurantName"
          value={form.restaurantName}
          onChange={handleChange}
        />

        <input
          placeholder="Staff Name"
          name="name"
          value={form.name}
          onChange={handleChange}
        />

        <input
          placeholder="Phone"
          name="phone"
          value={form.phone}
          onChange={handleChange}
        />

        <input
          placeholder="Fees"
          name="fees"
          type="number"
          value={form.fees}
          onChange={handleChange}
        />

        <input
          placeholder="Skills (comma separated)"
          name="skills"
          value={form.skills}
          onChange={handleChange}
        />

        <textarea
          placeholder="Description"
          name="description"
          value={form.description}
          onChange={handleChange}
        />

        <h4 className="section-title">Services Provided</h4>

        <div className="services-list">
          {services.map((s) => (
            <label key={s._id} className="service-checkbox">
              <input
                type="checkbox"
                checked={form.services.includes(s._id)}
                onChange={() => toggleService(s._id)}
              />
              {s.title}
            </label>
          ))}
        </div>

        <input
          type="file"
          className="file-input"
          onChange={(e) => setPhoto(e.target.files[0])}
        />

        <div className="status-row">
          <label>
            <input
              type="checkbox"
              name="isAvailable"
              checked={form.isAvailable}
              onChange={handleChange}
            />
            Available
          </label>

          <label>
            <input
              type="checkbox"
              name="isOnLeave"
              checked={form.isOnLeave}
              onChange={handleChange}
            />
            On Leave
          </label>
        </div>

        <button className="btn-primary" onClick={submitStaff}>
          Save Staff
        </button>
      </div>
    </div>
  );
}

















// import { useEffect, useState } from "react";
// import api from "../api/axios";

// export default function AdminAddStaff() {
//   const [services, setServices] = useState([]);
//   const [photo, setPhoto] = useState(null);

//   const [form, setForm] = useState({
//     restaurantName: "",
//     name: "",
//     phone: "",
//     fees: "",
//     skills: "",
//     description: "",
//     services: [],
//     isAvailable: true,
//     isOnLeave: false,
//   });

//   useEffect(() => {
//     api.get("/services").then((res) => setServices(res.data));
//   }, []);

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;

//     if (name === "isOnLeave" && checked) {
//       setForm({ ...form, isOnLeave: true, isAvailable: false });
//     } else if (name === "isAvailable" && checked) {
//       setForm({ ...form, isAvailable: true, isOnLeave: false });
//     } else {
//       setForm({ ...form, [name]: type === "checkbox" ? checked : value });
//     }
//   };

//   const toggleService = (id) => {
//     setForm((prev) => ({
//       ...prev,
//       services: prev.services.includes(id)
//         ? prev.services.filter((s) => s !== id)
//         : [...prev.services, id],
//     }));
//   };

//   const submitStaff = async () => {
//     try {
//       const fd = new FormData();

//       Object.keys(form).forEach((key) => {
//         if (key === "services") {
//           form.services.forEach((s) => fd.append("services", s));
//         } else if (key === "fees") {
//           fd.append(key, Number(form[key]));
//         } else {
//           fd.append(key, form[key]);
//         }
//       });

//       if (photo) fd.append("photo", photo);

//       await api.post("/staff", fd, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       alert("✅ Staff added successfully");

//       setForm({
//         restaurantName: "",
//         name: "",
//         phone: "",
//         fees: "",
//         skills: "",
//         description: "",
//         services: [],
//         isAvailable: true,
//         isOnLeave: false,
//       });
//       setPhoto(null);
//     } catch (err) {
//       alert(err.response?.data?.message || "❌ Failed to add staff");
//     }
//   };

//   return (
//     <div style={{ padding: 20, maxWidth: 500 }}>
//       <h2>Add Staff</h2>

//       <input
//         placeholder="Restaurant Name"
//         name="restaurantName"
//         value={form.restaurantName}
//         onChange={handleChange}
//       />

//       <input
//         placeholder="Staff Name"
//         name="name"
//         value={form.name}
//         onChange={handleChange}
//       />

//       <input
//         placeholder="Phone"
//         name="phone"
//         value={form.phone}
//         onChange={handleChange}
//       />

//       <input
//         placeholder="Fees"
//         name="fees"
//         type="number"
//         value={form.fees}
//         onChange={handleChange}
//       />

//       <input
//         placeholder="Skills (comma separated)"
//         name="skills"
//         value={form.skills}
//         onChange={handleChange}
//       />

//       <textarea
//         placeholder="Description"
//         name="description"
//         value={form.description}
//         onChange={handleChange}
//       />

//       <h4>Services Provided</h4>
//       {services.length === 0 && <p>No services added yet</p>}

//       {services.map((s) => (
//         <label key={s._id} style={{ display: "block" }}>
//           <input
//             type="checkbox"
//             checked={form.services.includes(s._id)}
//             onChange={() => toggleService(s._id)}
//           />{" "}
//           {s.title}
//         </label>
//       ))}

//       <input type="file" onChange={(e) => setPhoto(e.target.files[0])} />

//       <label>
//         <input
//           type="checkbox"
//           name="isAvailable"
//           checked={form.isAvailable}
//           onChange={handleChange}
//         />
//         Available
//       </label>

//       <label>
//         <input
//           type="checkbox"
//           name="isOnLeave"
//           checked={form.isOnLeave}
//           onChange={handleChange}
//         />
//         On Leave
//       </label>

//       <br />
//       <button onClick={submitStaff}>Save Staff</button>
//     </div>
//   );
// }