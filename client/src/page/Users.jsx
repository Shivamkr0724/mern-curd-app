import { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import toast from "react-hot-toast";
import api from "../api";

function Users() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [editUser, setEditUser] = useState({
    _id: "",
    name: "",
    email: "",
    age: ""
  });

  /* DEBOUNCED SEARCH */
  useEffect(() => {
    const timer = setTimeout(fetchUsers, 500);
    return () => clearTimeout(timer);
  }, [search]);

  const fetchUsers = async () => {
    const res = await api.get(`/users?search=${search}`);
    setUsers(res.data);
  };

 const deleteUser = async (id) => {
  try {
    await api.delete(`/users/${id}`);

    // remove user instantly from UI
    setUsers((prev) => prev.filter((u) => u._id !== id));

    toast.success("User deleted successfully 🗑️");
  } catch (e) {
    toast.error("Failed to delete user ❌");
  }
};


  const openEditModal = (user) => {
    setEditUser(user);
    setIsOpen(true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    await api.put(`/users/${editUser._id}`, editUser);
    setIsOpen(false);
    fetchUsers();
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">User List</h2>

      <input
        placeholder="Search user..."
        className="w-full mb-4 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="bg-white shadow rounded-md">
        {users.map((user) => (
          <div
            key={user._id}
            className="flex justify-between items-center px-4 py-3 border-b last:border-none"
          >
            <p className="text-sm text-gray-700">
              <span className="font-semibold">{user.name}</span> •{" "}
              {user.email} • {user.age}
            </p>

            <div className="flex gap-4">
              <FaEdit
                className="text-blue-600 cursor-pointer hover:scale-110 transition"
                onClick={() => openEditModal(user)}
                title="Edit"
              />
              <FaTrash
                className="text-red-600 cursor-pointer hover:scale-110 transition"
                onClick={() => deleteUser(user._id)}
                title="Delete"
              />
            </div>
          </div>
        ))}
      </div>

      {/* ===== MODAL ===== */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-md w-80 shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Edit User</h3>

            <form onSubmit={handleUpdate} className="space-y-3">
              <input
                className="w-full px-3 py-2 border rounded-md focus:ring focus:ring-blue-500"
                placeholder="Name"
                value={editUser.name}
                onChange={(e) =>
                  setEditUser({ ...editUser, name: e.target.value })
                }
              />

              <input
                className="w-full px-3 py-2 border rounded-md focus:ring focus:ring-blue-500"
                placeholder="Email"
                value={editUser.email}
                onChange={(e) =>
                  setEditUser({ ...editUser, email: e.target.value })
                }
              />

              <input
                type="number"
                className="w-full px-3 py-2 border rounded-md focus:ring focus:ring-blue-500"
                placeholder="Age"
                value={editUser.age}
                onChange={(e) =>
                  setEditUser({ ...editUser, age: e.target.value })
                }
              />

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 border rounded-md hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Users;
