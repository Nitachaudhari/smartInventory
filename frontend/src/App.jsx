import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthProvider, AuthContext } from "./context/AuthContext"; // ✅ Correct import
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Reports from "./pages/Reports";
import Home from "./pages/Home";
import Inventory from "./pages/Inventory"
import Register from "./pages/Register";

function AppContent() {
  const { token } = useContext(AuthContext);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        {/* <Route path="/" element={token ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} /> */}
        <Route path="/login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="/dashboard" element={token ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="/reports" element={token ? <Reports /> : <Navigate to="/login" />} />
        <Route path="/inventory" element={<Inventory />} />

      </Routes>
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
