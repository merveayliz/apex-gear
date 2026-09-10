// src/components/Navbar.jsx
export default function Navbar() {
  return (
    <nav style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      backgroundColor: "#121212",
      borderBottom: "1px solid #27272a",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "20px 40px",
      zIndex: 1000,
      color: "white",
      fontFamily: "sans-serif"
    }}>
      {/* Logo */}
      <div style={{ fontSize: "22px", fontWeight: "bold", color: "#ef4444", letterSpacing: "1px" }}>
        APEX GEAR
      </div>

      {/* Menü Linkleri */}
      <div style={{ display: "flex", gap: "30px" }}>
        {["Galeri", "Biz Kimiz", "Ürünler", "SSS", "İletişim"].map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase().replace(/\s+/g, '')}`}
            style={{ color: "#d1d5db", textDecoration: "none", fontWeight: "500", transition: "0.3s" }}
            onMouseOver={(e) => e.target.style.color = "#ef4444"}
            onMouseOut={(e) => e.target.style.color = "#d1d5db"}
          >
            {item}
          </a>
        ))}
      </div>

      {/* Sepet Butonu */}
      <div>
      
      </div>
    </nav>
  );
}