import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { AppConstants } from "../../Util/constants";
import { motion, AnimatePresence } from "framer-motion";
import { FaArrowLeft } from "react-icons/fa";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import PaymentMethodForm from "../Payment/Form";
import ShippingForm from "../Payment/ShippingForm";
import OrderSummary from "../Payment/OrderSummary";

const Payment = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [loading, setLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState(null);
  const [authChecked, setAuthChecked] = useState(false);
  const [showSuccessCard, setShowSuccessCard] = useState(false);

  const cartItems = state?.cartItems || [];
  const subtotal = state?.subtotal || 0;
  const deliveryFee = state?.deliveryFee || 0;
  const total = state?.total || 0;

  const [paymentMethod, setPaymentMethod] = useState("");

  const [paymentForm, setPaymentForm] = useState({
    cardNumber: "",
    cardHolderName: "",
    expiryDate: "",
    cvv: "",
    bankName: "",
    accountNumber: "",
    mobileNumber: "",
    mobileProvider: "",
  });

  const [formErrors, setFormErrors] = useState({});

  // ── SHIPPING / DELIVERY DETAILS ──
  const [shippingForm, setShippingForm] = useState({
    address: "",
    city: "",
    phoneNumber: "",
    deliveryNote: "",
  });

  const [shippingErrors, setShippingErrors] = useState({});

  // ── CHECK AUTHENTICATION ──
  useEffect(() => {
    const checkAuth = () => {
      try {
        console.log("=== CHECKING AUTHENTICATION ===");

        const token = localStorage.getItem("token");
        const userStr = localStorage.getItem("user");

        console.log("Token:", token ? `${token.substring(0, 20)}...` : "No token");
        console.log("User string:", userStr ? userStr.substring(0, 50) + "..." : "No user");

        if (!token) {
          console.log(" No token found in localStorage");
          setIsAuthenticated(false);
          setAuthChecked(true);
          return;
        }

        if (!userStr) {
          console.log(" No user data found in localStorage");
          setIsAuthenticated(false);
          setAuthChecked(true);
          return;
        }

        const userData = JSON.parse(userStr);
        console.log(" User data parsed:", userData);

        // Try multiple ID formats
        const id = userData.id || userData.userId || userData.user_id || null;
        console.log("Extracted user ID:", id);

        if (!id) {
          console.warn(" No user ID found in user data");
          console.log("Available fields:", Object.keys(userData));
          setIsAuthenticated(false);
          setAuthChecked(true);
          return;
        }

        setUserId(id);
        setIsAuthenticated(true);
        console.log(" Authentication successful! User ID:", id);
        setAuthChecked(true);
      } catch (error) {
        console.error(" Auth check error:", error);
        setIsAuthenticated(false);
        setAuthChecked(true);
      }
    };

    checkAuth();
  }, []);

  // ── REDIRECT TO LOGIN IF NOT AUTHENTICATED ──
  useEffect(() => {
    if (authChecked && !isAuthenticated) {
      console.log(" Not authenticated, redirecting to login...");

      // Save current path and data to restore after login
      sessionStorage.setItem("redirectAfterLogin", "/payment");
      sessionStorage.setItem(
        "paymentData",
        JSON.stringify({
          cartItems,
          subtotal,
          deliveryFee,
          total,
        })
      );

      toast.error("Please login to continue");
      navigate("/login", {
        state: {
          from: "/payment",
          message: "Please login to complete your payment",
        },
      });
    }
  }, [authChecked, isAuthenticated, navigate, cartItems, subtotal, deliveryFee, total]);

  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
    setPaymentForm({
      cardNumber: "",
      cardHolderName: "",
      expiryDate: "",
      cvv: "",
      bankName: "",
      accountNumber: "",
      mobileNumber: "",
      mobileProvider: "",
    });
    setFormErrors({});
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPaymentForm((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (formErrors[name]) {
      setFormErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleShippingChange = (e) => {
    const { name, value } = e.target;
    setShippingForm((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (shippingErrors[name]) {
      setShippingErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateShippingForm = () => {
    const errors = {};

    if (!shippingForm.address.trim()) {
      errors.address = "Delivery address is required";
    } else if (shippingForm.address.trim().length < 10) {
      errors.address = "Please enter a more complete address";
    }

    if (!shippingForm.city.trim()) {
      errors.city = "City is required";
    }

    if (!shippingForm.phoneNumber.trim()) {
      errors.phoneNumber = "Phone number is required";
    } else if (!/^\d{10}$/.test(shippingForm.phoneNumber)) {
      errors.phoneNumber = "Phone number must be 10 digits";
    }

    setShippingErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validatePaymentForm = () => {
    const errors = {};

    if (!paymentMethod) {
      errors.paymentMethod = "Please select a payment method";
      setFormErrors(errors);
      return false;
    }

    if (paymentMethod === "CREDIT_CARD") {
      if (!paymentForm.cardNumber.trim()) {
        errors.cardNumber = "Card number is required";
      } else if (!/^\d{16}$/.test(paymentForm.cardNumber.replace(/\s/g, ""))) {
        errors.cardNumber = "Card number must be 16 digits";
      }

      if (!paymentForm.cardHolderName.trim()) {
        errors.cardHolderName = "Card holder name is required";
      }

      if (!paymentForm.expiryDate.trim()) {
        errors.expiryDate = "Expiry date is required";
      } else if (!/^(0[1-9]|1[0-2])\/([0-9]{2})$/.test(paymentForm.expiryDate)) {
        errors.expiryDate = "Format: MM/YY";
      }

      if (!paymentForm.cvv.trim()) {
        errors.cvv = "CVV is required";
      } else if (!/^\d{3,4}$/.test(paymentForm.cvv)) {
        errors.cvv = "CVV must be 3-4 digits";
      }
    } else if (paymentMethod === "BANK_TRANSFER") {
      if (!paymentForm.bankName.trim()) {
        errors.bankName = "Bank name is required";
      }
      if (!paymentForm.accountNumber.trim()) {
        errors.accountNumber = "Account number is required";
      } else if (!/^\d{8,12}$/.test(paymentForm.accountNumber)) {
        errors.accountNumber = "Account number must be 8-12 digits";
      }
    } else if (paymentMethod === "MOBILE_PAYMENT") {
      if (!paymentForm.mobileNumber.trim()) {
        errors.mobileNumber = "Mobile number is required";
      } else if (!/^\d{10}$/.test(paymentForm.mobileNumber)) {
        errors.mobileNumber = "Mobile number must be 10 digits";
      }
      if (!paymentForm.mobileProvider) {
        errors.mobileProvider = "Please select a provider";
      }
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const generatePaymentPDF = (savedOrder, orderItems) => {
    const doc = new jsPDF("p", "mm", "a4");
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 16;
    let y = 18;

    const addLine = (text, value) => {
      doc.setFontSize(10);
      doc.setTextColor("#6b7280");
      doc.setFont("helvetica", "normal");
      doc.text(text, margin, y);
      doc.setTextColor("#111827");
      doc.setFont("helvetica", "bold");
      const valueText = String(value || "-");
      doc.text(valueText, margin + 58, y);
      y += 6;
    };

    doc.setFillColor("#f97316");
    doc.rect(0, 0, pageWidth, 8, "F");
    doc.setFont("helvetica", "bold");
    doc.setTextColor("#f97316");
    doc.setFontSize(22);
    doc.text("HiruEats Payment Receipt", margin, y + 8);
    y += 18;

    doc.setDrawColor("#e5e7eb");
    doc.line(margin, y, pageWidth - margin, y);
    y += 10;

    doc.setFontSize(12);
    doc.setTextColor("#111827");
    doc.text("Order Details", margin, y);
    y += 8;

    addLine("Order ID", savedOrder.id || "Pending");
    addLine("Status", savedOrder.status || "PENDING");
    addLine("Payment Method", savedOrder.paymentMethod || "-");
    addLine("Subtotal", `Rs. ${Number(savedOrder.subtotal || 0).toFixed(2)}`);
    addLine("Delivery Fee", `Rs. ${Number(savedOrder.deliveryFee || 0).toFixed(2)}`);
    addLine("Total", `Rs. ${Number(savedOrder.total || 0).toFixed(2)}`);

    y += 2;
    doc.setFont("helvetica", "bold");
    doc.setTextColor("#111827");
    doc.text("Delivery Details", margin, y);
    y += 8;
    addLine("Address", savedOrder.deliveryAddress || "-");
    addLine("City", savedOrder.deliveryCity || "-");
    addLine("Phone", savedOrder.deliveryPhoneNumber || "-");
    addLine("Note", savedOrder.deliveryNote || "-");

    y += 4;
    doc.setFont("helvetica", "bold");
    doc.setTextColor("#111827");
    doc.text("Items", margin, y);
    y += 4;

    const rows = orderItems.map((item) => {
      const qty = Number(item.quantity || 0);
      const price = Number(item.price || 0);
      return [item.itemName || "Unknown item", qty, `Rs. ${price.toFixed(2)}`, `Rs. ${(price * qty).toFixed(2)}`];
    });

    autoTable(doc, {
      startY: y + 4,
      head: [["Item", "Qty", "Unit Price", "Total"]],
      body: rows,
      theme: "grid",
      headStyles: { fillColor: [249, 115, 22], textColor: [255, 255, 255] },
      styles: { fontSize: 9 },
    });

    doc.save(`HiruEats-Order-${savedOrder.id || "receipt"}.pdf`);
  };

  const handlePayment = async () => {
    console.log("=== PROCESSING PAYMENT ===");

    // ── RE-CHECK AUTHENTICATION ──
    const token = localStorage.getItem("token");
    const userStr = localStorage.getItem("user");

    console.log("Token exists:", !!token);
    console.log("User string exists:", !!userStr);

    if (!token || !userStr) {
      console.log(" No token or user found");
      toast.error("Please login to continue");
      navigate("/login");
      return;
    }

    let currentUserId = userId;
    if (!currentUserId) {
      try {
        const userData = JSON.parse(userStr);
        // Try all possible ID fields
        currentUserId = userData.id || userData.userId || userData.user_id || null;

        if (!currentUserId) {
          console.log(" No user ID found in stored data");
          toast.error("User ID not found. Please login again.");
          // Clear invalid data and redirect
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          navigate("/login");
          return;
        }
        setUserId(currentUserId);
      } catch (error) {
        console.error(" Error parsing user data:", error);
        toast.error("Invalid user data. Please login again.");
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
        return;
      }
    }

    console.log(" User ID:", currentUserId);

    if (!cartItems.length) {
      toast.error("Cart is empty!");
      return;
    }

    const isShippingValid = validateShippingForm();
    const isPaymentValid = validatePaymentForm();

    if (!isShippingValid || !isPaymentValid) {
      toast.error("Please fill all required fields correctly");
      return;
    }

    setLoading(true);

    try {
      const orderItems = cartItems.map((item) => ({
        foodId: item.foodId || item.id || null,
        juiceId: item.juiceId || null,
        itemName: item.foodName || item.juiceName || item.name,
        price: item.price,
        quantity: item.quantity,
      }));

      const orderData = {
        userId: currentUserId,
        paymentMethod: paymentMethod,
        subtotal: subtotal,
        deliveryFee: deliveryFee,
        total: total,
        items: orderItems,
        deliveryAddress: shippingForm.address,
        deliveryCity: shippingForm.city,
        deliveryPhoneNumber: shippingForm.phoneNumber,
        deliveryNote: shippingForm.deliveryNote,
        paymentDetails: {
          method: paymentMethod,
          cardHolderName: paymentForm.cardHolderName,
          cardNumber: paymentForm.cardNumber ? `****${paymentForm.cardNumber.slice(-4)}` : null,
          expiryDate: paymentForm.expiryDate,
          bankName: paymentForm.bankName,
          accountNumber: paymentForm.accountNumber ? `****${paymentForm.accountNumber.slice(-4)}` : null,
          mobileProvider: paymentForm.mobileProvider,
          mobileNumber: paymentForm.mobileNumber ? `****${paymentForm.mobileNumber.slice(-4)}` : null,
        },
      };

      console.log(" Sending order data:", JSON.stringify(orderData, null, 2));

      const response = await axios.post(
        `${AppConstants.BACKEND_API_BASE_URL}/hirueats/orders`,
        orderData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(" Response:", response.data);

      if (response.data) {
        const savedOrder = {
          ...orderData,
          ...response.data,
        };

        generatePaymentPDF(savedOrder, orderItems);

        toast.success("Payment successful! Order placed.");
        setShowSuccessCard(true);

        // Clear cart
        localStorage.removeItem("cart");
        localStorage.removeItem("cartItems");

        setTimeout(() => {
          navigate("/my-orders", {
            state: {
              orderId: response.data.id,
              orderDetails: response.data,
              justPlacedOrder: true,
            },
          });
        }, 1800);
      }
    } catch (error) {
      console.error(" Payment error:", error);

      if (error.response) {
        console.log("Status:", error.response.status);
        console.log("Data:", error.response.data);

        // Handle 401 specifically
        if (error.response.status === 401) {
          const errorMsg = error.response.data?.message || "Session expired. Please login again.";
          toast.error(errorMsg);

          // Clear all auth data
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          sessionStorage.removeItem("redirectAfterLogin");
          sessionStorage.removeItem("paymentData");

          // Redirect to login with return path
          navigate("/login", {
            state: {
              from: "/payment",
              message: "Your session has expired. Please login again.",
            },
          });
          return;
        }

        const errorMessage =
          error.response.data?.message || error.response.data?.error || "Payment failed. Please try again.";
        toast.error(errorMessage);
      } else if (error.request) {
        console.log("No response received:", error.request);
        toast.error("Network error. Please check your connection.");
      } else {
        console.log("Error message:", error.message);
        toast.error("An error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  // ── SHOW LOADING WHILE CHECKING AUTH ──
  if (!authChecked) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Checking authentication...</p>
        </div>
      </div>
    );
  }

  // ── SHOW LOADING IF NOT AUTHENTICATED ──
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Redirecting to login...</p>
        </div>
      </div>
    );
  }

  // ── MAIN RENDER ──
  return (
    <div className="relative min-h-screen bg-gray-50 px-6 py-10">
      <AnimatePresence>
        {showSuccessCard && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 px-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="w-full max-w-md rounded-3xl border border-emerald-200 bg-white p-8 text-center shadow-2xl"
              initial={{ scale: 0.85, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              transition={{ type: "spring", stiffness: 180, damping: 16 }}
            >
              <motion.div
                className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 text-3xl text-emerald-600 shadow-inner"
                animate={{ scale: [1, 1.08, 1] }}
                transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
              >
                ✓
              </motion.div>
              <h2 className="mt-6 text-2xl font-bold text-gray-900">Payment Successfully</h2>
              <p className="mt-3 text-sm text-gray-600">
                Your order has been saved to the database. Redirecting you to My Orders...
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto mb-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-black hover:text-orange-600 font-semibold cursor-pointer"
        >
          <FaArrowLeft />
          Back to Cart
        </button>
      </div>

      <div className="max-w-7xl mx-auto mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
        <p className="text-gray-500 mt-1">Complete the steps below to place your order.</p>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT — PAYMENT METHOD */}
        <div className="lg:col-span-4">
          <PaymentMethodForm
            paymentMethod={paymentMethod}
            handlePaymentMethodChange={handlePaymentMethodChange}
            paymentForm={paymentForm}
            handleInputChange={handleInputChange}
            formErrors={formErrors}
          />
        </div>

        {/* CENTER — SHIPPING DETAILS */}
        <div className="lg:col-span-4">
          <ShippingForm
            shippingForm={shippingForm}
            handleShippingChange={handleShippingChange}
            shippingErrors={shippingErrors}
          />
        </div>

        {/* RIGHT — ORDER SUMMARY */}
        <div className="lg:col-span-4">
          <OrderSummary
            cartItems={cartItems}
            subtotal={subtotal}
            deliveryFee={deliveryFee}
            total={total}
            paymentMethod={paymentMethod}
            loading={loading}
            onPay={handlePayment}
          />
        </div>
      </div>
    </div>
  );
};

export default Payment;
