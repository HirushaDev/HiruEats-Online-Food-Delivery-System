import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { AppConstants } from "../../Util/constants";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { TbTruckDelivery } from "react-icons/tb";
import { FiCheck } from "react-icons/fi";

const MyOrders = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const loadOrders = async () => {
      const token = localStorage.getItem("token");
      const userStr = localStorage.getItem("user");

      if (!token || !userStr) {
        toast.error("Please login to view your orders");
        navigate("/login");
        return;
      }

      try {
        const userData = JSON.parse(userStr);
        const currentUserId = userData.id || userData.userId || userData.user_id;

        if (!currentUserId) {
          throw new Error("User ID not found");
        }

        setUserId(currentUserId);

        const response = await axios.get(
          `${AppConstants.BACKEND_API_BASE_URL}/hirueats/orders/user/${currentUserId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setOrders(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error("Failed to load orders:", error);
        toast.error("Could not load your orders");
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, [navigate]);

  const getStatusClasses = (status) => {
    switch ((status || "").toUpperCase()) {
      case "SHIPPED":
        return "bg-blue-100 text-blue-700 shadow-sm ring-1 ring-blue-600/20";
      case "APPROVED":
        return "bg-emerald-100 text-emerald-700 shadow-sm ring-1 ring-emerald-600/20";
      case "REJECTED":
        return "bg-rose-100 text-rose-700 shadow-sm ring-1 ring-rose-600/20";
      case "PENDING":
      default:
        return "bg-amber-100 text-amber-700 shadow-sm ring-1 ring-amber-600/20";
    }
  };

  const getTimelineState = (stepIndex, status) => {
    const normalizedStatus = (status || "PENDING").toUpperCase();
    const stepOrder = ["PENDING", "APPROVED", "SHIPPED", "DELIVERED"];
    const currentIndex = stepOrder.indexOf(normalizedStatus);
    const resolvedIndex = currentIndex === -1 ? 0 : currentIndex;

    if (stepIndex < resolvedIndex) {
      return "completed";
    }

    if (stepIndex === resolvedIndex) {
      return "current";
    }

    return "future";
  };

  const renderTrackingTimeline = (orderStatus) => {
    const steps = [
      { label: "Pending", value: "PENDING" },
      { label: "Approved", value: "APPROVED" },
      { label: "Shipped", value: "SHIPPED" },
      { label: "Delivered", value: "DELIVERED" },
    ];

    return (
      <div className="mt-5 rounded-2xl border border-gray-200 bg-gray-50/80 p-4">
        <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-gray-900">
          <TbTruckDelivery className="text-lg text-blue-600" />
          Delivery Tracking
        </div>

        <div className="grid gap-3 sm:grid-cols-4">
          {steps.map((step, index) => {
            const state = getTimelineState(index, orderStatus);
            const isCompleted = state === "completed";
            const isCurrent = state === "current";

            return (
              <motion.div
                key={step.value}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, delay: index * 0.05 }}
                className={`rounded-xl border px-3 py-3 text-center transition-all ${
                  isCompleted
                    ? "border-emerald-200 bg-emerald-50"
                    : isCurrent
                      ? "border-blue-300 bg-blue-50 shadow-sm"
                      : "border-gray-200 bg-white"
                }`}
              >
                <div className="mb-2 flex justify-center">
                  <span
                    className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold transition-all ${
                      isCompleted
                        ? "bg-emerald-500 text-white"
                        : isCurrent
                          ? step.value === "SHIPPED"
                            ? "bg-blue-500 text-white"
                            : "bg-orange-500 text-white"
                          : "bg-gray-200 text-gray-500"
                    }`}
                  >
                    {isCompleted ? <FiCheck className="text-base" /> : index + 1}
                  </span>
                </div>

                <p
                  className={`text-sm font-semibold transition-colors ${
                    isCompleted
                      ? "text-emerald-700"
                      : isCurrent
                        ? step.value === "SHIPPED"
                          ? "text-blue-700"
                          : "text-orange-700"
                        : "text-gray-400"
                  }`}
                >
                  {step.label}
                </p>

                <p className="mt-1 text-xs text-gray-500">
                  {isCompleted ? "Completed" : isCurrent ? "Current step" : "Pending"}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    );
  };

  // ─── PROFESSIONAL PDF GENERATION ────────────────────────────────────────────
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
     addLine("Date", savedOrder.createdAt ? new Date(savedOrder.createdAt).toLocaleString() : "-");
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
 

  // ─── RENDER ────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 via-white to-orange-50 px-6 py-10">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 rounded-3xl border border-orange-100 bg-white/80 p-6 shadow-xl shadow-orange-100/50 backdrop-blur-sm"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-orange-500"></p>
          <h1 className="mt-2 bg-linear-to-r from-orange-600 to-amber-500 bg-clip-text text-3xl font-black text-transparent md:text-4xl">
            My Orders
          </h1>
          <p className="mt-3 max-w-2xl text-sm text-gray-600">
            {location.state?.justPlacedOrder
              ? "Your payment was successful and the order is now saved."
              : "Review every order saved under your account."}
          </p>
          {userId && (
            <p className="mt-4 inline-flex rounded-full border border-orange-200 bg-orange-50 px-4 py-2 text-xs font-semibold text-orange-700">
              User ID: {userId}
            </p>
          )}
        </motion.div>

        {loading ? (
          <div className="flex min-h-80 items-center justify-center rounded-3xl border-2 border-dashed border-orange-300 bg-white/50 backdrop-blur-sm">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-orange-500 border-t-transparent" />
          </div>
        ) : orders.length === 0 ? (
          <div className="rounded-3xl border border-gray-200 bg-white p-12 text-center shadow-lg shadow-gray-200/50">
            <h2 className="text-xl font-bold text-gray-900">No orders yet</h2>
            <p className="mt-2 text-gray-600">
              Your orders will appear here after checkout.
            </p>
            <button
              onClick={() => navigate("/user-home")}
              className="mt-6 rounded-full bg-linear-to-r from-orange-500 to-amber-500 px-8 py-3 font-semibold text-white shadow-lg shadow-orange-500/30 transition-all hover:scale-105 hover:shadow-orange-500/50"
            >
              Back to Home
            </button>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2">
            {orders.map((order, index) => (
              <motion.div
                key={order.id ?? index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
                className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-md shadow-gray-200/60 transition-all hover:-translate-y-1 hover:shadow-2xl hover:shadow-orange-100/70"
              >
                <div className="flex items-start justify-between gap-4 border-b border-orange-50 bg-linear-to-r from-orange-50/50 to-transparent p-6">
                  <div>
                    <p className="text-sm font-semibold text-orange-500">
                      Order #{order.id}
                    </p>
                    <div className="mt-1 flex flex-wrap items-center gap-3">
                      <h2 className="text-xl font-bold text-gray-900">
                        Rs. {Number(order.total || 0).toFixed(2)}
                      </h2>
                      <span
                        className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${getStatusClasses(
                          order.status
                        )}`}
                      >
                        {(order.status || "PENDING").toUpperCase() === "SHIPPED" ? (
                          <TbTruckDelivery className="text-sm" />
                        ) : null}
                        {order.status || "PENDING"}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-gray-500">
                      {order.createdAt
                        ? new Date(order.createdAt).toLocaleString()
                        : "Date unavailable"}
                    </p>
                  </div>
                </div>

                <div className="space-y-4 p-6">
                  <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                    <div className="rounded-2xl bg-gray-50 p-4 ring-1 ring-gray-200/50">
                      <p className="text-xs uppercase tracking-widest text-gray-400">
                        Payment Method
                      </p>
                      <p className="mt-1 font-semibold text-gray-900">
                        {order.paymentMethod || "N/A"}
                      </p>
                    </div>
                    <div className="rounded-2xl bg-gray-50 p-4 ring-1 ring-gray-200/50">
                      <p className="text-xs uppercase tracking-widest text-gray-400">
                        Delivery Fee
                      </p>
                      <p className="mt-1 font-semibold text-gray-900">
                        Rs. {Number(order.deliveryFee || 0).toFixed(2)}
                      </p>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-gray-900">Items</p>
                    <div className="mt-3 space-y-3">
                      {(order.items || []).map((item, itemIndex) => (
                        <div
                          key={`${order.id}-item-${itemIndex}`}
                          className="flex items-center justify-between rounded-2xl bg-gray-50/80 px-4 py-3 transition-colors hover:bg-gray-100/80"
                        >
                          <div>
                            <p className="font-semibold text-gray-900">
                              {item.itemName || "Unknown item"}
                            </p>
                            <p className="text-xs text-gray-500">
                              Qty {item.quantity || 0} x Rs.{" "}
                              {Number(item.price || 0).toFixed(2)}
                            </p>
                          </div>
                          <p className="font-semibold text-gray-900">
                            Rs.{" "}
                            {Number(
                              (item.price || 0) * (item.quantity || 0)
                            ).toFixed(2)}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {renderTrackingTimeline(order.status)}
                </div>

                {/* ─── Download PDF button per order ─── */}
                <div className="px-6 pb-6 flex justify-end">
                  <button
                    onClick={() => generatePaymentPDF(order, order.items)}
                    className="rounded-xl bg-linear-to-r from-orange-500 to-amber-500 px-5 py-2 font-semibold text-white hover:scale-105 transition-all cursor-pointer shadow-md shadow-orange-500/30 hover:shadow-orange-500/50"
                  >
                    Download PDF
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrders;