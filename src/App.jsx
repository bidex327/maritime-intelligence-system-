import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardLayout from "./components/layout/DashboardLayout";

import Dashboard from "./pages/Dashboard";
import Alerts from "./pages/Alerts";
import Analytics from "./pages/Analytics";
import IncidentDetails from "./pages/IncidentsDeatails";
import Map from "./pages/Map";
import Settings from "./pages/Settings";

function App() {
  return (
    <BrowserRouter>
      <DashboardLayout>
        <Routes>
          <Route path="/" element={<Dashboard />} />

          <Route path="/alerts" element={<Alerts />} />

          <Route path="/analytics" element={<Analytics />} />

          <Route path="/incident-details" element={<IncidentDetails />} />

          <Route path="/map" element={<Map />} />

          <Route path="/settings" element={<Settings />} />
        </Routes>
      </DashboardLayout>
    </BrowserRouter>
  );
}

export default App;
