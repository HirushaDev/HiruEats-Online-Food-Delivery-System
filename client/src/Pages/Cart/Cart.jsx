import React, { useEffect, useState, useContext } from "react";
import { FiMinus, FiPlus, FiTrash2, FiArrowLeft, FiShoppingCart } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { AppContext } from "../../Context/AppContext";
import { AppConstants } from "../../Util/constants";

const Cart = () => {
  const navigate = useNavigate();
  const { cart, addToCart, removeFromCart, deleteFromCart } = useContext(AppContext);
  const BACKEND_URL = AppConstants.BACKEND_API_BASE_URL;

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllItems = async () => {
      try {
        setLoading(true);
        // Fetch foods and juices in parallel
        const [foodsRes, juicesRes] = await Promise.allSettled([
          axios.get(`${BACKEND_URL}/hirueats/foods`),
          axios.get(`${BACKEND_URL}/hirueats/juices`)
        ]);

        let allFetched = [];
        if (foodsRes.status === "fulfilled") {
          allFetched = [...allFetched, ...foodsRes.value.data.map(item => ({ ...item, isFood: true }))];
        }
        if (juicesRes.status === "fulfilled") {
          allFetched = [...allFetched, ...juicesRes.value.data.map(item => ({ ...item, isJuice: true }))];
        }

        setItems(allFetched);
      } catch (error) {
        console.error("Error fetching items:", error);
        toast.error("Failed to load cart items details.");
      } finally {
        setLoading(false);
      }
    };

    fetchAllItems();
  }, [BACKEND_URL]);

  const getImageUrl = (imageUrl) => {
    if (!imageUrl) return null;
    if (imageUrl.startsWith("http")) return imageUrl;
    return `${BACKEND_URL}${imageUrl}`;
  };

  const getFinalPrice = (item) => {
    if (item.discount > 0) {
      return (item.price - (item.price * item.discount) / 100);
    }
    return item.price;
  };

  // Filter items that are in the cart
  const cartItems = items
    .map((item) => {
      const cartKey = item.isFood ? `food-${item.id}` : `juice-${item.id}`;
      return {
        ...item,
        cartKey,
        quantity: cart[cartKey] || 0
      };
    })
    .filter((item) => item.quantity > 0);

  // Calculations
  const subtotal = cartItems.reduce(
    (sum, item) => sum + getFinalPrice(item) * item.quantity,
    0
  );
  
  const deliveryFee = subtotal > 0 ? 250 : 0;
  const total = subtotal + deliveryFee;

  const handleDecreaseQuantity = (item) => {
    if (item.quantity === 1) {
      deleteFromCart(item.cartKey);
      toast.info(`${item.foodName || item.juiceName} removed from cart`);
    } else {
      removeFromCart(item.cartKey);
    }
  };

  const handleIncreaseQuantity = (item) => {
    addToCart(item.cartKey);
  };

  const handleDeleteItem = (item) => {
    deleteFromCart(item.cartKey);
    toast.info(`${item.foodName || item.juiceName} removed from cart`);
  };

 const handleCheckout = () => {
  toast.success("Proceeding to checkout...");

  navigate("/payment", {
    state: {
      cartItems,
      subtotal,
      deliveryFee,
      total,
    },
  });
};

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-500 font-medium">Loading your cart...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* BACK LINK */}
        <button
          onClick={() => navigate("/user-home")}
          className="mb-8 flex items-center gap-2 text-gray-600 hover:text-orange-500 font-semibold transition cursor-pointer"
        >
          <FiArrowLeft className="text-lg" />
          <span>Back to Menu</span>
        </button>

        <h1 className="text-3xl font-black text-gray-900 mb-8 tracking-tight">Shopping Cart</h1>

        {cartItems.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center shadow-sm max-w-lg mx-auto flex flex-col items-center">
            <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center text-orange-500 mb-6">
              <FiShoppingCart className="text-4xl" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
            <p className="text-gray-500 mb-8">Add delicious foods and refreshing juices from our menu to start your order.</p>
            <button
              onClick={() => navigate("/user-home")}
              className="bg-orange-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-orange-600 shadow-md shadow-orange-500/20 hover:shadow-orange-600/35 transition cursor-pointer"
            >
              Explore Menu
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {/* CART ITEMS LIST */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl border border-gray-200 p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm hover:shadow-md transition duration-300"
                >
                  {/* IMAGE AND DETAILS */}
                  <div className="flex items-center gap-4 w-full sm:w-auto">
                    <div className="w-20 h-20 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0">
                      {getImageUrl(item.imageUrl) ? (
                        <img
                          src={getImageUrl(item.imageUrl)}
                          alt={item.foodName || item.juiceName}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                          No Image
                        </div>
                      )}
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-gray-800 line-clamp-1">
                        {item.foodName || item.juiceName}
                      </h3>
                      <p className="text-sm text-green-600 font-medium bg-green-50 px-2 py-0.5 rounded-full w-fit mt-1">
                        {item.category}
                      </p>
                      <div className="mt-2 flex items-baseline gap-2">
                        <span className="text-orange-500 font-bold text-base">
                          Rs. {getFinalPrice(item).toFixed(2)}
                        </span>
                        {item.discount > 0 && (
                          <span className="text-gray-400 line-through text-xs">
                            Rs. {item.price.toFixed(2)}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* CONTROLS */}
                  <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto border-t sm:border-t-0 pt-3 sm:pt-0">
                    <div className="flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-xl p-1">
                      <button
                        onClick={() => handleDecreaseQuantity(item)}
                        className="p-2 text-gray-500 hover:text-orange-500 hover:bg-white rounded-lg transition cursor-pointer"
                      >
                        <FiMinus className="text-sm" />
                      </button>
                      <span className="w-8 text-center font-bold text-gray-800">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => handleIncreaseQuantity(item)}
                        className="p-2 text-gray-500 hover:text-orange-500 hover:bg-white rounded-lg transition cursor-pointer"
                      >
                        <FiPlus className="text-sm" />
                      </button>
                    </div>

                    <div className="flex items-center gap-4">
                      <span className="font-bold text-gray-900 text-lg min-w-[90px] text-right">
                        Rs. {(getFinalPrice(item) * item.quantity).toFixed(2)}
                      </span>
                      <button
                        onClick={() => handleDeleteItem(item)}
                        className="p-2.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition cursor-pointer"
                        title="Remove item"
                      >
                        <FiTrash2 className="text-lg" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* ORDER SUMMARY */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>

              <div className="space-y-4">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-semibold text-gray-900">Rs. {subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Delivery Fee</span>
                  <span className="font-semibold text-gray-900">Rs. {deliveryFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Discount</span>
                  <span className="font-semibold text-green-600">- Rs. 0.00</span>
                </div>

                <hr className="border-gray-100 my-4" />

                <div className="flex justify-between text-lg font-bold text-gray-900">
                  <span>Total</span>
                  <span className="text-orange-500 text-xl">Rs. {total.toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full mt-8 bg-orange-500 text-white py-3.5 px-4 rounded-xl font-bold hover:bg-orange-600 shadow-lg shadow-orange-500/20 hover:shadow-orange-600/35 transition cursor-pointer"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
