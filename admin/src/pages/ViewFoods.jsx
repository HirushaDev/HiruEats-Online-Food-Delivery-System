import React, { useState, useEffect } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import axios from "axios";
import { toast } from "react-toastify";
import { AppConstants } from "../Util/constants";

const ViewFoods = () => {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const BACKEND_URL = AppConstants.BACKEND_API_BASE_URL;

  useEffect(() => {
    fetchFoods();
  }, []);

  const fetchFoods = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      const response = await axios.get(
        `${BACKEND_URL}/hirueats/foods`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setFoods(response.data);
    } catch (error) {
      console.error("Error fetching foods:", error);
      toast.error("Failed to load food items");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, foodName) => {
    if (!window.confirm(`Are you sure you want to delete "${foodName}"?`)) return;
    try {
      const token = localStorage.getItem("adminToken");
      await axios.delete(
        `${BACKEND_URL}/hirueats/foods/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setFoods((prev) => prev.filter((f) => f.id !== id));
      toast.success(`"${foodName}" deleted successfully`);
    } catch (error) {
      console.error("Error deleting food:", error);
      toast.error("Failed to delete food item");
    }
  };

  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-6">
        <h1 className="font-sora text-2xl font-semibold text-[#1C2321]">
          Food Items
        </h1>
        <p className="mt-1 font-inter text-sm text-[#6B7280]">
          Manage all listed food items on the menu.
        </p>
      </div>

      <div className="overflow-hidden rounded-2xl border border-black/5 bg-white shadow-sm">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <p className="font-inter text-sm text-[#6B7280]">Loading food items...</p>
          </div>
        ) : foods.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <p className="font-inter text-sm text-[#6B7280]">No food items found.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-[#FF6B35] font-inter text-sm text-white">
                  <th className="p-3 text-left">Image</th>
                  <th className="p-3 text-left">Food Name</th>
                  <th className="p-3 text-left">Category</th>
                  <th className="p-3 text-left">Price</th>
                  <th className="p-3 text-left">Discount</th>
                  <th className="p-3 text-left">Status</th>
                  <th className="p-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {foods.map((food) => (
                  <tr
                    key={food.id}
                    className="border-b border-black/5 font-inter text-sm text-[#1C2321] transition-colors hover:bg-[#FAF7F2]"
                  >
                    <td className="p-3">
                      {food.imageUrl ? (
                        <img
                          src={`${BACKEND_URL}${food.imageUrl}`}
                          alt={food.foodName}
                          className="h-14 w-14 rounded-lg object-cover"
                        />
                      ) : (
                        <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-[#FAF7F2] text-xs text-[#6B7280]">
                          No img
                        </div>
                      )}
                    </td>
                    <td className="p-3 font-medium">{food.foodName}</td>
                    <td className="p-3 text-[#6B7280]">{food.category}</td>
                    <td className="p-3 font-mono">Rs. {food.price?.toFixed(2)}</td>
                    <td className="p-3 font-mono">
                      {food.discount ? `${food.discount}%` : "—"}
                    </td>
                    <td className="p-3">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${
                          food.available
                            ? "bg-[#2F9E6E]/10 text-[#2F9E6E]"
                            : "bg-[#E64A4A]/10 text-[#E64A4A]"
                        }`}
                      >
                        {food.available ? "Available" : "Unavailable"}
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
                          onClick={() => handleDelete(food.id, food.foodName)}
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

export default ViewFoods;