import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./Sidebar";
import GpsMap from "./GpsMap";
import NewMarkerPage from "./NewMarkerPage";
import RoutePlanner from "./RoutePlanner";


function App() {
  return (
    <Router>
      <div className="App">
        <Sidebar />
        <Routes>
          <Route path="/" element={<GpsMap />} />
          <Route path="/new" element={<NewMarkerPage />} />
          <Route path="/route" element={<RoutePlanner />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
