import React, { useState, useEffect } from "react";
import {
  FiTrash2,
  FiRefreshCw,
  FiCheckCircle,
  FiSlash,
  FiShield,
  FiUser,
} from "react-icons/fi";
import axios from "axios";
import { toast } from "react-toastify";
import { AppConstants } from "../Util/constants";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const BACKEND_URL = AppConstants.BACKEND_API_BASE_URL;

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("adminToken");
      const res = await axios.get(`${BACKEND_URL}/api/admin/users`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      setUsers(res.data);
    } catch (err) {
      console.error("Error fetching users:", err);
      toast.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  const handleToggleStatus = async (userId, currentStatus, userName) => {
    const action = currentStatus ? "activate" : "disable";
    if (
      !window.confirm(
        `Are you sure you want to ${action} "${userName}"?`
      )
    )
      return;

    try {
      const token = localStorage.getItem("adminToken");
      const { data } = await axios.patch(
        `${BACKEND_URL}/api/admin/users/${userId}/toggle-status`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );

      // Update local state
      setUsers((prev) =>
        prev.map((u) =>
          u.id === userId ? { ...u, ...data.user } : u
        )
      );

      toast.success(data.message);
    } catch (err) {
      console.error("Error toggling user status:", err);
      toast.error(err.response?.data?.message || "Failed to update user status");
    }
  };

  const handleDelete = async (userId, userName) => {
    if (
      !window.confirm(
        `Are you sure you want to permanently delete "${userName}"? This cannot be undone.`
      )
    )
      return;

    try {
      const token = localStorage.getItem("adminToken");
      await axios.delete(`${BACKEND_URL}/api/admin/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });

      setUsers((prev) => prev.filter((u) => u.id !== userId));
      toast.success(`"${userName}" deleted successfully`);
    } catch (err) {
      console.error("Error deleting user:", err);
      toast.error(err.response?.data?.message || "Failed to delete user");
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "—";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="mx-auto max-w-6xl">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-sora text-2xl font-semibold text-[#1C2321]">
            User Management
          </h1>
          <p className="mt-1 font-inter text-sm text-[#6B7280]">
            Manage registered users — activate, disable, or delete accounts.
          </p>
        </div>
        <button
          onClick={fetchUsers}
          disabled={loading}
          className="flex items-center gap-2 rounded-lg border border-black/10 px-3 py-2 font-inter text-sm font-medium text-[#1C2321] transition-colors hover:bg-[#FAF7F2] disabled:opacity-50"
        >
          <FiRefreshCw
            size={14}
            className={loading ? "animate-spin" : ""}
          />
          Refresh
        </button>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-2xl border border-black/5 bg-white shadow-sm">
        {loading && users.length === 0 ? (
          <div className="flex items-center justify-center py-20">
            <p className="font-inter text-sm text-[#6B7280]">
              Loading users...
            </p>
          </div>
        ) : users.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <FiUser size={40} className="text-[#6B7280]/30" />
            <p className="mt-3 font-inter text-sm text-[#6B7280]">
              No users found.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-[#FF6B35] font-inter text-sm text-white">
                  <th className="p-3 text-left">Name</th>
                  <th className="p-3 text-left">Email</th>
                  <th className="p-3 text-left">Role</th>
                  <th className="p-3 text-left">Verified</th>
                  <th className="p-3 text-left">Status</th>
                  <th className="p-3 text-left">Joined</th>
                  <th className="p-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => {
                  const isDisabled = user.isAccountDisabled;
                  return (
                    <tr
                      key={user.id}
                      className={`border-b border-black/5 font-inter text-sm text-[#1C2321] transition-colors hover:bg-[#FAF7F2] ${
                        isDisabled ? "opacity-60" : ""
                      }`}
                    >
                      <td className="p-3 font-medium">{user.name}</td>
                      <td className="p-3 text-[#6B7280]">{user.email}</td>
                      <td className="p-3">
                        <span
                          className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium ${
                            user.role === "ADMIN"
                              ? "bg-purple-100 text-purple-700"
                              : "bg-blue-100 text-blue-700"
                          }`}
                        >
                          {user.role === "ADMIN" && <FiShield size={12} />}
                          {user.role}
                        </span>
                      </td>
                      <td className="p-3">
                        <span
                          className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                            user.isAccountVerified
                              ? "bg-[#2F9E6E]/10 text-[#2F9E6E]"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {user.isAccountVerified ? "Verified" : "Unverified"}
                        </span>
                      </td>
                      <td className="p-3">
                        <span
                          className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                            isDisabled
                              ? "bg-[#E64A4A]/10 text-[#E64A4A]"
                              : "bg-[#2F9E6E]/10 text-[#2F9E6E]"
                          }`}
                        >
                          {isDisabled ? "Disabled" : "Active"}
                        </span>
                      </td>
                      <td className="p-3 text-[#6B7280]">
                        {formatDate(user.createdAt)}
                      </td>
                      <td className="p-3">
                        <div className="flex justify-center gap-2">
                          {/* Toggle Activate / Disable */}
                          <button
                            onClick={() =>
                              handleToggleStatus(
                                user.id,
                                isDisabled,
                                user.name
                              )
                            }
                            title={isDisabled ? "Activate account" : "Disable account"}
                            className={`rounded-lg p-1.5 transition-colors ${
                              isDisabled
                                ? "text-[#2F9E6E] hover:bg-green-50"
                                : "text-yellow-600 hover:bg-yellow-50"
                            }`}
                          >
                            {isDisabled ? (
                              <FiCheckCircle size={16} />
                            ) : (
                              <FiSlash size={16} />
                            )}
                          </button>

                          {/* Delete */}
                          <button
                            onClick={() => handleDelete(user.id, user.name)}
                            title="Delete user"
                            className="rounded-lg p-1.5 text-red-600 transition-colors hover:bg-red-50"
                          >
                            <FiTrash2 size={16} />
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

export default UserManagement;
