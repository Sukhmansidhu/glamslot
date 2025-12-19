import { useState } from "react";
import api from "../api/axios";
import "../styles/adminAddProduct.css";

export default function AdminAddProduct() {
  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "Shampoo",
    image: "",
    description: "",
  });

  const submit = async () => {
    await api.post("/products", form);
    alert("Product added");
    setForm({
      name: "",
      price: "",
      category: "Shampoo",
      image: "",
      description: "",
    });
  };

  return (
    <div className="admin-product-page">
      <h2 className="admin-product-title">🛍 Add Product</h2>

      <div className="admin-product-form">
        <input
          className="admin-input"
          placeholder="Product name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          className="admin-input"
          placeholder="Price"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
        />

        <select
          className="admin-input"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
        >
          <option>Shampoo</option>
          <option>Conditioner</option>
          <option>Styling</option>
          <option>Tools</option>
        </select>

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
          Add Product
        </button>
      </div>
    </div>
  );
}









// import { useState } from "react";
// import api from "../api/axios";

// export default function AdminAddProduct() {
//   const [form, setForm] = useState({
//     name: "",
//     price: "",
//     category: "Shampoo",
//     image: "",
//     description: "",
//   });

//   const submit = async () => {
//     await api.post("/products", form);
//     alert("Product added");
//     setForm({
//       name: "",
//       price: "",
//       category: "Shampoo",
//       image: "",
//       description: "",
//     });
//   };

//   return (
//     <div style={{ padding: 20 }}>
//       <h2>🛍 Add Product</h2>

//       <input
//         placeholder="Product name"
//         value={form.name}
//         onChange={(e) => setForm({ ...form, name: e.target.value })}
//       />

//       <input
//         placeholder="Price"
//         value={form.price}
//         onChange={(e) => setForm({ ...form, price: e.target.value })}
//       />

//       <select
//         value={form.category}
//         onChange={(e) => setForm({ ...form, category: e.target.value })}
//       >
//         <option>Shampoo</option>
//         <option>Conditioner</option>
//         <option>Styling</option>
//         <option>Tools</option>
//       </select>

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

//       <button onClick={submit}>Add Product</button>
//     </div>
//   );
// }