import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import rainyImg from "./assets/rainy.webp";
import winterImg from "./assets/mountain.jpg";
import sunnyImg from "./assets/sun.jpg";

function WeatherResult() {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const city = queryParams.get("city");

  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [history, setHistory] = useState([]);

  const apiKey = "4f07b7850b804b1b89a185918253110";

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const res = await fetch(
          `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`
        );
        if (!res.ok) throw new Error("City not found");
        const data = await res.json();
        setWeather(data);
      } catch (err) {
        setError(err.message);
      }
    };

    const fetchHistory = async () => {
      const today = new Date();
      const past7Days = [...Array(7)].map((_, i) => {
        const date = new Date(today);
        date.setDate(today.getDate() - i);
        return date.toISOString().split("T")[0];
      });

      try {
        const results = await Promise.all(
          past7Days.map(async (date) => {
            const res = await fetch(
              `https://api.weatherapi.com/v1/history.json?key=${apiKey}&q=${city}&dt=${date}`
            );
            const data = await res.json();
            return {
              date,
              condition: data?.forecast?.forecastday[0]?.day?.condition?.text,
              icon: data?.forecast?.forecastday[0]?.day?.condition?.icon,
              avgTemp: data?.forecast?.forecastday[0]?.day?.avgtemp_c,
              humidity: data?.forecast?.forecastday[0]?.day?.avghumidity,
            };
          })
        );
        setHistory(results.reverse());
      } catch (err) {
        console.error("Error fetching history", err);
      }
    };

    if (city) {
      fetchWeather();
      fetchHistory();
    }
  }, [city]);

  // 🌤 Choose background image
  let backgroundImage = sunnyImg;
  if (weather) {
    const condition = weather.current.condition.text.toLowerCase();
    if (condition.includes("rain")) backgroundImage = rainyImg;
    else if (
      condition.includes("snow") ||
      condition.includes("ice") ||
      condition.includes("sleet") ||
      condition.includes("freezing")
    )
      backgroundImage = winterImg;
  }

  // 💎 Styles
  const outerStyle = {
    minHeight: "100vh",
    padding: "20px",
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    fontFamily: "Poppins, sans-serif",
    color: "#111",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  };

  const containerStyle = {
    width: "100%",
    maxWidth: "1200px",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: "15px",
    backdropFilter: "blur(12px)",
    padding: "20px",
    boxShadow: "0 0 20px rgba(0,0,0,0.3)",
    marginBottom: "20px",
  };

  const section = { marginBottom: "30px" };
  const label = { fontSize: "0.9rem", color: "#333", fontWeight: "600" };
  const value = { fontSize: "1.1rem", fontWeight: "bold" };

  const historyCard = {
    backgroundColor: "rgba(255,255,255,0.7)",
    borderRadius: "10px",
    padding: "10px",
    margin: "10px",
    flex: "1 1 150px",
    textAlign: "center",
  };

  const footerStyle = {
    width: "100%",
    textAlign: "center",
    padding: "15px 10px",
    fontSize: "0.9rem",
    color: "#fff",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    borderRadius: "10px",
  };

  const backButtonStyle = {
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    padding: "10px 20px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
    alignSelf: "flex-start",
    marginBottom: "15px",
    transition: "0.3s",
  };

  // 📅 Format current date as DD/MM/YYYY
  const getCurrentDate = () => {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, "0");
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const year = now.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <div style={outerStyle}>
      <button
        style={backButtonStyle}
        onClick={() => navigate("/")}
        onMouseOver={(e) => (e.target.style.backgroundColor = "#0056b3")}
        onMouseOut={(e) => (e.target.style.backgroundColor = "#007bff")}
      >
        ← Back to Home
      </button>

      <div style={containerStyle}>
        {error ? (
          <p style={{ color: "red", fontSize: "1.2rem" }}>{error}</p>
        ) : !weather ? (
          <p>Loading weather data...</p>
        ) : (
          <>
            {/* CURRENT WEATHER */}
            <div style={section}>
              <h2>
                🌤 Current Weather in {weather.location.name},{" "}
                {weather.location.country}
              </h2>

              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "20px",
                  alignItems: "center",
                  marginTop: "10px",
                }}
              >
                <img
                  src={weather.current.condition.icon}
                  alt="icon"
                  style={{ width: 60, height: 60 }}
                />
                <div>
                  <div>
                    <span style={label}>📍 Location:</span>{" "}
                    <span style={value}>
                      {weather.location.name}, {weather.location.country}
                    </span>
                  </div>

                  <div>
                    <span style={label}>📅 Date:</span>{" "}
                    <span style={value}>{getCurrentDate()}</span>
                  </div>

                  <div>
                    <span style={label}>🌐 Timezone:</span>{" "}
                    <span style={value}>{weather.location.tz_id}</span>
                  </div>
                  <div>
                    <span style={label}>🌡️ Temperature:</span>{" "}
                    <span style={value}>{weather.current.temp_c}°C</span>
                  </div>
                  <div>
                    <span style={label}>💧 Humidity:</span>{" "}
                    <span style={value}>{weather.current.humidity}%</span>
                  </div>
                  <div>
                    <span style={label}>💨 Wind:</span>{" "}
                    <span style={value}>
                      {weather.current.wind_kph} km/h
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* WEATHER HISTORY */}
            <div style={section}>
              <h2>📆 Last 7 Days Weather History</h2>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                {history.map((day, index) => (
                  <div key={index} style={historyCard}>
                    <h4>{day.date}</h4>
                    <img
                      src={day.icon}
                      alt="icon"
                      style={{ width: 50, height: 50 }}
                    />
                    <p>{day.condition}</p>
                    <p>🌡️ Avg Temp: {day.avgTemp}°C</p>
                    <p>💧 Humidity: {day.humidity}%</p>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>

      <footer style={footerStyle}>
        © {new Date().getFullYear()} Weather App | Developed by{" "}
        <strong>Saumya Rana</strong>
      </footer>
    </div>
  );
}

export default WeatherResult;
