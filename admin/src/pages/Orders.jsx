import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { AppConstants } from "../Util/constants";

const Orders = () => {
  const BACKEND_URL = AppConstants.BACKEND_API_BASE_URL;
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processingOrderId, setProcessingOrderId] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("adminToken");

      if (!token) {
        toast.error("Admin session missing. Please login again.");
        setOrders([]);
        return;
      }

      const response = await axios.get(`${BACKEND_URL}/hirueats/orders`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setOrders(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("Error fetching orders:", error);
      const message =
        error.response?.data?.message || "Failed to load orders";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (id, action) => {
    try {
      const token = localStorage.getItem("adminToken");

      if (!token) {
        toast.error("Admin session missing. Please login again.");
        return;
      }

      setProcessingOrderId(id);

      const response = await axios.put(
        `${BACKEND_URL}/hirueats/orders/${id}/${action}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === id ? { ...order, status: response.data?.status || order.status } : order
        )
      );

      toast.success(`Order #${id} ${action}d successfully`);
    } catch (error) {
      console.error(`Error trying to ${action} order:`, error);
      const message =
        error.response?.data?.message || `Failed to ${action} order`;
      toast.error(message);
    } finally {
      setProcessingOrderId(null);
    }
  };

  const getStatusClass = (status) => {
    switch ((status || "").toUpperCase()) {
      case "APPROVED":
        return "bg-[#2F9E6E]/10 text-[#2F9E6E]";
      case "REJECTED":
        return "bg-[#E64A4A]/10 text-[#E64A4A]";
      case "PENDING":
      default:
        return "bg-[#F59E0B]/10 text-[#B45309]";
    }
  };

  return (
    <div className="mx-auto max-w-7xl">
      <div className="mb-6">
        <h1 className="font-sora text-2xl font-semibold text-[#1C2321]">Orders</h1>
        <p className="mt-1 font-inter text-sm text-[#6B7280]">
          Manage customer orders from the backend database.
        </p>
      </div>

      <div className="overflow-hidden rounded-2xl border border-black/5 bg-white shadow-sm">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <p className="font-inter text-sm text-[#6B7280]">Loading orders...</p>
          </div>
        ) : orders.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <p className="font-inter text-sm text-[#6B7280]">No orders found.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-[#FF6B35] font-inter text-sm text-white">
                  <th className="p-3 text-left">Order</th>
                  <th className="p-3 text-left">User</th>
                  <th className="p-3 text-left">Created</th>
                  <th className="p-3 text-left">Payment</th>
                  <th className="p-3 text-left">Items</th>
                  <th className="p-3 text-left">Total</th>
                  <th className="p-3 text-left">Status</th>
                  <th className="p-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => {
                  const isProcessing = processingOrderId === order.id;
                  const isPending = (order.status || "").toUpperCase() === "PENDING";

                  return (
                    <tr
                      key={order.id}
                      className="border-b border-black/5 font-inter text-sm text-[#1C2321] transition-colors hover:bg-[#FAF7F2]"
                    >
                      <td className="p-3 font-semibold">#{order.id}</td>
                      <td className="p-3 text-[#6B7280]">{order.userId || "-"}</td>
                      <td className="p-3 text-[#6B7280]">
                        {order.createdAt
                          ? new Date(order.createdAt).toLocaleString()
                          : "-"}
                      </td>
                      <td className="p-3 text-[#6B7280]">{order.paymentMethod || "-"}</td>
                      <td className="p-3">
                        <div className="max-w-xs space-y-1">
                          {(order.items || []).length > 0 ? (
                            order.items.map((item, idx) => (
                              <p key={`${order.id}-${idx}`} className="truncate text-xs text-[#374151]">
                                {item.itemName} x {item.quantity}
                              </p>
                            ))
                          ) : (
                            <p className="text-xs text-[#9CA3AF]">No items</p>
                          )}
                        </div>
                      </td>
                      <td className="p-3 font-mono">Rs. {Number(order.total || 0).toFixed(2)}</td>
                      <td className="p-3">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-medium ${getStatusClass(order.status)}`}
                        >
                          {order.status || "PENDING"}
                        </span>
                      </td>
                      <td className="p-3">
                        <div className="flex justify-center gap-2">
                          <button
                            type="button"
                            disabled={!isPending || isProcessing}
                            onClick={() => updateOrderStatus(order.id, "approve")}
                            className="rounded-lg bg-[#2F9E6E] px-3 py-1 text-xs font-semibold text-white transition hover:bg-[#26875c] disabled:cursor-not-allowed disabled:bg-gray-300"
                          >
                            {isProcessing ? "..." : "Approve"}
                          </button>
                          <button
                            type="button"
                            disabled={!isPending || isProcessing}
                            onClick={() => updateOrderStatus(order.id, "reject")}
                            className="rounded-lg bg-[#E64A4A] px-3 py-1 text-xs font-semibold text-white transition hover:bg-[#cc3d3d] disabled:cursor-not-allowed disabled:bg-gray-300"
                          >
                            {isProcessing ? "..." : "Reject"}
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
