import { Routes, Route, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useContext } from "react";

import { AppContext } from "./Context/AppContext";

import PrivateNavbar from "./Components/PrivateNavbar";
import PublicNavbar from "./Components/PublicNavbar";
import Footer from "./Components/Footer";

import Home from "./Components/Home";
import Login from "./Pages/Login";
import ForgotPassword from "./Pages/ForgotPassword";
import UserHome from "./Pages/UserHome";
import VerifyEmail from "./Pages/VerifyEmail";
import Explore from "./Pages/Explore";
import Services from "./Pages/Services";
import Contact from "./Pages/Contact";
import FoodDetails from "./Pages/FoodDetails";
import JuiceDetails from "./Pages/JuiceDetails";
import Cart from "./Pages/Cart";
import PlaceOrder from "./Pages/PlaceOrder";
import Payment from "./Pages/Payment";

const App = () => {
  const location = useLocation();

  const { isLoggedIn } = useContext(AppContext); // ✅ INSIDE component

  const hideLayout = [
    "/login",
    "/forgot-password",
    "/verify-email",
  ].includes(location.pathname);

  return (
    <>
      <ToastContainer position="top-right" autoClose={2500} />

      {/* NAVBAR SWITCH */}
      {!hideLayout && (
        isLoggedIn ? <PrivateNavbar /> : <PublicNavbar />
      )}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/user-home" element={<UserHome />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/food/:id" element={<FoodDetails />} />
        <Route path="/juice/:id" element={<JuiceDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/place-order" element={<PlaceOrder />} />
        <Route path="/payment" element={<Payment />} />
      </Routes>

      {!hideLayout && <Footer />}
    </>
  );
};

export default App;