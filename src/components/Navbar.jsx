import "../styles/Navbar.css";

import { Link, useNavigate } from "react-router-dom";

function Navbar({ setAuth }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const confirmLogout = window.confirm("Yakin ingin logout?");
    if (!confirmLogout) return;

    try {
      const token = localStorage.getItem("token");

      const response = await fetch("http://192.168.137.223:8000/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        // Hapus token & redirect
        localStorage.removeItem("token");
        setAuth(false);
        navigate("/login", { replace: true });
      } else {
        alert("Gagal logout dari server.");
      }
    } catch (error) {
      console.error("Logout error:", error);
      alert("Terjadi kesalahan saat logout.");
    }
  };

  return (
    <nav>
      <div className="wrapper">
        <div className="logo">
          <a href="/">Eye Care</a>
        </div>
        <div className="menu">
          <ul>
            <li>
              <a href="#home">Home</a>
            </li>
            <li>
              <a href="#services">Service</a>
            </li>
            <li>
              <button className="tbl-biru" onClick={handleLogout}>
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
