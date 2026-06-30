import { Routes, Route, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useContext } from "react";

import { AppContext } from "./Context/AppContext";

import PrivateNavbar from "./Components/PrivateNavbar";
import PublicNavbar from "./Components/PublicNavbar";
import Footer from "./Components/Footer";
import ScrollToTop from "./Components/ScrollToTop";

import Home from "./Components/Home";
import Login from "../src/Pages/Login/Login";
import ForgotPassword from "../src/Pages/ForgotPassword/ForgotPassword";
import UserHome from "./Pages/User-Home/UserHome";
import VerifyEmail from "../src/Pages/VerifyEmail/VerifyEmail";
import Explore from "../src/Pages/User-Home/explore";
import Services from "../src/Pages/Services/Services";
import Contact from "./Pages/User-Home/Contact";
import FoodDetails from "../src/Pages/Food/FoodDetails";
import JuiceDetails from "./Pages/Juice/JuiceDetails";
import Cart from "../src/Pages/Cart/Cart";
import Payment from "../src/Pages/Payment/Payment";
import WhatsAppButton from "./Components/WhatsAppButton";

const App = () => {
  const location = useLocation();

  const { isLoggedIn } = useContext(AppContext); 

  const hideLayout = [
    "/login",
    "/forgot-password",
    "/verify-email",
  ].includes(location.pathname);

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} style={{ zIndex: 100000, top: "70px" }}/>

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
        <Route path="/payment" element={<Payment />} />
      </Routes>

      {!hideLayout && <Footer />}
      <ScrollToTop />
      <WhatsAppButton/>
    </>
  );
};

export default App;