import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import WeatherResult from "./WeatherResult";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/weather" element={<WeatherResult />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
