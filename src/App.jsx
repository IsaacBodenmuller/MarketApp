import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./screens/login";
import ProtectedRoute from "./context/ProtectedRoute";
import LandingPage from "./screens/LandingPage";
import Dashboard from "./screens/Dashboard";
import { useAuth } from "./context/useAuth";
import Loading from "./components/Loading";
import Account from "./screens/Account";

export default function App() {
  const { loading } = useAuth();

  if (loading) {
    return <Loading />;
  }

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      {/* <Route path="/forgetpassword" element={<ForgetPassword />} /> */}

      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <LandingPage />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="account" element={<Account />} />
      </Route>

      <Route path="*" element={<Navigate to="/home/dashboard" replace />} />
    </Routes>
  );
}
