import { useEffect, useState } from "react";
import api from "../api/axios";
import "../styles/adminAddService.css";

export default function AdminAddService() {
  const [services, setServices] = useState([]);

  const [form, setForm] = useState({
    title: "",
    durationMinutes: "",
    price: "",
    description: "",
  });

  const loadServices = async () => {
    try {
      const res = await api.get("/services");
      setServices(res.data);
    } catch (err) {
      console.error("Failed to load services");
    }
  };

  useEffect(() => {
    loadServices();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitService = async () => {
    try {
      if (!form.title || !form.durationMinutes || !form.price) {
        alert("Please fill all required fields");
        return;
      }

      await api.post("/services", {
        title: form.title,
        durationMinutes: Number(form.durationMinutes),
        price: Number(form.price),
        description: form.description,
      });

      alert("✅ Service added successfully");

      setForm({
        title: "",
        durationMinutes: "",
        price: "",
        description: "",
      });

      loadServices();
    } catch (err) {
      alert(err.response?.data?.message || "❌ Failed to add service");
    }
  };

  const deleteService = async (id) => {
    if (!window.confirm("Delete this service?")) return;
    try {
      await api.delete(`/services/${id}`);
      loadServices();
    } catch {
      alert("❌ Failed to delete service");
    }
  };

  return (
    <div className="admin-service">
      <h2 className="admin-title">Admin • Manage Services</h2>

      <div className="service-form-card">
        <h3>Add New Service</h3>

        <input
          placeholder="Service Name (e.g. Haircut)"
          name="title"
          value={form.title}
          onChange={handleChange}
        />

        <input
          placeholder="Duration (minutes)"
          name="durationMinutes"
          type="number"
          value={form.durationMinutes}
          onChange={handleChange}
        />

        <input
          placeholder="Price (₹)"
          name="price"
          type="number"
          value={form.price}
          onChange={handleChange}
        />

        <textarea
          placeholder="Description"
          name="description"
          value={form.description}
          onChange={handleChange}
        />

        <button className="btn-primary" onClick={submitService}>
          Add Service
        </button>
      </div>

      <h3 className="section-title">Existing Services</h3>

      {services.length === 0 && <p>No services added yet.</p>}

      {services.map((s) => (
        <div key={s._id} className="service-row">
          <div>
            <b>{s.title}</b>
            <br />
            <small>⏱ {s.durationMinutes} mins • ₹{s.price}</small>
          </div>

          <button
            className="btn-danger"
            onClick={() => deleteService(s._id)}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}












// import { useEffect, useState } from "react";
// import api from "../api/axios";

// export default function AdminAddService() {
//   const [services, setServices] = useState([]);

//   const [form, setForm] = useState({
//     title: "",
//     durationMinutes: "",
//     price: "",
//     description: "",
//   });

//   const loadServices = async () => {
//     try {
//       const res = await api.get("/services");
//       setServices(res.data);
//     } catch (err) {
//       console.error("Failed to load services");
//     }
//   };

//   useEffect(() => {
//     loadServices();
//   }, []);

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const submitService = async () => {
//     try {
//       if (!form.title || !form.durationMinutes || !form.price) {
//         alert("Please fill all required fields");
//         return;
//       }

//       await api.post("/services", {
//         title: form.title,
//         durationMinutes: Number(form.durationMinutes),
//         price: Number(form.price),
//         description: form.description,
//       });

//       alert("✅ Service added successfully");

//       setForm({
//         title: "",
//         durationMinutes: "",
//         price: "",
//         description: "",
//       });

//       loadServices();
//     } catch (err) {
//       alert(err.response?.data?.message || "❌ Failed to add service");
//     }
//   };

//   const deleteService = async (id) => {
//     if (!window.confirm("Delete this service?")) return;

//     try {
//       await api.delete(`/services/${id}`);
//       loadServices();
//     } catch (err) {
//       alert("❌ Failed to delete service");
//     }
//   };

//   return (
//     <div style={{ padding: 20 }}>
//       <h2>Admin • Manage Services</h2>

//       <div
//         style={{
//           border: "1px solid #ccc",
//           padding: 16,
//           width: 420,
//           borderRadius: 8,
//           marginBottom: 30,
//         }}
//       >
//         <h3>Add New Service</h3>

//         <input
//           placeholder="Service Name (e.g. Haircut)"
//           name="title"
//           value={form.title}
//           onChange={handleChange}
//         />

//         <input
//           placeholder="Duration (minutes)"
//           name="durationMinutes"
//           type="number"
//           value={form.durationMinutes}
//           onChange={handleChange}
//         />

//         <input
//           placeholder="Price (₹)"
//           name="price"
//           type="number"
//           value={form.price}
//           onChange={handleChange}
//         />

//         <textarea
//           placeholder="Description"
//           name="description"
//           value={form.description}
//           onChange={handleChange}
//         />

//         <br />
//         <button onClick={submitService}>Add Service</button>
//       </div>

//       <h3>Existing Services</h3>

//       {services.length === 0 && <p>No services added yet.</p>}

//       {services.map((s) => (
//         <div
//           key={s._id}
//           style={{
//             border: "1px solid #ddd",
//             padding: 12,
//             marginBottom: 8,
//             borderRadius: 8,
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//           }}
//         >
//           <div>
//             <b>{s.title}</b>
//             <br />
//             <small>
//               ⏱ {s.durationMinutes} mins • ₹{s.price}
//             </small>
//           </div>

//           <button
//             style={{ background: "red", color: "white" }}
//             onClick={() => deleteService(s._id)}
//           >
//             Delete
//           </button>
//         </div>
//       ))}
//     </div>
//   );
// }