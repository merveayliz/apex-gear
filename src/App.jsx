// src/App.jsx
import React, { useState } from "react";
import Navbar from "./components/Navbar";
import BmwModel from './components/BmwModel';

export default function App() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [flyingImage, setFlyingImage] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // 🛒 Sepet ve Sipariş State'leri
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  // 📝 WhatsApp Sipariş Formu State'leri
  const [isCheckoutStep, setIsCheckoutStep] = useState(false);
  const [formData, setFormData] = useState({ name: "", surname: "", address: "" });

  // ❓ SSS Açılır/Kapanır State'i
  const [openFaq, setOpenFaq] = useState(null);

  const products = [
    { id: 1, title: "Apex Carbon Pro Kask", category: "Kask", price: "8.499 TL", badge: "En Çok Satan", image: "/images/1.jpg" },
    { id: 2, title: "Storm Rider Mat Siyah Kask", category: "Kask", price: "6.299 TL", badge: "İndirim", image: "/images/2.jpg" },
    { id: 3, title: "Speedline Track Yarış Kaskı", category: "Kask", price: "11.999 TL", badge: "VIP", image: "/images/3.jpg" },
    { id: 4, title: "Vortex Deri Koruma Montu", category: "Mont", price: "9.500 TL", badge: "Popüler", image: "/images/4.jpg" },
    { id: 5, title: "Night Rider Cordura Yazlık Mont", category: "Mont", price: "7.200 TL", badge: "Yeni", image: "/images/5.jpg" },
    { id: 6, title: "Titanium Armor Profesyonel Mont", category: "Mont", price: "13.499 TL", badge: "Pro", image: "/images/6.jpg" },
    { id: 7, title: "Carbon Knuckle Yarış Eldiveni", category: "Eldiven", price: "2.499 TL", badge: "Favori", image: "/images/7.jpg" },
    { id: 8, title: "Thermal Winter Pro Eldiven", category: "Eldiven", price: "1.899 TL", badge: "Sıcak Fırsat", image: "/images/8.jpg" },
    { id: 9, title: "Urban Leather Kısa Eldiven", category: "Eldiven", price: "1.599 TL", badge: "Stokta", image: "/images/9.jpg" },
    { id: 10, title: "Titan Flex Mafsallı Dizlik", category: "Dizlik", price: "3.200 TL", badge: "Güvenlik", image: "/images/10.jpg" },
    { id: 11, title: "Pro-Guard Çelik Takviyeli Dizlik", category: "Dizlik", price: "2.850 TL", badge: "Dayanıklı", image: "/images/11.jpg" },
    { id: 12, title: "Yamaha R1 Özel Koruma Demiri", category: "Motor Demiri", price: "4.500 TL", badge: "Uyumlu", image: "/images/12.jpg" },
    { id: 13, title: "Heavy Duty Universal Crash Bar", category: "Motor Demiri", price: "3.900 TL", badge: "Sağlam", image: "/images/13.jpg" },
    { id: 14, title: "Synthetics 10W-40 Performans Yağı", category: "Motor Yağı", price: "950 TL", badge: "Orijinal", image: "/images/14.jpg" },
    { id: 15, title: "İridyum Gökkuşağı Yarış Vizörü", category: "Vizör", price: "1.450 TL", badge: "Şık", image: "/images/15.jpg" },
    { id: 16, title: "Anti-Fog Buğu Yapmaz Siyah Vizör", category: "Vizör", price: "1.250 TL", badge: "Özel Seri", image: "/images/16.jpg" },
  ];

  const faqs = [
    { q: "Kargo süreci ne kadar sürüyor?", a: "Siparişleriniz 1-3 iş günü içerisinde özenle paketlenip anlaşmalı kargoya verilir." },
    { q: "İade ve değişim yapıyor musunuz?", a: "Kullanılmamış ve orijinal ambalajındaki ürünlerde 14 gün içinde koşulsuz iade ve değişim hakkınız vardır." },
    { q: "Ödemeyi nasıl yapabilirim?", a: "Güvenli havale / EFT (IBAN) yöntemiyle veya WhatsApp sipariş hattı üzerinden ödemelerinizi tamamlayabilirsiniz." },
    { q: "Ürünler orijinal mi?", a: "Sitemizde satılan tüm kask, mont ve koruma ekipmanları %100 orijinal ve garantilidir." },
    { q: "Siparişimde sorun çıkarsa size nasıl ulaşırım?", a: "Aşağıda yer alan kurumsal iletişim kanallarından veya WhatsApp hattımızdan bize dilediğiniz zaman ulaşabilirsiniz." }
  ];

  const handleAddToCart = (item, e) => {
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex((cartItem) => cartItem.id === item.id);
      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex].quantity += 1;
        return updated;
      } else {
        return [...prevCart, { ...item, quantity: 1 }];
      }
    });

    const rect = e.currentTarget.getBoundingClientRect();
    setFlyingImage({
      image: item.image,
      startX: rect.left + rect.width / 2,
      startY: rect.top
    });

    setTimeout(() => {
      setFlyingImage(null);
    }, 800);
  };

  const handleUpdateQuantity = (id, delta) => {
    setCart((prevCart) => {
      return prevCart
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean);
    });
  };

  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const totalCartPrice = cart.reduce((acc, item) => {
    const numericPrice = parseFloat(item.price.replace(" TL", "").replace(".", "").replace(",", "."));
    return acc + (numericPrice * item.quantity);
  }, 0);

  const handleSendWhatsAppOrder = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.surname || !formData.address) {
      alert("Lütfen tüm alanları (İsim, Soyisim, Adres) doldurun!");
      return;
    }

    const phoneNumber = "905000000000";
    let productListText = cart.map(item => `• ${item.quantity} adet ${item.title} (${item.price})`).join("\n");
    
    const message = `🚀 *YENİ SİPARİŞ - APEX GEAR*\n\n` +
      `👤 *Müşteri:* ${formData.name} ${formData.surname}\n` +
      `📍 *Adres:* ${formData.address}\n\n` +
      `🛒 *Sipariş Edilen Ürünler:*\n${productListText}\n\n` +
      `💰 *Toplam Tutar:* ${totalCartPrice.toLocaleString("tr-TR")} TL\n` +
      `💳 *Ödeme Yöntemi:* Havale / EFT (IBAN ile)`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, "_blank");
  };

  return (
    <div style={{ width: "100%", minHeight: "100vh", backgroundColor: "#0a0a0a", color: "white", margin: 0, padding: 0, overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@700;900&family=Plus+Jakarta+Sans:wght@400;600;800&display=swap');

        @keyframes flyToCart {
          0% { transform: translate(0, 0) scale(1); opacity: 1; }
          100% { transform: translate(150px, -400px) scale(0.1); opacity: 0; }
        }
        .flying-item {
          position: fixed;
          z-index: 999999;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          overflow: hidden;
          border: 2px solid #ef4444;
          pointer-events: none;
          animation: flyToCart 0.8s cubic-bezier(0.25, 1, 0.5, 1) forwards;
        }
        .product-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
          gap: 25px;
        }

        @media (max-width: 768px) {
          .product-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 10px !important;
          }
          .hero-container {
            padding: 90px 15px 30px 15px !important;
            flex-direction: column !important;
            text-align: center;
          }
          .hero-title {
            font-size: 1.6rem !important;
            line-height: 1.2 !important;
          }
          .hero-desc {
            display: none !important;
          }
          .hero-video-box {
            height: 280px !important;
            max-width: 100% !important;
          }
          .model-section-box {
            padding: 20px !important;
            border-radius: 16px !important;
          }
          .model-container-box {
            height: 320px !important;
          }
          .mobile-top-bar {
            display: flex !important;
            justify-content: space-between;
            align-items: center;
            padding: 15px 20px;
            background: rgba(10,10,10,0.95);
            position: fixed;
            top: 0; left: 0; right: 0;
            z-index: 99999;
            border-bottom: 1px solid rgba(255,255,255,0.08);
            backdrop-filter: blur(10px);
          }
          .desktop-navbar-wrapper {
            display: none !important;
          }
          .fixed-cart-btn {
            display: none !important; /* Mobilde kendi üst barda butonu var */
          }
        }
        @media (min-width: 769px) {
          .mobile-top-bar {
            display: none !important;
          }
        }
      `}</style>

      {/* Uçan Ürün Efekti */}
      {flyingImage && (
        <div className="flying-item" style={{ left: `${flyingImage.startX}px`, top: `${flyingImage.startY}px` }}>
          <img src={flyingImage.image} alt="Uçan ürün" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </div>
      )}

      {/* 🧭 PC NAVİGASYON (SOL TARAF) */}
      <div className="desktop-navbar-wrapper" style={{ 
        display: "flex", alignItems: "center", 
        padding: "12px 40px", position: "fixed", top: 0, left: 0, right: 0, zIndex: 9999, 
        background: "rgba(10,10,10,0.95)", backdropFilter: "blur(12px)", 
        borderBottom: "1px solid rgba(255,255,255,0.08)", boxSizing: "border-box", width: "100%"
      }}>
        <Navbar />
      </div>

      {/* 🛒 SABİT SAĞ ÜST SEPET BUTONU (ASLA KAYBOLMAZ - KESİN ÇÖZÜM) */}
      <button
        className="fixed-cart-btn"
        onClick={() => { setIsCartOpen(true); setIsCheckoutStep(false); }}
        style={{
          position: "fixed", top: "15px", right: "40px", zIndex: 999999,
          backgroundColor: "#dc2626", color: "white", border: "none",
          padding: "10px 22px", borderRadius: "10px", fontWeight: "800", cursor: "pointer",
          boxShadow: "0 0 25px rgba(220, 38, 38, 0.6)", display: "flex", alignItems: "center", gap: "8px",
          fontSize: "0.9rem", transition: "transform 0.2s"
        }}
      >
        🛒 Sepetim ({totalCartCount})
      </button>

      {/* MOBİL ÖZEL ÜST BAR */}
      <div className="mobile-top-bar">
        <button 
          onClick={() => { setIsCartOpen(true); setIsCheckoutStep(false); }}
          style={{ 
            background: "rgba(220, 38, 38, 0.2)", border: "1px solid rgba(220, 38, 38, 0.5)", 
            color: "white", padding: "8px 14px", borderRadius: "10px", 
            fontSize: "0.85rem", fontWeight: "800", cursor: "pointer", display: "flex", alignItems: "center", gap: "6px" 
          }}
        >
          🛒 ({totalCartCount})
        </button>

        <h1 style={{ 
          fontFamily: "'Cinzel Decorative', serif", 
          fontSize: "1.2rem", 
          fontWeight: "950", 
          color: "white", 
          letterSpacing: "2px",
          margin: 0,
          textShadow: "0 0 10px rgba(239, 68, 68, 0.5)"
        }}>
          APEX GEAR
        </h1>

        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          style={{ 
            background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", 
            color: "white", width: "38px", height: "38px", borderRadius: "10px", 
            fontSize: "1.2rem", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" 
          }}
        >
          ⋮
        </button>
      </div>

      {mobileMenuOpen && (
        <div style={{
          position: "fixed", top: "70px", right: "20px", backgroundColor: "#121216",
          border: "1px solid rgba(239, 68, 68, 0.4)", borderRadius: "16px", padding: "15px 20px",
          zIndex: 100000, boxShadow: "0 15px 30px rgba(0,0,0,0.9)", display: "flex", flexDirection: "column", gap: "12px",
          minWidth: "160px"
        }}>
          <a href="#urunler" onClick={() => setMobileMenuOpen(false)} style={{ color: "white", textDecoration: "none", fontSize: "0.95rem", fontWeight: "600" }}>🚀 Ürünler</a>
          <a href="#bizkimiz" onClick={() => setMobileMenuOpen(false)} style={{ color: "white", textDecoration: "none", fontSize: "0.95rem", fontWeight: "600" }}>🛡️ Biz Kimiz?</a>
          <a href="#sss" onClick={() => setMobileMenuOpen(false)} style={{ color: "white", textDecoration: "none", fontSize: "0.95rem", fontWeight: "600" }}>❓ SSS</a>
          <a href="#iletisim" onClick={() => setMobileMenuOpen(false)} style={{ color: "white", textDecoration: "none", fontSize: "0.95rem", fontWeight: "600" }}>📞 İletişim</a>
          <button 
            onClick={() => { setIsCartOpen(true); setIsCheckoutStep(false); setMobileMenuOpen(false); }}
            style={{ background: "#dc2626", color: "white", border: "none", padding: "8px", borderRadius: "8px", fontWeight: "700", cursor: "pointer" }}
          >
            Sepetim ({totalCartCount})
          </button>
        </div>
      )}

      {/* 🛒 SEPET DRAWER */}
      {isCartOpen && (
        <div style={{
          position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.85)", backdropFilter: "blur(6px)",
          zIndex: 999999, display: "flex", justifyContent: "flex-end"
        }}>
          <div style={{
            width: "100%", maxWidth: "420px", backgroundColor: "#121216", height: "100%",
            padding: "25px", display: "flex", flexDirection: "column", borderLeft: "1px solid rgba(239,68,68,0.3)",
            boxShadow: "-10px 0 30px rgba(0,0,0,0.9)", position: "relative", overflowY: "auto"
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: "15px" }}>
              <h3 style={{ fontSize: "1.2rem", fontWeight: "900", margin: 0, color: "white" }}>
                {isCheckoutStep ? "📋 WhatsApp Sipariş Formu" : "🛒 Alışveriş Sepetim"}
              </h3>
              <button 
                onClick={() => setIsCartOpen(false)}
                style={{ background: "rgba(255,255,255,0.1)", border: "none", color: "white", width: "32px", height: "32px", borderRadius: "50%", cursor: "pointer", fontWeight: "700" }}
              >
                ✕
              </button>
            </div>

            {!isCheckoutStep ? (
              <>
                <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: "15px", paddingRight: "5px" }}>
                  {cart.length === 0 ? (
                    <div style={{ textAlign: "center", color: "#71717a", marginTop: "100px" }}>
                      <p style={{ fontSize: "2.5rem", marginBottom: "10px" }}>🛒</p>
                      <p style={{ fontSize: "1rem", fontWeight: "600" }}>Sepetiniz henüz boş.</p>
                    </div>
                  ) : (
                    cart.map((item) => (
                      <div key={item.id} style={{ display: "flex", alignItems: "center", gap: "12px", background: "rgba(255,255,255,0.03)", padding: "10px", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.06)" }}>
                        <img src={item.image} alt={item.title} style={{ width: "60px", height: "60px", objectFit: "contain", background: "rgba(0,0,0,0.3)", borderRadius: "8px" }} />
                        <div style={{ flex: 1 }}>
                          <h4 style={{ fontSize: "0.85rem", fontWeight: "700", margin: "0 0 4px 0", color: "white" }}>{item.title}</h4>
                          <div style={{ fontSize: "0.9rem", fontWeight: "800", color: "#f87171" }}>{item.price}</div>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: "8px", background: "rgba(0,0,0,0.4)", padding: "4px 8px", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.08)" }}>
                          <button onClick={() => handleUpdateQuantity(item.id, -1)} style={{ background: "none", border: "none", color: "white", cursor: "pointer", fontWeight: "bold" }}>-</button>
                          <span style={{ fontSize: "0.85rem", fontWeight: "700", minWidth: "15px", textAlign: "center", color: "white" }}>{item.quantity}</span>
                          <button onClick={() => handleUpdateQuantity(item.id, 1)} style={{ background: "none", border: "none", color: "white", cursor: "pointer", fontWeight: "bold" }}>+</button>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {cart.length > 0 && (
                  <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: "20px", marginTop: "15px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "15px", fontSize: "1.1rem", fontWeight: "800", color: "white" }}>
                      <span>Toplam Tutar:</span>
                      <span style={{ color: "#ef4444" }}>{totalCartPrice.toLocaleString("tr-TR")} TL</span>
                    </div>
                    <button 
                      onClick={() => setIsCheckoutStep(true)}
                      style={{ width: "100%", backgroundColor: "#dc2626", color: "white", border: "none", padding: "14px", borderRadius: "12px", fontWeight: "800", fontSize: "1rem", cursor: "pointer", boxShadow: "0 0 20px rgba(220, 38, 38, 0.4)" }}
                    >
                      Siparişi Tamamla (WhatsApp)
                    </button>
                  </div>
                )}
              </>
            ) : (
              <form onSubmit={handleSendWhatsAppOrder} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                <div style={{ background: "rgba(220, 38, 38, 0.1)", border: "1px solid rgba(220, 38, 38, 0.3)", borderRadius: "12px", padding: "15px" }}>
                  <h4 style={{ fontSize: "0.95rem", fontWeight: "800", color: "#f87171", margin: "0 0 8px 0" }}>💳 Ödeme ve Tutar Bilgisi</h4>
                  <p style={{ fontSize: "0.9rem", margin: "0 0 6px 0", color: "white" }}>Toplam Fatura: <strong>{totalCartPrice.toLocaleString("tr-TR")} TL</strong></p>
                  <p style={{ fontSize: "0.8rem", color: "#d4d4d8", margin: "0 0 4px 0" }}>IBAN: <code>TR00 0000 0000 0000 0000 0000 00</code></p>
                </div>

                <div>
                  <label style={{ fontSize: "0.85rem", fontWeight: "700", color: "#d4d4d8", display: "block", marginBottom: "5px" }}>İsim</label>
                  <input 
                    type="text" placeholder="Adınız" value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    style={{ width: "100%", padding: "10px", borderRadius: "8px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.15)", color: "white", fontSize: "0.9rem", outline: "none" }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: "0.85rem", fontWeight: "700", color: "#d4d4d8", display: "block", marginBottom: "5px" }}>Soyisim</label>
                  <input 
                    type="text" placeholder="Soyadınız" value={formData.surname}
                    onChange={(e) => setFormData({ ...formData, surname: e.target.value })}
                    style={{ width: "100%", padding: "10px", borderRadius: "8px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.15)", color: "white", fontSize: "0.9rem", outline: "none" }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: "0.85rem", fontWeight: "700", color: "#d4d4d8", display: "block", marginBottom: "5px" }}>Açık Adres</label>
                  <textarea 
                    rows="3" placeholder="Adresiniz" value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    style={{ width: "100%", padding: "10px", borderRadius: "8px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.15)", color: "white", fontSize: "0.9rem", outline: "none", resize: "none" }}
                  />
                </div>

                <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                  <button type="button" onClick={() => setIsCheckoutStep(false)} style={{ flex: 1, background: "rgba(255,255,255,0.1)", color: "white", border: "none", padding: "12px", borderRadius: "10px", fontWeight: "700", cursor: "pointer" }}>Geri</button>
                  <button type="submit" style={{ flex: 2, backgroundColor: "#22c55e", color: "white", border: "none", padding: "12px", borderRadius: "10px", fontWeight: "800", cursor: "pointer" }}>WhatsApp ile Gönder 🟢</button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Hero Alanı */}
      <main className="hero-container" style={{ width: "100%", maxWidth: "1300px", margin: "0 auto", padding: "120px 30px 80px 30px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "40px" }}>
        <div style={{ flex: "1 1 550px" }}>
          <span style={{ color: "#ef4444", fontWeight: "600", letterSpacing: "3px", textTransform: "uppercase", fontSize: "0.85rem" }}>// PRO GEAR & PERFORMANCE</span>
          <h1 className="hero-title" style={{ fontSize: "clamp(2.2rem, 4vw, 3.8rem)", fontWeight: "900", lineHeight: "1.1", margin: "15px 0" }}>
            GÜVENLİ VE RAHAT YOLCULUK İÇİN <br />
            <span style={{ color: "#ef4444" }}>ARADIĞIN HER ŞEY BU SİTEDE</span>
          </h1>
          <p className="hero-desc" style={{ color: "#9ca3af", fontSize: "1.1rem", lineHeight: "1.6", marginBottom: "35px" }}>
            Apex Gear ile en sert sürüşlere hazır ol. Profesyonel koruma ekipmanları, kasklar ve motosiklet aksesuarları tek vitrinde.
          </p>
          <a href="#urunler" style={{ backgroundColor: "#dc2626", color: "white", textDecoration: "none", padding: "14px 28px", borderRadius: "12px", fontWeight: "700", fontSize: "0.95rem", boxShadow: "0 0 25px rgba(220, 38, 38, 0.4)", display: "inline-block" }}>
            Ürünleri Keşfet
          </a>
        </div>

        <div style={{ flex: "1 1 400px", display: "flex", justifyContent: "center", width: "100%" }}>
          <div className="hero-video-box" style={{ width: "100%", maxWidth: "420px", height: "450px", background: "#000", border: "1px solid rgba(255, 255, 255, 0.08)", borderRadius: "24px", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 25px 50px rgba(0,0,0,0.9)", position: "relative", overflow: "hidden" }}>
            <video src="/video.mp4" autoPlay loop muted playsInline style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "24px" }} />
          </div>
        </div>
      </main>

      {/* 3D MODEL BÖLÜMÜ */}
      <section id="bizkimiz" style={{ maxWidth: "1300px", margin: "80px auto", padding: "0 30px" }}>
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <span style={{ color: "#ef4444", fontWeight: "600", letterSpacing: "3px", textTransform: "uppercase", fontSize: "0.85rem" }}>// 3D İNTERAKTİF DENEYİM</span>
          <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 3rem)", fontWeight: "900", marginTop: "10px" }}>YOL ARKADAŞINIZIN GÜVENLİĞİ İÇİN BURADAYIZ</h2>
        </div>

        <div className="model-section-box" style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "40px", background: "rgba(18, 18, 22, 0.5)", border: "1px solid rgba(255, 255, 255, 0.06)", borderRadius: "28px", padding: "40px" }}>
          <div className="model-container-box" style={{ width: "100%", maxWidth: "480px", height: "480px", background: "linear-gradient(135deg, #ffffff 0%, #f1f1f5 100%)", border: "2px solid #ef4444", borderRadius: "24px", boxShadow: "0 25px 50px rgba(239, 68, 68, 0.15)", position: "relative", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center", flex: "1 1 480px" }}>
            <BmwModel />
          </div>

          <div style={{ flex: "1 1 450px" }}>
            <h3 style={{ fontSize: "1.7rem", fontWeight: "800", lineHeight: "1.3", marginBottom: "15px" }}>Bu işletme hayatı daha keyifli kılmak için var.</h3>
            <p style={{ color: "#9ca3af", fontSize: "1rem", lineHeight: "1.6", marginBottom: "15px" }}>
              Güvenilir satıcılardan alınmış orijinal ürünlerimizdir. Sizin için yolculuğunuzu tamamen güvenli kılmak ve en sert sürüşlerde bile arkanızda olmak için en iyi ekipmanları bir araya getirdik.
            </p>
            <a href="#urunler" style={{ backgroundColor: "#dc2626", color: "white", textDecoration: "none", padding: "14px 28px", borderRadius: "12px", fontWeight: "700", fontSize: "0.95rem", display: "inline-block", boxShadow: "0 0 20px rgba(220, 38, 38, 0.4)" }}>Ürünleri Gör ➔</a>
          </div>
        </div>
      </section>

      {/* ÜRÜNLER VİTRİNİ */}
      <section id="urunler" style={{ maxWidth: "1300px", margin: "100px auto", padding: "0 30px" }}>
        <div style={{ textAlign: "center", marginBottom: "50px" }}>
          <span style={{ color: "#ef4444", fontWeight: "600", letterSpacing: "3px", textTransform: "uppercase", fontSize: "0.85rem" }}>// PRO VİTRİN</span>
          <h2 style={{ fontSize: "clamp(2rem, 3vw, 3rem)", fontWeight: "900", marginTop: "10px" }}>EN İYİLERİ KEŞFET</h2>
        </div>

        <div className="product-grid">
          {products.map((item) => (
            <div key={item.id} style={{ backgroundColor: "#121216", border: "1px solid rgba(255, 255, 255, 0.08)", borderRadius: "20px", padding: "18px", display: "flex", flexDirection: "column", justifyContent: "space-between", position: "relative", overflow: "hidden", boxShadow: "0 10px 30px rgba(0,0,0,0.5)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
                <span style={{ fontSize: "0.7rem", fontWeight: "700", textTransform: "uppercase", backgroundColor: "rgba(220, 38, 38, 0.15)", color: "#ef4444", padding: "4px 8px", borderRadius: "6px", border: "1px solid rgba(220, 38, 38, 0.3)" }}>{item.category}</span>
                <span style={{ fontSize: "0.65rem", color: "#71717a", fontWeight: "600", background: "rgba(255,255,255,0.05)", padding: "3px 6px", borderRadius: "4px" }}>{item.badge}</span>
              </div>

              <div onClick={() => setSelectedProduct(item)} style={{ height: "170px", display: "flex", alignItems: "center", justifyContent: "center", margin: "5px -4px", background: "rgba(0,0,0,0.2)", borderRadius: "12px", cursor: "pointer", overflow: "hidden" }}>
                <img src={item.image} alt={item.title} style={{ width: "100%", height: "100%", objectFit: "contain", padding: "4px" }} />
              </div>

              <h4 style={{ fontSize: "0.95rem", fontWeight: "700", color: "white", margin: "10px 0 5px 0", lineHeight: "1.3" }}>{item.title}</h4>
              <div style={{ fontSize: "1.05rem", fontWeight: "800", color: "#f87171", marginBottom: "12px" }}>{item.price}</div>

              <div style={{ display: "flex", flexDirection: "column", gap: "8px", paddingTop: "10px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                <button onClick={() => setSelectedProduct(item)} style={{ backgroundColor: "transparent", color: "white", border: "1px solid rgba(255,255,255,0.2)", padding: "9px 10px", borderRadius: "8px", fontWeight: "600", fontSize: "0.8rem", cursor: "pointer", width: "100%" }}>İncele</button>
                <button onClick={(e) => handleAddToCart(item, e)} style={{ backgroundColor: "#dc2626", color: "white", border: "none", padding: "9px 10px", borderRadius: "8px", fontWeight: "700", fontSize: "0.8rem", cursor: "pointer", width: "100%", boxShadow: "0 4px 15px rgba(220, 38, 38, 0.3)" }}>Sepete Ekle</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ❓ SSS */}
      <section id="sss" style={{ maxWidth: "900px", margin: "100px auto", padding: "0 30px" }}>
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <span style={{ color: "#ef4444", fontWeight: "600", letterSpacing: "3px", textTransform: "uppercase", fontSize: "0.85rem" }}>// MERAK EDİLENLER</span>
          <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.5rem)", fontWeight: "900", marginTop: "10px" }}>SIKÇA SORULAN SORULAR</h2>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          {faqs.map((faq, idx) => (
            <div key={idx} style={{ backgroundColor: "#121216", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "14px", overflow: "hidden" }}>
              <button 
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                style={{ width: "100%", background: "none", border: "none", padding: "18px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", color: "white", fontWeight: "700", fontSize: "1rem", cursor: "pointer", textAlign: "left" }}
              >
                <span>{faq.q}</span>
                <span style={{ color: "#ef4444", fontSize: "1.2rem" }}>{openFaq === idx ? "−" : "+"}</span>
              </button>
              {openFaq === idx && (
                <div style={{ padding: "0 20px 18px 20px", color: "#9ca3af", fontSize: "0.95rem", lineHeight: "1.6", borderTop: "1px solid rgba(255,255,255,0.04)" }}>
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 📞 İLETİŞİM KARTLARI VE MAPS */}
      <section id="iletisim" style={{ maxWidth: "1300px", margin: "100px auto", padding: "0 30px" }}>
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <span style={{ color: "#ef4444", fontWeight: "600", letterSpacing: "3px", textTransform: "uppercase", fontSize: "0.85rem" }}>// KURUMSAL İLETİŞİM</span>
          <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.5rem)", fontWeight: "900", marginTop: "10px" }}>OPERASYON & DESTEK MERKEZİ</h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "25px", marginBottom: "40px" }}>
          
          <div style={{ backgroundColor: "#121216", border: "1px solid rgba(239,68,68,0.35)", borderRadius: "20px", padding: "30px", textAlign: "left", boxShadow: "0 15px 35px rgba(0,0,0,0.6)", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: 0, left: 0, width: "4px", height: "100%", backgroundColor: "#ef4444" }}></div>
            <div style={{ fontSize: "0.75rem", fontWeight: "800", color: "#ef4444", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "8px" }}>YÖNETİM & DİGİTAL OPERASYON</div>
            <h3 style={{ fontSize: "1.4rem", fontWeight: "900", color: "white", marginBottom: "15px" }}>Merve Ayliz</h3>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "10px", color: "#d4d4d8", fontSize: "0.95rem", marginBottom: "20px", lineHeight: "1.5" }}>
              <div><strong>Pozisyon:</strong> Kurucu & Lead Designer</div>
              <div><strong>Telefon:</strong> 0500 000 00 00</div>
              <div><strong>Çalışma Saatleri:</strong> Pzt - Cuma: 09:00 - 19:00</div>
            </div>

            <a 
              href="https://www.instagram.com/aylizdev" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ display: "inline-block", backgroundColor: "rgba(220,38,38,0.15)", border: "1px solid rgba(220,38,38,0.4)", color: "#f87171", padding: "10px 18px", borderRadius: "10px", fontWeight: "700", fontSize: "0.9rem", textDecoration: "none" }}
            >
              Instagram Portfolyo / @aylizdev ↗
            </a>
          </div>

          <div style={{ backgroundColor: "#121216", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "20px", padding: "30px", textAlign: "left", boxShadow: "0 15px 35px rgba(0,0,0,0.6)", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: 0, left: 0, width: "4px", height: "100%", backgroundColor: "#71717a" }}></div>
            <div style={{ fontSize: "0.75rem", fontWeight: "800", color: "#a1a1aa", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "8px" }}>MÜŞTERİ İLİŞKİLERİ & LOJİSTİK</div>
            <h3 style={{ fontSize: "1.4rem", fontWeight: "900", color: "white", marginBottom: "15px" }}>Apex Destek Masası</h3>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "10px", color: "#d4d4d8", fontSize: "0.95rem", marginBottom: "20px", lineHeight: "1.5" }}>
              <div><strong>Departman:</strong> Satış Sonrası & İade</div>
              <div><strong>Destek Hattı:</strong> 0850 000 00 00</div>
              <div><strong>Hizmet Süresi:</strong> 7/24 Kesintisiz Asistanlık</div>
            </div>

            <span style={{ display: "inline-block", backgroundColor: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "#a1a1aa", padding: "10px 18px", borderRadius: "10px", fontWeight: "700", fontSize: "0.9rem" }}>
              Durum: Tüm Hatlar Aktif
            </span>
          </div>

        </div>

        <div style={{ width: "100%", height: "380px", borderRadius: "20px", overflow: "hidden", border: "1px solid rgba(255,255,255,0.08)", boxShadow: "0 15px 30px rgba(0,0,0,0.8)" }}>
          <iframe 
            title="Anıtkabir Konum"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3059.7997973747864!2d32.83694857675571!3d39.92553317152438!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14d34f0f6312a02b%3A0xc0640b3726f5d179!2sAn%C4%B1tkabir!5e0!3m2!1str!2str!4v1690000000000!5m2!1str!2str" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen="" 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>

      {/* 🌟 FOOTER */}
      <footer style={{ borderTop: "1px solid rgba(255,255,255,0.08)", padding: "30px 40px", backgroundColor: "#070709", display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: "20px", marginTop: "80px" }}>
        <p style={{ color: "#71717a", fontSize: "0.9rem", margin: 0, fontWeight: "600" }}>
          © 2026 Apex Gear. Tüm hakları saklıdır.
        </p>
        <div style={{ color: "#a1a1aa", fontSize: "0.9rem", fontWeight: "700" }}>
          designer<a href="https://www.instagram.com/aylizdev" target="_blank" rel="noopener noreferrer" style={{ color: "#ef4444", textDecoration: "none", marginLeft: "4px" }}>@aylizdev</a>
        </div>
      </footer>

      {/* MODAL */}
      {selectedProduct && (
        <div style={{ position: "fixed", inset: 0, backgroundColor: "rgba(0, 0, 0, 0.85)", backdropFilter: "blur(8px)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000000, padding: "20px" }}>
          <div style={{ backgroundColor: "#121216", border: "1px solid rgba(239, 68, 68, 0.4)", borderRadius: "24px", padding: "25px", maxWidth: "450px", width: "100%", position: "relative", textAlign: "center", boxShadow: "0 25px 50px rgba(0,0,0,0.9)" }}>
            <button onClick={() => setSelectedProduct(null)} style={{ position: "absolute", top: "15px", right: "15px", background: "rgba(255,255,255,0.1)", border: "none", color: "white", width: "32px", height: "32px", borderRadius: "50%", cursor: "pointer" }}>✕</button>
            <span style={{ fontSize: "0.75rem", color: "#ef4444", fontWeight: "700", textTransform: "uppercase" }}>{selectedProduct.category} / Detay</span>
            <div style={{ width: "100%", height: "280px", margin: "15px 0", background: "rgba(0,0,0,0.4)", borderRadius: "16px", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <img src={selectedProduct.image} alt={selectedProduct.title} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
            </div>
            <h3 style={{ fontSize: "1.3rem", fontWeight: "800", marginBottom: "8px", color: "white" }}>{selectedProduct.title}</h3>
            <p style={{ fontSize: "1.3rem", fontWeight: "900", color: "#f87171", marginBottom: "12px" }}>{selectedProduct.price}</p>
            <button onClick={(e) => { handleAddToCart(selectedProduct, e); setSelectedProduct(null); }} style={{ backgroundColor: "#dc2626", color: "white", border: "none", width: "100%", padding: "12px", borderRadius: "12px", fontWeight: "700", cursor: "pointer" }}>Sepete Ekle</button>
          </div>
        </div>
      )}
    </div>
  );
}