"use client";
import { useState } from "react";

export default function CallbackSection() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;
    setSent(true);
    setName("");
    setPhone("");
    setTimeout(() => setSent(false), 4000);
  }

  return (
    <section className="py-20 relative overflow-hidden" style={{ background: "#F0FDF9" }}>
      {/* Decorative blob */}
      <div
        className="absolute -top-24 -right-24 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ background: "rgba(0,182,122,0.08)", filter: "blur(70px)" }}
      />
      <div
        className="absolute -bottom-24 -left-24 w-[350px] h-[350px] rounded-full pointer-events-none"
        style={{ background: "rgba(4,11,47,0.07)", filter: "blur(70px)" }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div
          className="rounded-3xl overflow-hidden"
          style={{ background: "white", border: "1px solid #E2E6F0", boxShadow: "0 8px 40px rgba(0,182,122,0.10)" }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2">

            {/* Left: info */}
            <div
              className="p-10 lg:p-14 flex flex-col justify-center"
              style={{ background: "linear-gradient(135deg, #00B67A 0%, #263B96 100%)" }}
            >
              {/* Decorative circle */}
              <div
                className="absolute opacity-10 pointer-events-none"
                style={{ top: 0, left: 0, width: "300px", height: "300px", borderRadius: "50%", background: "#fff" }}
              />

              <div className="npl-tag mb-6 self-start" style={{ background: "rgba(255,255,255,0.20)", color: "#fff" }}>
                Quick Contact
              </div>

              <h2
                className="text-3xl sm:text-4xl font-black leading-tight mb-5 text-white h-display"
              >
                Get a Call Back in<br />
                <span style={{ color: "#CDD8FF" }}>10 Minutes</span>
              </h2>

              <p className="text-base leading-relaxed mb-8" style={{ color: "rgba(255,255,255,0.80)" }}>
                Leave your details and our team will call you right back to help
                book your test or answer any questions.
              </p>

              <a
                href="tel:+97714002747"
                className="inline-flex items-center gap-3 font-bold text-white text-lg hover:opacity-80 transition-opacity"
              >
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center shrink-0"
                  style={{ background: "rgba(255,255,255,0.20)" }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.01 1.18 2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
                  </svg>
                </div>
                +977 1 400 2747
              </a>
            </div>

            {/* Right: form */}
            <div className="p-10 lg:p-14 flex flex-col justify-center">
              {sent ? (
                <div
                  className="rounded-2xl p-8 text-center"
                  style={{ background: "#F0F9FF", border: "1.5px solid #00B67A" }}
                >
                  <div className="text-4xl mb-3">✅</div>
                  <h3 className="text-xl font-bold mb-2" style={{ color: "#040B2F" }}>Request Sent!</h3>
                  <p className="text-sm" style={{ color: "#5D6478" }}>
                    Our team will call you back within 10 minutes during working hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-sm font-semibold mb-2" style={{ color: "#040B2F" }}>
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter your full name"
                      required
                      className="w-full px-5 py-4 text-base rounded-xl focus:outline-none transition-all"
                      style={{
                        background: "#F0FDF9",
                        border: "1.5px solid #E2E6F0",
                        color: "#040B2F",
                      }}
                      onFocus={(e) => { e.currentTarget.style.borderColor = "#00B67A"; e.currentTarget.style.background = "#fff"; }}
                      onBlur={(e) => { e.currentTarget.style.borderColor = "#E2E6F0"; e.currentTarget.style.background = "#F0FDF9"; }}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2" style={{ color: "#040B2F" }}>
                      Mobile Number
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+977 98XXXXXXXX"
                      required
                      className="w-full px-5 py-4 text-base rounded-xl focus:outline-none transition-all"
                      style={{
                        background: "#F0FDF9",
                        border: "1.5px solid #E2E6F0",
                        color: "#040B2F",
                      }}
                      onFocus={(e) => { e.currentTarget.style.borderColor = "#00B67A"; e.currentTarget.style.background = "#fff"; }}
                      onBlur={(e) => { e.currentTarget.style.borderColor = "#E2E6F0"; e.currentTarget.style.background = "#F0FDF9"; }}
                    />
                  </div>
                  <button
                    type="submit"
                    className="lab-btn btn-pop w-full justify-center"
                    style={{ fontSize: "15px", padding: "15px" }}
                  >
                    Request a Callback
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
