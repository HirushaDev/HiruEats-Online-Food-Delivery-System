import React from "react";
import { FaMapMarkerAlt, FaCity, FaPhoneAlt, FaStickyNote } from "react-icons/fa";

/**
 * ShippingForm
 * Center column — collects delivery address, city, phone number
 * and an optional note for the courier.
 *
 * Props:
 *  - shippingForm: { address, city, phoneNumber, deliveryNote }
 *  - handleShippingChange: (e) => void
 *  - shippingErrors: { address?, city?, phoneNumber? }
 */
const ShippingForm = ({ shippingForm, handleShippingChange, shippingErrors }) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm">
      <div className="flex items-center gap-2 mb-6">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-100 text-orange-600 font-bold text-sm">
          2
        </span>
        <h2 className="text-2xl font-bold text-gray-900">Delivery Details</h2>
      </div>

      <div className="space-y-5">
        {/* Address */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1.5">
            <FaMapMarkerAlt className="text-orange-500" />
            Delivery Address *
          </label>
          <textarea
            name="address"
            value={shippingForm.address}
            onChange={handleShippingChange}
            rows={3}
            placeholder="House / apartment no., street, landmark"
            className={`w-full px-4 py-2.5 border rounded-lg resize-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-shadow ${
              shippingErrors.address ? "border-red-500" : "border-gray-300"
            }`}
          />
          {shippingErrors.address && (
            <p className="text-red-500 text-sm mt-1">{shippingErrors.address}</p>
          )}
        </div>

        {/* City */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1.5">
            <FaCity className="text-orange-500" />
            City *
          </label>
          <input
            type="text"
            name="city"
            value={shippingForm.city}
            onChange={handleShippingChange}
            placeholder="e.g. Colombo"
            className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-shadow ${
              shippingErrors.city ? "border-red-500" : "border-gray-300"
            }`}
          />
          {shippingErrors.city && (
            <p className="text-red-500 text-sm mt-1">{shippingErrors.city}</p>
          )}
        </div>

        {/* Phone number */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1.5">
            <FaPhoneAlt className="text-orange-500" />
            Phone Number *
          </label>
          <input
            type="tel"
            name="phoneNumber"
            value={shippingForm.phoneNumber}
            onChange={handleShippingChange}
            placeholder="0712345678"
            maxLength="10"
            className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-shadow ${
              shippingErrors.phoneNumber ? "border-red-500" : "border-gray-300"
            }`}
            onKeyDown={(e) => {
              if (!/[\d]/.test(e.key) && e.key !== "Backspace" && e.key !== "Delete" && e.key !== "Tab") {
                e.preventDefault();
              }
            }}
          />
          {shippingErrors.phoneNumber && (
            <p className="text-red-500 text-sm mt-1">{shippingErrors.phoneNumber}</p>
          )}
          <p className="text-xs text-gray-400 mt-1">The rider will call this number on arrival.</p>
        </div>

        {/* Optional delivery note */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1.5">
            <FaStickyNote className="text-orange-500" />
            Delivery Note <span className="text-gray-400 font-normal">(optional)</span>
          </label>
          <textarea
            name="deliveryNote"
            value={shippingForm.deliveryNote}
            onChange={handleShippingChange}
            rows={2}
            placeholder="e.g. Leave at the gate, call on arrival"
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-shadow"
          />
        </div>
      </div>
    </div>
  );
};

export default ShippingForm;
