import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import ImportPage from "./pages/ImportPage";
import ExportPage from "./pages/ExportPage";
import SettingsPage from "./pages/SettingsPage";
import ProtectedRoute from "./components/ProtectedRoute";
import ImportHistoryPage from "./pages/ImportHistoryPage";

function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<AuthPage />} />

        <Route
          path="/home"
          element={<ProtectedRoute><HomePage /></ProtectedRoute>}
        />
        <Route
          path="/import"
          element={<ProtectedRoute><ImportPage /></ProtectedRoute>}
        />
        <Route
          path="/export"
          element={<ProtectedRoute><ExportPage /></ProtectedRoute>}
        />
        <Route
          path="/settings"
          element={<ProtectedRoute><SettingsPage /></ProtectedRoute>}
        />
        <Route 
          path="/import-history" 
          element={<ProtectedRoute><ImportHistoryPage /></ProtectedRoute>} />
        

      </Routes>
      

    </BrowserRouter>
  );
}

export default App;