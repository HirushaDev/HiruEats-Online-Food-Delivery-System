import React, { useState, useEffect } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import axios from "axios";
import { toast } from "react-toastify";
import { AppConstants } from "../Util/constants";

const ViewJuices = () => {
  const [juice, setJuice] = useState([]);
  const [loading, setLoading] = useState(true);
  const BACKEND_URL = AppConstants.BACKEND_API_BASE_URL;

  useEffect(() => {
    fetchJuices();
  }, []);

  const fetchJuices = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      const response = await axios.get(
        `${BACKEND_URL}/hirueats/juices`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setJuice(response.data);
    } catch (error) {
      console.error("Error fetching juices:", error);
      toast.error("Failed to load juices items");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, juiceName) => {
    if (!window.confirm(`Are you sure you want to delete "${juiceName}"?`)) return;
    try {
      const token = localStorage.getItem("adminToken");
      await axios.delete(
        `${BACKEND_URL}/hirueats/juices/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setJuice((prev) => prev.filter((f) => f.id !== id));
      toast.success(`"${juiceName}" deleted successfully`);
    } catch (error) {
      console.error("Error deleting juice item:", error);
      toast.error("Failed to delete juice item");
    }
  };

  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-6">
        <h1 className="font-sora text-2xl font-semibold text-[#1C2321]">
          Juice Items
        </h1>
        <p className="mt-1 font-inter text-sm text-[#6B7280]">
          Manage all listed juice items on the menu.
        </p>
      </div>

      <div className="overflow-hidden rounded-2xl border border-black/5 bg-white shadow-sm">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <p className="font-inter text-sm text-[#6B7280]">Loading juice items...</p>
          </div>
        ) : juice.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <p className="font-inter text-sm text-[#6B7280]">No juice items found.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-[#FF6B35] font-inter text-sm text-white">
                  <th className="p-3 text-left">Image</th>
                  <th className="p-3 text-left">Juice Name</th>
                  <th className="p-3 text-left">Category</th>
                  <th className="p-3 text-left">Price</th>
                  <th className="p-3 text-left">Discount</th>
                  <th className="p-3 text-left">Status</th>
                  <th className="p-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {juice.map((juice) => (
                  <tr
                    key={juice.id}
                    className="border-b border-black/5 font-inter text-sm text-[#1C2321] transition-colors hover:bg-[#FAF7F2]"
                  >
                    <td className="p-3">
                      {juice.imageUrl ? (
                        <img
                          src={`${BACKEND_URL}${juice.imageUrl}`}
                          alt={juice.juiceName}
                          className="h-14 w-14 rounded-lg object-cover"
                        />
                      ) : (
                        <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-[#FAF7F2] text-xs text-[#6B7280]">
                          No img
                        </div>
                      )}
                    </td>
                    <td className="p-3 font-medium">{juice.juiceName}</td>
                    <td className="p-3 text-[#6B7280]">{juice.category}</td>
                    <td className="p-3 font-mono">Rs. {juice.price?.toFixed(2)}</td>
                    <td className="p-3 font-mono">
                      {juice.discount ? `${juice.discount}%` : "—"}
                    </td>
                    <td className="p-3">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${
                          juice.available
                            ? "bg-[#2F9E6E]/10 text-[#2F9E6E]"
                            : "bg-[#E64A4A]/10 text-[#E64A4A]"
                        }`}
                      >
                        {juice.available ? "Available" : "Unavailable"}
                      </span>
                    </td>
                    <td className="p-3">
                      <div className="flex justify-center gap-3">
                        <button
                          className="rounded-lg p-1.5 text-blue-600 transition-colors hover:bg-blue-50"
                          title="Edit"
                        >
                          <FiEdit size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(juice.id, juice.juiceName)}
                          className="rounded-lg p-1.5 text-red-600 transition-colors hover:bg-red-50"
                          title="Delete"
                        >
                          <FiTrash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewJuices;