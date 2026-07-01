import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { AppConstants } from "../../Util/constants";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

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
      case "APPROVED":
        return "bg-emerald-100 text-emerald-700 shadow-sm ring-1 ring-emerald-600/20";
      case "REJECTED":
        return "bg-rose-100 text-rose-700 shadow-sm ring-1 ring-rose-600/20";
      case "PENDING":
      default:
        return "bg-amber-100 text-amber-700 shadow-sm ring-1 ring-amber-600/20";
    }
  };

  // ─── PROFESSIONAL PDF GENERATION ────────────────────────────────────────────
  const downloadOrderPDF = (order) => {
    const doc = new jsPDF("p", "mm", "a4");
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 18;
    let y = margin;

    // ── helper: draw horizontal divider ──
    const drawDivider = (yPos, color = "#e5e7eb") => {
      doc.setDrawColor(color);
      doc.setLineWidth(0.3);
      doc.line(margin, yPos, pageWidth - margin, yPos);
    };

    // ── helper: centered text ──
    const centerText = (text, yPos, fontSize = 22, color = "#1f2937") => {
      doc.setFontSize(fontSize);
      doc.setTextColor(color);
      doc.setFont("helvetica", "bold");
      const w = doc.getTextWidth(text);
      doc.text(text, (pageWidth - w) / 2, yPos);
    };

    // ── HEADER: brand + decorative bar ──
    doc.setFillColor("#f97316");
    doc.rect(0, 0, pageWidth, 6, "F");

    // Brand name
    doc.setFontSize(24);
    doc.setTextColor("#f97316");
    doc.setFont("helvetica", "bold");
    doc.text("HiruEats", margin, y + 10);

    doc.setFontSize(10);
    doc.setTextColor("#9ca3af");
    doc.setFont("helvetica", "normal");
    doc.text("Premium Food Delivery", margin + 42, y + 10);

    // Right-aligned order ID
    doc.setFontSize(10);
    doc.setTextColor("#6b7280");
    doc.setFont("helvetica", "bold");
    const orderIdLabel = `Order #${order.id}`;
    const orderIdX = pageWidth - margin - doc.getTextWidth(orderIdLabel);
    doc.text(orderIdLabel, orderIdX, y + 10);

    y += 22;

    // ── thin divider ──
    drawDivider(y, "#f97316");
    y += 8;

    // ── ORDER SUMMARY CARD (background) ──
    const cardX = margin;
    const cardY = y;
    const cardW = pageWidth - margin * 2;
    const cardH = 50;

    doc.setFillColor("#fafafa");
    doc.setDrawColor("#f3f4f6");
    doc.roundedRect(cardX, cardY, cardW, cardH, 3, 3, "FD");

    doc.setFontSize(11);
    doc.setTextColor("#374151");
    doc.setFont("helvetica", "bold");
    doc.text("Order Summary", margin + 6, cardY + 8);

    doc.setFontSize(9);
    doc.setTextColor("#6b7280");
    doc.setFont("helvetica", "normal");

    const leftColX = margin + 6;
    const rightColX = margin + 70;

    doc.text("Date", leftColX, cardY + 22);
    doc.text(
      order.createdAt
        ? new Date(order.createdAt).toLocaleString("en-US", {
            dateStyle: "medium",
            timeStyle: "short",
          })
        : "N/A",
      rightColX,
      cardY + 22
    );

    doc.text("Status", leftColX, cardY + 32);
    const statusColor = (order.status || "").toUpperCase() === "APPROVED" ? "#059669" : "#d97706";
    doc.setTextColor(statusColor);
    doc.setFont("helvetica", "bold");
    doc.text(order.status || "PENDING", rightColX, cardY + 32);

    doc.setTextColor("#6b7280");
    doc.setFont("helvetica", "normal");
    doc.text("Payment", leftColX, cardY + 42);
    doc.setTextColor("#374151");
    doc.text(order.paymentMethod || "N/A", rightColX, cardY + 42);

    y += cardH + 10;
    drawDivider(y, "#f3f4f6");
    y += 8;

    // ── ITEMS TABLE ──
    doc.setFontSize(11);
    doc.setTextColor("#1f2937");
    doc.setFont("helvetica", "bold");
    doc.text("Order Items", margin, y);
    y += 6;

    // Build table rows
    const tableRows = (order.items || []).map((item) => {
      const qty = item.quantity || 0;
      const price = Number(item.price || 0);
      const total = price * qty;
      return [item.itemName || "Unknown item", qty, `Rs. ${price.toFixed(2)}`, `Rs. ${total.toFixed(2)}`];
    });

    autoTable(doc, {
      startY: y,
      head: [["Item", "Qty", "Unit Price", "Total"]],
      body: tableRows,
      theme: "striped",
      headStyles: {
        fillColor: "#f97316",
        textColor: "#ffffff",
        fontStyle: "bold",
        fontSize: 9,
        halign: "left",
        valign: "middle",
        cellPadding: { top: 4, bottom: 4, left: 6, right: 6 },
      },
      bodyStyles: {
        fontSize: 9,
        textColor: "#1f2937",
        cellPadding: { top: 4, bottom: 4, left: 6, right: 6 },
      },
      alternateRowStyles: {
        fillColor: "#fafafa",
      },
      columnStyles: {
        0: { cellWidth: "auto" },
        1: { cellWidth: 20, halign: "center" },
        2: { cellWidth: 35, halign: "right" },
        3: { cellWidth: 35, halign: "right" },
      },
      margin: { left: margin, right: margin },
      tableWidth: "auto",
    });

    // ── TOTALS BOX ──
    const finalY = doc.lastAutoTable.finalY + 8;

    // Draw totals box
    const boxX = pageWidth - margin - 80;
    const boxY = finalY;
    const boxW = 80;
    const boxH = 38;

    doc.setFillColor("#fef3c7");
    doc.setDrawColor("#fcd34d");
    doc.roundedRect(boxX, boxY, boxW, boxH, 3, 3, "FD");

    doc.setFontSize(9);
    doc.setTextColor("#92400e");
    doc.setFont("helvetica", "bold");

    doc.text("Delivery Fee", boxX + 6, boxY + 10);
    doc.text(`Rs. ${Number(order.deliveryFee || 0).toFixed(2)}`, boxX + boxW - 8, boxY + 10, { align: "right" });

    doc.setFontSize(11);
    doc.setTextColor("#b45309");
    doc.setFont("helvetica", "bold");
    doc.text("Grand Total", boxX + 6, boxY + 26);
    doc.text(`Rs. ${Number(order.total || 0).toFixed(2)}`, boxX + boxW - 8, boxY + 26, { align: "right" });

    y = boxY + boxH + 12;

    // ── FOOTER ──
    drawDivider(y, "#f3f4f6");
    y += 6;

    doc.setFontSize(8);
    doc.setTextColor("#9ca3af");
    doc.setFont("helvetica", "normal");
    const footerText = "Thank you for choosing HiruEats. We hope you enjoy your meal!";
    const footerW = doc.getTextWidth(footerText);
    doc.text(footerText, (pageWidth - footerW) / 2, y + 4);

    doc.setFontSize(7);
    doc.setTextColor("#d1d5db");
    const contactText = "dilshanhirusha093@gmail.com  |  +94 70 650 9048";
    const contactW = doc.getTextWidth(contactText);
    doc.text(contactText, (pageWidth - contactW) / 2, y + 12);

    // subtle bottom bar
    doc.setFillColor("#f97316");
    doc.rect(0, pageHeight - 4, pageWidth, 4, "F");

    // ── SAVE ──
    doc.save(`Order-${order.id}.pdf`);
  };

  // ─── RENDER ────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-orange-50 px-6 py-10">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 rounded-3xl border border-orange-100 bg-white/80 p-6 shadow-xl shadow-orange-100/50 backdrop-blur-sm"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-orange-500"></p>
          <h1 className="mt-2 bg-gradient-to-r from-orange-600 to-amber-500 bg-clip-text text-3xl font-black text-transparent md:text-4xl">
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
              className="mt-6 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 px-8 py-3 font-semibold text-white shadow-lg shadow-orange-500/30 transition-all hover:scale-105 hover:shadow-orange-500/50"
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
                <div className="flex items-start justify-between gap-4 border-b border-orange-50 bg-gradient-to-r from-orange-50/50 to-transparent p-6">
                  <div>
                    <p className="text-sm font-semibold text-orange-500">
                      Order #{order.id}
                    </p>
                    <h2 className="mt-1 text-xl font-bold text-gray-900">
                      Rs. {Number(order.total || 0).toFixed(2)}
                    </h2>
                    <p className="mt-1 text-sm text-gray-500">
                      {order.createdAt
                        ? new Date(order.createdAt).toLocaleString()
                        : "Date unavailable"}
                    </p>
                  </div>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusClasses(
                      order.status
                    )}`}
                  >
                    {order.status || "PENDING"}
                  </span>
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
                </div>

                {/* ─── Download PDF button per order ─── */}
                <div className="px-6 pb-6 flex justify-end">
                  <button
                    onClick={() => downloadOrderPDF(order)}
                    className="rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 px-5 py-2 font-semibold text-white hover:scale-105 transition-all cursor-pointer shadow-md shadow-orange-500/30 hover:shadow-orange-500/50"
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