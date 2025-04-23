import React from "react";
import GpsMap from "./GpsMap";
import Sidebar from "./Sidebar"; // Import Sidebar
import "./App.css";

function App() {
  return (
    <div className="App">
      <Sidebar />
      <GpsMap />
    </div>
  );
}

export default App;
