import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";
import "../styles/editStaff.css";

export default function EditStaff() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [services, setServices] = useState([]);
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(true);
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
    const loadData = async () => {
      try {
        const staffRes = await api.get(`/staff/${id}`);
        const s = staffRes.data;

        setForm({
          restaurantName: s.restaurantName || "",
          name: s.name || "",
          phone: s.phone || "",
          fees: s.fees || "",
          skills: s.skills?.join(",") || "",
          description: s.description || "",
          services: s.services?.map((x) => x._id) || [],
          isAvailable: s.isAvailable,
          isOnLeave: s.isOnLeave,
        });

        const servicesRes = await api.get("/services");
        setServices(servicesRes.data);

        setLoading(false);
      } catch (err) {
        alert("Failed to load staff details");
        navigate("/admin/staff");
      }
    };

    loadData();
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === "isOnLeave" && checked) {
      setForm({ ...form, isOnLeave: true, isAvailable: false });
    } else if (name === "isAvailable" && checked) {
      setForm({ ...form, isAvailable: true, isOnLeave: false });
    } else {
      setForm({
        ...form,
        [name]: type === "checkbox" ? checked : value,
      });
    }
  };

  const toggleService = (sid) => {
    setForm((prev) => ({
      ...prev,
      services: prev.services.includes(sid)
        ? prev.services.filter((s) => s !== sid)
        : [...prev.services, sid],
    }));
  };

  const updateStaff = async () => {
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

      await api.put(`/staff/${id}`, fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("✅ Staff updated successfully");
      navigate("/admin/staff");
    } catch (err) {
      alert(err.response?.data?.message || "❌ Failed to update staff");
    }
  };

  if (loading) return <p className="editstaff-loading">Loading...</p>;

  return (
    <div className="editstaff-page">
      <h2 className="editstaff-title">Edit Staff</h2>

      <div className="editstaff-form">
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
          type="number"
          name="fees"
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

        <h4 className="editstaff-subtitle">Services Provided</h4>

        <div className="editstaff-services">
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
          className="editstaff-file"
          onChange={(e) => setPhoto(e.target.files[0])}
        />

        <div className="editstaff-status">
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

        <div className="editstaff-actions">
          <button className="btn-primary" onClick={updateStaff}>
            Update Staff
          </button>

          <button
            className="btn-secondary"
            onClick={() => navigate("/admin/staff")}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}










// import { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import api from "../api/axios";

// export default function EditStaff() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [services, setServices] = useState([]);
//   const [photo, setPhoto] = useState(null);
//   const [loading, setLoading] = useState(true);
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
//     const loadData = async () => {
//       try {
//         const staffRes = await api.get(`/staff/${id}`);
//         const s = staffRes.data;

//         setForm({
//           restaurantName: s.restaurantName || "",
//           name: s.name || "",
//           phone: s.phone || "",
//           fees: s.fees || "",
//           skills: s.skills?.join(",") || "",
//           description: s.description || "",
//           services: s.services?.map((x) => x._id) || [],
//           isAvailable: s.isAvailable,
//           isOnLeave: s.isOnLeave,
//         });

//         const servicesRes = await api.get("/services");
//         setServices(servicesRes.data);

//         setLoading(false);
//       } catch (err) {
//         alert("Failed to load staff details");
//         navigate("/admin/staff");
//       }
//     };

//     loadData();
//   }, [id, navigate]);

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;

//     if (name === "isOnLeave" && checked) {
//       setForm({ ...form, isOnLeave: true, isAvailable: false });
//     } else if (name === "isAvailable" && checked) {
//       setForm({ ...form, isAvailable: true, isOnLeave: false });
//     } else {
//       setForm({
//         ...form,
//         [name]: type === "checkbox" ? checked : value,
//       });
//     }
//   };

//   const toggleService = (sid) => {
//     setForm((prev) => ({
//       ...prev,
//       services: prev.services.includes(sid)
//         ? prev.services.filter((s) => s !== sid)
//         : [...prev.services, sid],
//     }));
//   };

//   const updateStaff = async () => {
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

//       await api.put(`/staff/${id}`, fd, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       alert("✅ Staff updated successfully");
//       navigate("/admin/staff");
//     } catch (err) {
//       alert(err.response?.data?.message || "❌ Failed to update staff");
//     }
//   };

//   if (loading) return <p style={{ padding: 20 }}>Loading...</p>;

//   return (
//     <div style={{ padding: 20, maxWidth: 500 }}>
//       <h2>Edit Staff</h2>

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
//         type="number"
//         name="fees"
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

//       <br />

//       <input type="file" onChange={(e) => setPhoto(e.target.files[0])} />

//       <br />

//       <label>
//         <input
//           type="checkbox"
//           name="isAvailable"
//           checked={form.isAvailable}
//           onChange={handleChange}
//         />
//         Available
//       </label>

//       <label style={{ marginLeft: 12 }}>
//         <input
//           type="checkbox"
//           name="isOnLeave"
//           checked={form.isOnLeave}
//           onChange={handleChange}
//         />
//         On Leave
//       </label>

//       <br />
//       <br />

//       <button onClick={updateStaff}>Update Staff</button>
//       <button
//         style={{ marginLeft: 10 }}
//         onClick={() => navigate("/admin/staff")}
//       >
//         Cancel
//       </button>
//     </div>
//   );
// }