import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { AppConstants } from "../../Util/constants";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaCreditCard,
  FaUniversity,
  FaMobileAlt,
  FaMoneyBillWave,
  FaArrowLeft,
} from "react-icons/fa";


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

  const [paymentMethod, setPaymentMethod] = useState("CREDIT_CARD");
  
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
      sessionStorage.setItem("paymentData", JSON.stringify({
        cartItems,
        subtotal,
        deliveryFee,
        total
      }));
      
      toast.error("Please login to continue");
      navigate("/login", { 
        state: { 
          from: "/payment",
          message: "Please login to complete your payment" 
        }
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
    setPaymentForm(prev => ({
      ...prev,
      [name]: value
    }));
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const validatePaymentForm = () => {
    const errors = {};

    if (paymentMethod === "CREDIT_CARD") {
      if (!paymentForm.cardNumber.trim()) {
        errors.cardNumber = "Card number is required";
      } else if (!/^\d{16}$/.test(paymentForm.cardNumber.replace(/\s/g, ''))) {
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

  if (!validatePaymentForm()) {
    toast.error("Please fill all required fields correctly");
    return;
  }

  setLoading(true);

  try {
    const orderItems = cartItems.map(item => ({
      foodId: item.foodId || item.id || null,
      juiceId: item.juiceId || null,
      itemName: item.foodName || item.juiceName || item.name,
      price: item.price,
      quantity: item.quantity
    }));

    const orderData = {
      userId: currentUserId,
      paymentMethod: paymentMethod,
      subtotal: subtotal,
      deliveryFee: deliveryFee,
      total: total,
      items: orderItems,
      paymentDetails: {
        ...paymentForm,
        cardNumber: paymentForm.cardNumber ? `****${paymentForm.cardNumber.slice(-4)}` : null,
        cvv: paymentForm.cvv ? "***" : null,
      }
    };

    console.log(" Sending order data:", JSON.stringify(orderData, null, 2));

    const response = await axios.post(
      `${AppConstants.BACKEND_API_BASE_URL}/hirueats/orders`,
      orderData,
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      }
    );

    console.log(" Response:", response.data);

    if (response.data) {
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
            message: "Your session has expired. Please login again." 
          }
        });
        return;
      }
      
      const errorMessage = error.response.data?.message || 
                         error.response.data?.error || 
                         "Payment failed. Please try again.";
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

  // ── RENDER PAYMENT FORM ──
  const renderPaymentForm = () => {
    switch (paymentMethod) {
      case "CREDIT_CARD":
        return (
          <div className="space-y-4 mt-6">
            <h3 className="font-semibold text-lg">Card Details</h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Card Number *
              </label>
              <input
                type="text"
                name="cardNumber"
                value={paymentForm.cardNumber}
                placeholder="1234 5678 9012 3456"
                maxLength="19"
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
                  formErrors.cardNumber ? "border-red-500" : "border-gray-300"
                }`}
                onKeyDown={(e) => {
                  if (!/[\d\s]/.test(e.key) && e.key !== 'Backspace' && e.key !== 'Delete' && e.key !== 'Tab') {
                    e.preventDefault();
                  }
                }}
                onChange={(e) => {
                  let value = e.target.value.replace(/\s/g, '');
                  if (value.length > 16) value = value.slice(0, 16);
                  const formatted = value.replace(/(\d{4})/g, '$1 ').trim();
                  e.target.value = formatted;
                  handleInputChange(e);
                }}
              />
              {formErrors.cardNumber && (
                <p className="text-red-500 text-sm mt-1">{formErrors.cardNumber}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Card Holder Name *
              </label>
              <input
                type="text"
                name="cardHolderName"
                value={paymentForm.cardHolderName}
                onChange={handleInputChange}
                placeholder="John Doe"
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
                  formErrors.cardHolderName ? "border-red-500" : "border-gray-300"
                }`}
              />
              {formErrors.cardHolderName && (
                <p className="text-red-500 text-sm mt-1">{formErrors.cardHolderName}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Expiry Date *
                </label>
                <input
                  type="text"
                  name="expiryDate"
                  value={paymentForm.expiryDate}
                  onChange={handleInputChange}
                  placeholder="MM/YY"
                  maxLength="5"
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
                    formErrors.expiryDate ? "border-red-500" : "border-gray-300"
                  }`}
                  onKeyDown={(e) => {
                    if (!/[\d/]/.test(e.key) && e.key !== 'Backspace' && e.key !== 'Delete' && e.key !== 'Tab') {
                      e.preventDefault();
                    }
                  }}
                />
                {formErrors.expiryDate && (
                  <p className="text-red-500 text-sm mt-1">{formErrors.expiryDate}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  CVV *
                </label>
                <input
                  type="password"
                  name="cvv"
                  value={paymentForm.cvv}
                  onChange={handleInputChange}
                  placeholder="123"
                  maxLength="4"
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
                    formErrors.cvv ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {formErrors.cvv && (
                  <p className="text-red-500 text-sm mt-1">{formErrors.cvv}</p>
                )}
              </div>
            </div>
          </div>
        );

      case "BANK_TRANSFER":
        return (
          <div className="space-y-4 mt-6">
            <h3 className="font-semibold text-lg">Bank Transfer Details</h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Bank Name *
              </label>
              <select
                name="bankName"
                value={paymentForm.bankName}
                onChange={handleInputChange}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
                  formErrors.bankName ? "border-red-500" : "border-gray-300"
                }`}
              >
                <option value="">Select Bank</option>
                <option value="Sampath Bank">Sampath Bank</option>
                <option value="Commercial Bank">Commercial Bank</option>
                <option value="HNB">HNB</option>
                <option value="BOC">BOC</option>
                <option value="NSB">NSB</option>
                <option value="DFCC">DFCC</option>
                <option value="Other">Other</option>
              </select>
              {formErrors.bankName && (
                <p className="text-red-500 text-sm mt-1">{formErrors.bankName}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Account Number *
              </label>
              <input
                type="text"
                name="accountNumber"
                value={paymentForm.accountNumber}
                onChange={handleInputChange}
                placeholder="1234567890"
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
                  formErrors.accountNumber ? "border-red-500" : "border-gray-300"
                }`}
              />
              {formErrors.accountNumber && (
                <p className="text-red-500 text-sm mt-1">{formErrors.accountNumber}</p>
              )}
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-blue-800">
                <span className="font-semibold">Note:</span> Please transfer the exact amount to the following account:
              </p>
              <p className="text-sm text-gray-600 mt-1">
                Account: 123-456-7890<br />
                Bank: Sample Bank<br />
                Reference: Order #{Math.floor(Math.random() * 10000)}
              </p>
            </div>
          </div>
        );

      case "MOBILE_PAYMENT":
        return (
          <div className="space-y-4 mt-6">
            <h3 className="font-semibold text-lg">Mobile Payment Details</h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Mobile Provider *
              </label>
              <select
                name="mobileProvider"
                value={paymentForm.mobileProvider}
                onChange={handleInputChange}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
                  formErrors.mobileProvider ? "border-red-500" : "border-gray-300"
                }`}
              >
                <option value="">Select Provider</option>
                <option value="Dialog">Dialog</option>
                <option value="Mobitel">Mobitel</option>
                <option value="Airtel">Airtel</option>
                <option value="Hutch">Hutch</option>
              </select>
              {formErrors.mobileProvider && (
                <p className="text-red-500 text-sm mt-1">{formErrors.mobileProvider}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Mobile Number *
              </label>
              <input
                type="tel"
                name="mobileNumber"
                value={paymentForm.mobileNumber}
                onChange={handleInputChange}
                placeholder="0712345678"
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
                  formErrors.mobileNumber ? "border-red-500" : "border-gray-300"
                }`}
              />
              {formErrors.mobileNumber && (
                <p className="text-red-500 text-sm mt-1">{formErrors.mobileNumber}</p>
              )}
            </div>

            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-sm text-green-800">
                You will receive a confirmation SMS on your mobile phone.
              </p>
            </div>
          </div>
        );

      case "CASH_ON_DELIVERY":
        return (
          <div className="mt-6 bg-yellow-50 p-4 rounded-lg">
            <p className="text-sm text-yellow-800">
              <span className="font-semibold">✓</span> You have selected Cash on Delivery.
            </p>
            <p className="text-sm text-gray-600 mt-1">
              Please keep the exact amount ready when the delivery arrives.
            </p>
          </div>
        );

      default:
        return null;
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
              <h2 className="mt-6 text-2xl font-bold text-gray-900">
                Payment Successfully
              </h2>
              <p className="mt-3 text-sm text-gray-600">
                Your order has been saved to the database. Redirecting you to My Orders...
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-6xl mx-auto mb-6">
  <button
    onClick={() => navigate(-1)}
    className="flex items-center gap-2 text-black hover:text-orange-600 font-semibold cursor-pointer"
  >
    <FaArrowLeft />
    Back to Cart
  </button>
</div>
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* LEFT SIDE - PAYMENT METHODS */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm">
          <h2 className="text-2xl font-bold mb-6">Select Payment Method</h2>

        <div className="space-y-4">

  {/* Credit Card */}
  <label className="flex items-center gap-3 border p-4 rounded-xl cursor-pointer hover:border-orange-500 transition-colors">
    <input
      type="radio"
      name="payment"
      value="CREDIT_CARD"
      checked={paymentMethod === "CREDIT_CARD"}
      onChange={() => handlePaymentMethodChange("CREDIT_CARD")}
      className="w-4 h-4 text-orange-500"
    />

    <FaCreditCard className="text-3xl text-blue-600" />

    <span className="text-lg font-medium">
      Credit / Debit Card
    </span>
  </label>

  {/* Bank Transfer */}
  <label className="flex items-center gap-3 border p-4 rounded-xl cursor-pointer hover:border-orange-500 transition-colors">
    <input
      type="radio"
      name="payment"
      value="BANK_TRANSFER"
      checked={paymentMethod === "BANK_TRANSFER"}
      onChange={() => handlePaymentMethodChange("BANK_TRANSFER")}
      className="w-4 h-4 text-orange-500"
    />

    <FaUniversity className="text-3xl text-green-600" />

    <span className="text-lg font-medium">
      Bank Transfer
    </span>
  </label>

  {/* Mobile Payment */}
  <label className="flex items-center gap-3 border p-4 rounded-xl cursor-pointer hover:border-orange-500 transition-colors">
    <input
      type="radio"
      name="payment"
      value="MOBILE_PAYMENT"
      checked={paymentMethod === "MOBILE_PAYMENT"}
      onChange={() => handlePaymentMethodChange("MOBILE_PAYMENT")}
      className="w-4 h-4 text-orange-500"
    />

    <FaMobileAlt className="text-3xl text-purple-600" />

    <span className="text-lg font-medium">
      Mobile Payment
    </span>
  </label>

  {/* Cash on Delivery */}
  <label className="flex items-center gap-3 border p-4 rounded-xl cursor-pointer hover:border-orange-500 transition-colors">
    <input
      type="radio"
      name="payment"
      value="CASH_ON_DELIVERY"
      checked={paymentMethod === "CASH_ON_DELIVERY"}
      onChange={() => handlePaymentMethodChange("CASH_ON_DELIVERY")}
      className="w-4 h-4 text-orange-500"
    />

    <FaMoneyBillWave className="text-3xl text-orange-500" />

    <span className="text-lg font-medium">
      Cash on Delivery
    </span>
  </label>

</div>

          {/* Payment Form */}
          {renderPaymentForm()}

          <button
            onClick={handlePayment}
            disabled={loading}
            className={`w-full mt-8 text-white font-bold py-3 rounded-xl transition-all
              ${loading 
                ? "bg-gray-400 cursor-not-allowed" 
                : "bg-orange-500 hover:bg-orange-600 shadow-lg hover:shadow-orange-200"
              }`}
          >
            {loading ? (
              <>
                <svg className="animate-spin h-5 w-5 mr-3 inline" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Processing...
              </>
            ) : (
              `Pay Rs. ${total.toFixed(2)}`
            )}
          </button>
        </div>

        {/* RIGHT SIDE - ORDER SUMMARY */}
        <div className="bg-white p-6 rounded-2xl shadow-md h-fit sticky top-6">
          <h2 className="text-xl font-bold mb-5">Order Summary</h2>

          <div className="space-y-3 text-gray-700">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>Rs. {subtotal.toFixed(2)}</span>
            </div>

            <div className="flex justify-between">
              <span>Delivery Fee</span>
              <span>Rs. {deliveryFee.toFixed(2)}</span>
            </div>

            <div className="flex justify-between text-green-600">
              <span>Discount</span>
              <span>- Rs. 0.00</span>
            </div>

            <hr className="my-2" />

            <div className="flex justify-between text-lg font-bold">
              <span>Total</span>
              <span className="text-orange-500">
                Rs. {total.toFixed(2)}
              </span>
            </div>
          </div>

          {/* Items preview */}
          <div className="mt-6">
            <h3 className="font-semibold mb-3">Items ({cartItems.length})</h3>

            <div className="max-h-40 overflow-y-auto space-y-2 pr-2">
              {cartItems.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between text-sm text-gray-600 border-b pb-2"
                >
                  <span className="truncate max-w-[60%]">
                    {item.foodName || item.juiceName || item.name} × {item.quantity}
                  </span>
                  <span className="font-medium">
                    Rs. {(item.quantity * item.price).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Delivery info */}
          <div className="mt-4 pt-4 border-t">
            <p className="text-sm text-gray-500">
              Payment Method: {paymentMethod.replace('_', ' ')}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Order will be confirmed after payment verification
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Payment;