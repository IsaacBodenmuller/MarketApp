import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./screens/login";
import CreateAccount from "./screens/CreateAccount";
import ProtectedRoute from "./components/ProtectedRoute";

function Dashboard() {
  return <h1>Área logada</h1>;
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />

      <Route path="/login" element={<Login />} />
      <Route path="/createaccount" element={<CreateAccount />} />
      {/* <Route path="/forgetpassword" element={<ForgetPassword />} /> */}

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<h1>Not Found</h1>} />
    </Routes>
  );
}
