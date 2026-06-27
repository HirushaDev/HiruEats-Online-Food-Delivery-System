import { useState, useRef } from "react";
import {
  FiUploadCloud,
  FiDollarSign,
  FiPercent,
  FiTag,
  FiCheckCircle,
  FiX,
} from "react-icons/fi";
import axios from "axios";
import { toast } from "react-toastify";
import { AppConstants } from "../Util/constants";

const initialState = {
  name: "",
  description: "",
  price: "",
  category: "",
  discount: "",
  available: true,
  image: null,
};
const JuiceCategories = [
  "Fresh Juice",
  "Fruit Juice",
  "Milkshake",
  "Smoothie",
  "Mojito",
  "Faluda",
];

export default function AddJuice({
  itemType = "juice",
  categories = [],
  title,
}) {
  const [form, setForm] = useState(initialState);
  const [preview, setPreview] = useState(null);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);
  const BACKEND_URL = AppConstants.BACKEND_API_BASE_URL;

  const noun = itemType === "juice" ? "Juice" : "Food";

  const update = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleImage = (file) => {
    if (!file) return;
    update("image", file);
    setPreview(URL.createObjectURL(file));
  };

  const handleDrop = (e) => {
    e.preventDefault();
    handleImage(e.dataTransfer.files?.[0]);
  };

  const removeImage = () => {
    update("image", null);
    setPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = `${noun} name is required`;
    if (!form.description.trim()) next.description = "Description is required";
    if (!form.price || Number(form.price) <= 0)
      next.price = "Enter a valid price";
    if (!form.category) next.category = "Choose a category";
    if (
      form.discount &&
      (Number(form.discount) < 0 || Number(form.discount) > 100)
    ) {
      next.discount = "Discount must be between 0 and 100";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const payload = new FormData();
    payload.append("juiceName", form.name.trim());
    payload.append("description", form.description.trim());
    payload.append("price", form.price);
    payload.append("category", form.category);
    payload.append("discount", form.discount || 0);
    payload.append("available", form.available);
    if (form.image) payload.append("image", form.image);

    try {
      setLoading(true);
      const token = localStorage.getItem("adminToken");
      await axios.post(
        `${BACKEND_URL}/hirueats/juices/upload`,
        payload,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      toast.success(`${noun} added successfully!`);
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 2500);
      setForm(initialState);
      removeImage();
    } catch (err) {
      const msg =
        err.response?.data?.message || `Failed to add ${noun.toLowerCase()}. Please try again.`;
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const inputClass = (field) =>
    `w-full rounded-lg border bg-white px-3.5 py-2.5 font-inter text-sm text-[#1C2321] placeholder:text-[#6B7280]/60 outline-none transition-colors focus:border-[#FF6B35] focus:ring-2 focus:ring-[#FF6B35]/15
    ${errors[field] ? "border-[#E64A4A]" : "border-black/10"}`;

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-6">
        <h1 className="font-sora text-2xl font-semibold text-[#1C2321]">
          {title || `Add New ${noun}`}
        </h1>
        <p className="mt-1 font-inter text-sm text-[#6B7280]">
          Fill in the details below to list a new {itemType} on the menu.
        </p>
      </div>

      {submitted && (
        <div className="mb-5 flex items-center gap-2 rounded-lg border border-[#2F9E6E]/20 bg-[#2F9E6E]/10 px-4 py-3 font-inter text-sm text-[#2F9E6E]">
          <FiCheckCircle size={18} />
          {noun} added successfully.
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="space-y-6 rounded-2xl border border-black/5 bg-white p-6 shadow-sm lg:p-8"
      >
        {/* Image upload */}
        <div>
          <label className="mb-2 block font-inter text-sm font-medium text-[#1C2321]">
            {noun} photo
          </label>
          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
            className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-black/10 bg-[#FAF7F2] px-6 py-8 text-center transition-colors hover:border-[#FF6B35]/40"
          >
            {preview ? (
              <div className="relative">
                <img
                  src={preview}
                  alt="Preview"
                  className="h-32 w-32 rounded-lg object-cover"
                />
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-[#1C2321] text-white"
                  aria-label="Remove image"
                >
                  <FiX size={14} />
                </button>
              </div>
            ) : (
              <>
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#FFEDE3] text-[#FF6B35]">
                  <FiUploadCloud size={22} />
                </span>
                <p className="mt-3 font-inter text-sm text-[#1C2321]">
                  Drag and drop an image, or{" "}
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="font-medium text-[#FF6B35] hover:underline"
                  >
                    browse
                  </button>
                </p>
                <p className="mt-1 font-inter text-xs text-[#6B7280]">
                  PNG or JPG, up to 5MB
                </p>
              </>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/png, image/jpeg"
              className="hidden"
              onChange={(e) => handleImage(e.target.files?.[0])}
            />
          </div>
        </div>

        {/* Name + Category */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <label className="mb-2 block font-inter text-sm font-medium text-[#1C2321]">
              {noun} name
            </label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
              placeholder={
                itemType === "juice"
                  ? "e.g. Mango Sunrise"
                  : "e.g. Grilled Chicken Bowl"
              }
              className={inputClass("name")}
            />
            {errors.name && (
              <p className="mt-1 font-inter text-xs text-[#E64A4A]">
                {errors.name}
              </p>
            )}
          </div>

          <div>
            <label className="mb-2 block font-inter text-sm font-medium text-[#1C2321]">
              Category
            </label>
            <div className="relative">
              <FiTag
                className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#6B7280]"
                size={16}
              />
              <select
                value={form.category}
                onChange={(e) => update("category", e.target.value)}
                className={`${inputClass("category")} appearance-none pl-9`}
              >
                <option value="">Select a category</option>
                {JuiceCategories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
            {errors.category && (
              <p className="mt-1 font-inter text-xs text-[#E64A4A]">
                {errors.category}
              </p>
            )}
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="mb-2 block font-inter text-sm font-medium text-[#1C2321]">
            Description
          </label>
          <textarea
            rows={3}
            value={form.description}
            onChange={(e) => update("description", e.target.value)}
            placeholder={`Briefly describe this ${itemType}...`}
            className={`${inputClass("description")} resize-none`}
          />
          {errors.description && (
            <p className="mt-1 font-inter text-xs text-[#E64A4A]">
              {errors.description}
            </p>
          )}
        </div>

        {/* Price + Discount */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <label className="mb-2 block font-inter text-sm font-medium text-[#1C2321]">
              Price
            </label>
            <div className="relative">
              <span className="absolute left-1.5 top-1/2 -translate-y-1/2 text-[#6B7280] font-semibold">
                Rs.
              </span>
              <input
                type="number"
                min="0"
                step="0.01"
                value={form.price}
                onChange={(e) => update("price", e.target.value)}
                placeholder="0.00"
                className={`${inputClass("price")} pl-9 font-mono`}
              />
            </div>
            {errors.price && (
              <p className="mt-1 font-inter text-xs text-[#E64A4A]">
                {errors.price}
              </p>
            )}
          </div>

          <div>
            <label className="mb-2 block font-inter text-sm font-medium text-[#1C2321]">
              Discount{" "}
              <span className="font-normal text-[#6B7280]">(optional)</span>
            </label>
            <div className="relative">
              <FiPercent
                className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#6B7280]"
                size={16}
              />
              <input
                type="number"
                min="0"
                max="100"
                value={form.discount}
                onChange={(e) => update("discount", e.target.value)}
                placeholder="0"
                className={`${inputClass("discount")} pl-9 font-mono`}
              />
            </div>
            {errors.discount && (
              <p className="mt-1 font-inter text-xs text-[#E64A4A]">
                {errors.discount}
              </p>
            )}
          </div>
        </div>

        {/* Availability */}
        <div>
          <label className="mb-2 block font-inter text-sm font-medium text-[#1C2321]">
            Availability
          </label>
          <label className="flex w-fit cursor-pointer items-center gap-3 rounded-lg border border-black/10 px-4 py-2.5 transition-colors hover:bg-[#FAF7F2]">
            <input
              type="checkbox"
              checked={form.available}
              onChange={(e) => update("available", e.target.checked)}
              className="h-4 w-4 rounded border-black/20 text-[#2F9E6E] focus:ring-[#2F9E6E]/30"
            />
            <span className="font-inter text-sm text-[#1C2321]">
              {form.available ? "Available" : "Not available"}
            </span>
            <span
              className={`rounded-full px-2 py-0.5 font-inter text-xs font-medium ${
                form.available
                  ? "bg-[#2F9E6E]/10 text-[#2F9E6E]"
                  : "bg-[#E64A4A]/10 text-[#E64A4A]"
              }`}
            >
              {form.available ? "In stock" : "Out of stock"}
            </span>
          </label>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 border-t border-black/5 pt-6">
          <button
            type="button"
            onClick={() => {
              setForm(initialState);
              removeImage();
              setErrors({});
            }}
            className="rounded-lg px-4 py-2.5 font-inter text-sm font-medium text-[#6B7280] transition-colors hover:bg-black/5"
          >
            Reset
          </button>
          <button
            type="submit"
            disabled={loading}
            className="rounded-lg bg-[#FF6B35] px-5 py-2.5 font-inter text-sm font-medium text-white shadow-sm transition-colors hover:bg-[#FF6B35]/90 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? `Saving ${noun}...` : `Save ${noun}`}
          </button>
        </div>
      </form>
    </div>
  );
}
