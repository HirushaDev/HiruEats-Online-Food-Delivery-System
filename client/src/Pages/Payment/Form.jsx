import React from "react";
import {
  FaCreditCard,
  FaUniversity,
  FaMobileAlt,
  FaMoneyBillWave,
} from "react-icons/fa";

const METHODS = [
  { value: "CREDIT_CARD", label: "Credit / Debit Card", icon: FaCreditCard, color: "text-blue-600", bg: "bg-blue-50" },
  { value: "BANK_TRANSFER", label: "Bank Transfer", icon: FaUniversity, color: "text-green-600", bg: "bg-green-50" },
  { value: "MOBILE_PAYMENT", label: "Mobile Payment", icon: FaMobileAlt, color: "text-purple-600", bg: "bg-purple-50" },
  { value: "CASH_ON_DELIVERY", label: "Cash on Delivery", icon: FaMoneyBillWave, color: "text-orange-500", bg: "bg-orange-50" },
];

/**
 * PaymentMethodForm
 * Left column — choose a payment method and fill its details.
 *
 * Props:
 *  - paymentMethod, handlePaymentMethodChange
 *  - paymentForm, handleInputChange, formErrors
 */
const Form = ({
  paymentMethod,
  handlePaymentMethodChange,
  paymentForm,
  handleInputChange,
  formErrors,
}) => {
  const renderPaymentDetails = () => {
    switch (paymentMethod) {
      case "CREDIT_CARD":
        return (
          <div className="space-y-4 mt-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Card Number *</label>
              <input
                type="text"
                name="cardNumber"
                value={paymentForm.cardNumber}
                placeholder="1234 5678 9012 3456"
                maxLength="19"
                className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-shadow ${
                  formErrors.cardNumber ? "border-red-500" : "border-gray-300"
                }`}
                onKeyDown={(e) => {
                  if (!/[\d\s]/.test(e.key) && e.key !== "Backspace" && e.key !== "Delete" && e.key !== "Tab") {
                    e.preventDefault();
                  }
                }}
                onChange={(e) => {
                  let value = e.target.value.replace(/\s/g, "");
                  if (value.length > 16) value = value.slice(0, 16);
                  const formatted = value.replace(/(\d{4})/g, "$1 ").trim();
                  e.target.value = formatted;
                  handleInputChange(e);
                }}
              />
              {formErrors.cardNumber && <p className="text-red-500 text-sm mt-1">{formErrors.cardNumber}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Card Holder Name *</label>
              <input
                type="text"
                name="cardHolderName"
                value={paymentForm.cardHolderName}
                onChange={handleInputChange}
                placeholder="John Doe"
                className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-shadow ${
                  formErrors.cardHolderName ? "border-red-500" : "border-gray-300"
                }`}
              />
              {formErrors.cardHolderName && <p className="text-red-500 text-sm mt-1">{formErrors.cardHolderName}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date *</label>
                <input
                  type="text"
                  name="expiryDate"
                  value={paymentForm.expiryDate}
                  onChange={handleInputChange}
                  placeholder="MM/YY"
                  maxLength="5"
                  className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-shadow ${
                    formErrors.expiryDate ? "border-red-500" : "border-gray-300"
                  }`}
                  onKeyDown={(e) => {
                    if (!/[\d/]/.test(e.key) && e.key !== "Backspace" && e.key !== "Delete" && e.key !== "Tab") {
                      e.preventDefault();
                    }
                  }}
                />
                {formErrors.expiryDate && <p className="text-red-500 text-sm mt-1">{formErrors.expiryDate}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">CVV *</label>
                <input
                  type="password"
                  name="cvv"
                  value={paymentForm.cvv}
                  onChange={handleInputChange}
                  placeholder="123"
                  maxLength="4"
                  className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-shadow ${
                    formErrors.cvv ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {formErrors.cvv && <p className="text-red-500 text-sm mt-1">{formErrors.cvv}</p>}
              </div>
            </div>
          </div>
        );

      case "BANK_TRANSFER":
        return (
          <div className="space-y-4 mt-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Bank Name *</label>
              <select
                name="bankName"
                value={paymentForm.bankName}
                onChange={handleInputChange}
                className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-shadow ${
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
              {formErrors.bankName && <p className="text-red-500 text-sm mt-1">{formErrors.bankName}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Account Number *</label>
              <input
                type="text"
                name="accountNumber"
                value={paymentForm.accountNumber}
                onChange={handleInputChange}
                placeholder="1234567890"
                className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-shadow ${
                  formErrors.accountNumber ? "border-red-500" : "border-gray-300"
                }`}
              />
              {formErrors.accountNumber && <p className="text-red-500 text-sm mt-1">{formErrors.accountNumber}</p>}
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
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Provider *</label>
              <select
                name="mobileProvider"
                value={paymentForm.mobileProvider}
                onChange={handleInputChange}
                className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-shadow ${
                  formErrors.mobileProvider ? "border-red-500" : "border-gray-300"
                }`}
              >
                <option value="">Select Provider</option>
                <option value="Dialog">Dialog</option>
                <option value="Mobitel">Mobitel</option>
                <option value="Airtel">Airtel</option>
                <option value="Hutch">Hutch</option>
              </select>
              {formErrors.mobileProvider && <p className="text-red-500 text-sm mt-1">{formErrors.mobileProvider}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number *</label>
              <input
                type="tel"
                name="mobileNumber"
                value={paymentForm.mobileNumber}
                onChange={handleInputChange}
                placeholder="0712345678"
                className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-shadow ${
                  formErrors.mobileNumber ? "border-red-500" : "border-gray-300"
                }`}
              />
              {formErrors.mobileNumber && <p className="text-red-500 text-sm mt-1">{formErrors.mobileNumber}</p>}
            </div>

            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-sm text-green-800">You will receive a confirmation SMS on your mobile phone.</p>
            </div>
          </div>
        );

      case "CASH_ON_DELIVERY":
        return (
          <div className="mt-6 bg-yellow-50 p-4 rounded-lg">
            <p className="text-sm text-yellow-800">
              <span className="font-semibold">✓</span> You have selected Cash on Delivery.
            </p>
            <p className="text-sm text-gray-600 mt-1">Please keep the exact amount ready when the delivery arrives.</p>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm">
      <div className="flex items-center gap-2 mb-6">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-100 text-orange-600 font-bold text-sm">
          1
        </span>
        <h2 className="text-2xl font-bold text-gray-900">Payment Method</h2>
      </div>

      {formErrors.paymentMethod && (
        <p className="-mt-2 mb-4 text-sm font-medium text-red-500">{formErrors.paymentMethod}</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {METHODS.map(({ value, label, icon: Icon, color, bg }) => {
          const active = paymentMethod === value;
          return (
            <label
              key={value}
              className={`flex items-center gap-3 border-2 p-4 rounded-xl cursor-pointer transition-all ${
                active ? "border-orange-500 bg-orange-50/60 shadow-sm" : "border-gray-200 hover:border-orange-300"
              }`}
            >
              <input
                type="radio"
                name="payment"
                value={value}
                checked={active}
                onChange={() => handlePaymentMethodChange(value)}
                className="w-4 h-4 accent-orange-500"
              />
              <span className={`flex h-9 w-9 items-center justify-center rounded-full ${bg}`}>
                <Icon className={`text-lg ${color}`} />
              </span>
              <span className="text-sm font-semibold text-gray-800">{label}</span>
            </label>
          );
        })}
      </div>

      {renderPaymentDetails()}
    </div>
  );
};

export default Form;
