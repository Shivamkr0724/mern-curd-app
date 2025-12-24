import { useState } from "react";
import api from "../api";
import toast from "react-hot-toast";

function AddUser() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    age: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/users", form);
      setForm({ name: "", email: "", age: "" });

      toast.success("User added successfully 🎉");
    } catch (error) {
      toast.error("Failed to add user ❌");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Add New User</h2>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow rounded p-6 space-y-4"
      >
        <input
          className="w-full px-3 py-2 border rounded"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />

        <input
          className="w-full px-3 py-2 border rounded"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />

        <input
          className="w-full px-3 py-2 border rounded"
          type="number"
          placeholder="Age"
          value={form.age}
          onChange={(e) => setForm({ ...form, age: e.target.value })}
          required
        />

        <button className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200 cursor-pointer">
         Add User
     </button>

      </form>
    </div>
  );
}

export default AddUser;
