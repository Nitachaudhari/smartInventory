import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthProvider, AuthContext } from "./context/AuthContext"; // ✅ Correct import
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Reports from "./pages/Reports";
import Home from "./pages/Home";
import Inventory from "./pages/Inventory";
import Register from "./pages/Register";
import Layout from "./components/Layout";
import BarcodeScannerPage from "./pages/BarcodeScannerPage";
import Footer from "./components/Footer";

function AppContent() {
  const { token } = useContext(AuthContext);

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={token ? <Dashboard /> : <Navigate to="/login" />} />
          <Route path="/reports" element={token ? <Reports /> : <Navigate to="/login" />} />
          <Route path="/scan-barcode" element={<BarcodeScannerPage />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
      </Routes>
      {/* <Footer /> ✅ Footer added here to be present on all pages */}
    </BrowserRouter>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
