import { BrowserRouter, Routes, Route, Link, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Users from "./page/Users.jsx";
import AddUser from "./page/AddUser.jsx";

/* 🔹 Page Title Component */
function PageTitle() {
  const location = useLocation();

  const title =
    location.pathname === "/add" ? "ADD USER" : "DASHBOARD";

  return (
    <h1 className="text-4xl font-extrabold text-center my-6 tracking-wide font-serif">
      {title}
    </h1>
  );
}

function App() {
  return (
    <BrowserRouter>
      {/* Toast container */}
      <Toaster position="top-right" reverseOrder={false} />

      {/* Centered Page Title */}
      <PageTitle />

      {/* Navigation */}
      <nav className="flex justify-center gap-6 mb-6">
        <Link
          to="/"
          className="text-blue-600 font-medium hover:underline"
        >
          Users
        </Link>
        <Link
          to="/add"
          className="text-blue-600 font-medium hover:underline"
        >
          Add User
        </Link>
      </nav>

      <Routes>
        <Route path="/" element={<Users />} />
        <Route path="/add" element={<AddUser />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
