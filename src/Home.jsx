import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "./assets/mountain.jpg"; // Make sure the image exists

function Home() {
  const [city, setCity] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (!city.trim()) return;
    navigate(`/weather?city=${encodeURIComponent(city)}`);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSubmit();
  };

  // 💎 Styles
  const containerStyle = {
    minHeight: "100vh",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundImage: `url(${logo})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    fontFamily: "'Poppins', sans-serif",
    position: "relative",
  };

  const overlayStyle = {
    position: "absolute",
    inset: 0,
    background: "linear-gradient(180deg, rgba(0,0,0,0.4), rgba(0,0,0,0.6))",
    zIndex: 1,
  };

  const boxStyle = {
    position: "relative",
    zIndex: 2,
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    borderRadius: "20px",
    padding: "40px 30px",
    width: "90%",
    maxWidth: "400px",
    boxShadow: "0 8px 30px rgba(0,0,0,0.4)",
    textAlign: "center",
    backdropFilter: "blur(10px)",
    color: "white",
  };

  const headingStyle = {
    fontSize: "1.8rem",
    marginBottom: "20px",
    color: "#fff",
    textShadow: "2px 2px 6px rgba(0,0,0,0.4)",
  };

  const inputStyle = {
    width: "100%",
    padding: "12px 16px",
    fontSize: "1rem",
    borderRadius: "10px",
    border: "1px solid #ccc",
    outline: "none",
    marginBottom: "20px",
    color: "#333",
  };

  const buttonStyle = {
    width: "100%",
    padding: "12px",
    fontSize: "1rem",
    background: "linear-gradient(90deg, #3498db, #1abc9c)",
    color: "white",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    transition: "0.3s",
  };

  const buttonHover = (e, hover) => {
    e.target.style.background = hover
      ? "linear-gradient(90deg, #2980b9, #16a085)"
      : "linear-gradient(90deg, #3498db, #1abc9c)";
  };

  const titleStyle = {
    position: "absolute",
    top: "6%",
    left: "50%",
    transform: "translateX(-50%)",
    fontSize: "2.5rem",
    color: "white",
    zIndex: 2,
    textShadow: "3px 3px 8px rgba(0,0,0,0.6)",
  };

  return (
    <div style={containerStyle}>
      <div style={overlayStyle}></div>
      <h1 style={titleStyle}>🌦 Weather Forecast</h1>

      <div style={boxStyle}>
        <h2 style={headingStyle}>🌤 Enter a City</h2>
        <input
          type="text"
          placeholder="Enter city name..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={handleKeyPress}
          style={inputStyle}
        />
        <button
          onClick={handleSubmit}
          style={buttonStyle}
          onMouseOver={(e) => buttonHover(e, true)}
          onMouseOut={(e) => buttonHover(e, false)}
        >
          🔍 Show Weather
        </button>
      </div>
    </div>
  );
}

export default Home;
