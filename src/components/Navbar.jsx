import "../styles/Navbar.css";
import { useNavigate, useLocation } from "react-router-dom";

function Navbar({ setAuth }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    const confirmLogout = window.confirm("Yakin ingin logout?");
    if (!confirmLogout) return;

    try {
      const token = localStorage.getItem("token");

      const response = await fetch("http://127.0.0.1:8000/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        localStorage.removeItem("token");
        if (setAuth) setAuth(false);
        navigate("/login", { replace: true });
      } else {
        alert("Gagal logout dari server.");
      }
    } catch (error) {
      console.error("Logout error:", error);
      alert("Terjadi kesalahan saat logout.");
    }
  };

  // Fungsi scroll ke Services (bisa dari halaman mana pun)
  const handleScrollToServices = () => {
    if (location.pathname !== "/home") {
      // Kalau bukan di halaman Home, arahkan ke /home#services
      navigate("/home#services");
    } else {
      // Kalau sudah di halaman Home, langsung scroll
      const element = document.getElementById("services");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <nav>
      <div className="wrapper">
        <div className="logo">
          <a href="/home" onClick={(e) => { e.preventDefault(); navigate("/home"); }}>
            Eye Care
          </a>
        </div>
        <div className="menu">
          <ul>
            <li>
              <a href="/home" onClick={(e) => { e.preventDefault(); navigate("/home"); }}>
                Home
              </a>
            </li>
            <li>
              <a
                href="#services"
                onClick={(e) => {
                  e.preventDefault();
                  handleScrollToServices();
                }}
              >
                Service
              </a>
            </li>
            <li>
              <a href="/CekMata" onClick={(e) => { e.preventDefault(); navigate("/CekMata"); }}>
                Cek Mata
              </a>
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
