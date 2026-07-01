import React from "react";

/**
 * OrderSummary
 * Right column — cart recap, totals, and the final "Pay" action.
 *
 * Props:
 *  - cartItems, subtotal, deliveryFee, total
 *  - paymentMethod, loading, onPay (handlePayment)
 */
const OrderSummary = ({ cartItems, subtotal, deliveryFee, total, paymentMethod, loading, onPay }) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-md h-fit sticky top-6">
      <div className="flex items-center gap-2 mb-5">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-100 text-orange-600 font-bold text-sm">
          3
        </span>
        <h2 className="text-xl font-bold text-gray-900">Order Summary</h2>
      </div>

      <div className="space-y-3 text-gray-700">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>Rs. {subtotal.toFixed(2)}</span>
        </div>

        <div className="flex justify-between">
          <span>Delivery Fee</span>
          <span>Rs. {deliveryFee.toFixed(2)}</span>
        </div>

        <div className="flex justify-between text-green-600">
          <span>Discount</span>
          <span>- Rs. 0.00</span>
        </div>

        <hr className="my-2" />

        <div className="flex justify-between text-lg font-bold">
          <span>Total</span>
          <span className="text-orange-500">Rs. {total.toFixed(2)}</span>
        </div>
      </div>

      {/* Items preview */}
      <div className="mt-6">
        <h3 className="font-semibold mb-3 text-gray-900">Items ({cartItems.length})</h3>

        <div className="max-h-40 overflow-y-auto space-y-2 pr-2">
          {cartItems.map((item, index) => (
            <div key={index} className="flex justify-between text-sm text-gray-600 border-b pb-2">
              <span className="truncate max-w-[60%]">
                {item.foodName || item.juiceName || item.name} × {item.quantity}
              </span>
              <span className="font-medium">Rs. {(item.quantity * item.price).toFixed(2)}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Delivery info */}
      <div className="mt-4 pt-4 border-t">
        <p className="text-sm text-gray-500">Payment Method: {paymentMethod.replace("_", " ")}</p>
        <p className="text-sm text-gray-500 mt-1">Order will be confirmed after payment verification</p>
      </div>

      <button
        onClick={onPay}
        disabled={loading}
        className={`w-full mt-6 text-white font-bold py-3 rounded-xl transition-all
          ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-orange-500 hover:bg-orange-600 shadow-lg hover:shadow-orange-200"}`}
      >
        {loading ? (
          <>
            <svg className="animate-spin h-5 w-5 mr-3 inline" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            Processing...
          </>
        ) : (
          `Pay Rs. ${total.toFixed(2)}`
        )}
      </button>
    </div>
  );
};

export default OrderSummary;
