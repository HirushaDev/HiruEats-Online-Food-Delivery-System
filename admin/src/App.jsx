import { Routes, Route, Navigate } from "react-router-dom";
import { AppProvider } from "./Context/AdminAppContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import AdminLayout from "../src/pages/Home/AdminLayout";
import AdminHome from "../src/pages/Home/AdminHome";
import UserManagement from "../src/pages/UserManagement/UserManagement";
import AddFoods from "../src/pages/Foods/AddFoods";
import AddJuice from "../src/pages/Juice/AddJuice";
import ViewFoods from "../src/pages/Foods/ViewFoods";
import ViewJuices from "../src/pages/Juice/ViewJuices";
import Orders from "../src/pages/Orders/Orders";
import Login from "../src/pages/Login/Login";

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("adminToken");

  if (!token) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default function App() {
  return (
    <AppProvider>
      <ToastContainer position="top-right" autoClose={3000} />

      <Routes>
        {/* Login Page */}
        <Route path="/" element={<Login />} />

        {/* Protected Admin Routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminHome />} />
           <Route path="user-management" element={<UserManagement />} />
          <Route path="add-food" element={<AddFoods />} />
          <Route path="add-juice" element={<AddJuice />} />
          <Route path="view-foods" element={<ViewFoods />} />
          <Route path="view-juices" element={<ViewJuices />} />
          <Route path="view-orders" element={<Orders />} />
        </Route>

        {/* Invalid Routes Redirect */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AppProvider>
  );
}