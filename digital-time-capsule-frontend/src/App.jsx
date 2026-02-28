import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import CreateCapsule from "./pages/CreateCapsule";
import CapsuleDetails from "./pages/CapsuleDetails";
import Settings from "./pages/Settings"; // ✅ ADD THIS
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Routes>

      {/* Public */}
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>

      {/* Protected */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/create"
        element={
          <ProtectedRoute>
            <CreateCapsule />
          </ProtectedRoute>
        }
      />

      <Route
        path="/capsule/:id"
        element={
          <ProtectedRoute>
            <CapsuleDetails />
          </ProtectedRoute>
        }
      />

      <Route
        path="/capsule/edit/:id"
        element={
          <ProtectedRoute>
            <CreateCapsule />
          </ProtectedRoute>
        }
      />

      {/* ✅ FIXED SETTINGS ROUTE */}
      <Route
        path="/settings"
        element={
          <ProtectedRoute>
            <Settings />
          </ProtectedRoute>
        }
      />


    </Routes>
  );
}

export default App;

