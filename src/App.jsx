import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./screens/login";
import ProtectedRoute from "./context/ProtectedRoute";
import LandingPage from "./screens/LandingPage";
import Dashboard from "./screens/Dashboard";
import { useAuth } from "./context/useAuth";
import Loading from "./components/Loading";
import Account from "./screens/Account";
import Sales from "./screens/Sales";
import Checkout from "./screens/Checkout";
import Payments from "./screens/Payments";
import Products from "./screens/Products";
import Categories from "./screens/Categories";
import Customers from "./screens/Customers";
import Suppliers from "./screens/Suppliers";
import Handling from "./screens/Handling";

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
        <Route
          path="sales"
          element={
            <ProtectedRoute>
              <Sales />
            </ProtectedRoute>
          }
        />
        <Route path="checkout" element={<Checkout />} />
        <Route
          path="payments"
          element={
            <ProtectedRoute>
              <Payments />
            </ProtectedRoute>
          }
        />
        <Route
          path="products"
          element={
            <ProtectedRoute>
              <Products />
            </ProtectedRoute>
          }
        />
        <Route
          path="categories"
          element={
            <ProtectedRoute>
              <Categories />
            </ProtectedRoute>
          }
        />
        <Route path="customers" element={<Customers />} />
        <Route
          path="suppliers"
          element={
            <ProtectedRoute>
              <Suppliers />
            </ProtectedRoute>
          }
        />
        <Route
          path="handling"
          element={
            <ProtectedRoute>
              <Handling />
            </ProtectedRoute>
          }
        />
      </Route>

      <Route path="*" element={<Navigate to="/home/dashboard" replace />} />
    </Routes>
  );
}
