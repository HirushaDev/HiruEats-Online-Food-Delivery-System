import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";


const PlaceOrder = () => {
  const location = useLocation();

  const {
    cartItems = [],
    subtotal = 0,
    deliveryFee = 250,
    total = 0,
  } = location.state || {};

  const [data , setData] = useState({
      firstName: '',
      lastName: '',
      email:'',
      address: '',
      phone: '',
      state: '',
      city: '',
      zip: '',
  })

  const onChangeHandler = (event) => {
      const name = event.target.name;
      const value = event.target.value;
      setData(data => ({...data, [name] : value}));
  }

  const onSubmitHandler = (event) => {
      event.preventDefault();
      const orderData = {
          userAddress: `${data.firstName} ${data.lastName}, ${data.address}, ${data.state}, ${data.city}, ${data.zip}`,
          phoneNumber: data.phone,
          email: data.email,
          orderedItems:  cartItems.map(item => ({
               foodId: item.foodId,
               quantity: quantities[item.id],
               price: item.price * quantities[item.id],
               category: item.category,
               imageUrl: item.imageUrl,
               description: item.description,
               name: item.name

          })),
            amount: total.toFixed(2),
            orderStatus: "Preparing"
        };

         try {
            axios.post(`${BACKEND_URL}/hirueats/orders`, orderData)
            .then(response => {
                console.log('Order placed successfully:', response.data);
                // Optionally, you can redirect the user to a success page or clear the cart here.
            })
            .catch(error => {
                console.error('Error placing order:', error);
                // Handle error (e.g., show an error message to the user)
            }); 
         } finally {
            // Clear the cart after placing the order
            localStorage.removeItem('cartItems');
         }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* BILLING ADDRESS */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">
              Billing Address
            </h2>

            <form className="space-y-5" onSubmit={onSubmitHandler}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    placeholder="Jhon"
                    name="firstName"
                    onChange={onChangeHandler}
                    value={data.firstName}
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:border-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    placeholder="Doe"
                    name="lastName"
                    value={data.lastName}
                    onChange={onChangeHandler}
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:border-orange-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="example@email.com"
                  name="email"
                  onChange={onChangeHandler}
                  value={data.email}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Address
                </label>
                <input
                  type="text"
                  placeholder="123 Main Street"
                  name="address"
                  onChange={onChangeHandler}
                  value={data.address}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Phone
                </label>
                <input
                  type="text"
                  placeholder="+94 776 957 7704"
                  name="phone"
                  onChange={onChangeHandler}
                  value={data.phone}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:border-orange-500"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    City
                  </label>
                  <input
                    type="text"
                    placeholder="Biyagama"
                    name="city"
                    onChange={onChangeHandler}
                    value={data.city}
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:border-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    State
                  </label>
                  <input
                    type="text"
                    placeholder="Western"
                    name="state"
                    onChange={onChangeHandler}
                    value={data.state}
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:border-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    ZIP
                  </label>
                  <input
                    type="text"
                    placeholder="11500"
                    name="zip"
                    onChange={onChangeHandler}
                    value={data.zip}
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:border-orange-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full mt-4 bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-xl transition"
              >
                Continue to Checkout
              </button>
            </form>
          </div>

          {/* CART SUMMARY */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 h-fit">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Your Cart
            </h2>

            <div className="space-y-4">
              {cartItems.length > 0 ? (
                cartItems.map((item) => (
                  <div
                    key={item.cartKey}
                    className="flex justify-between items-center border-b pb-3"
                  >
                    <div>
                      <h4 className="font-semibold text-gray-800">
                        {item.foodName || item.juiceName}
                      </h4>
                      <p className="text-sm text-gray-500">
                        Qty : {item.quantity}
                      </p>
                    </div>

                    <span className="font-semibold">
                      Rs.
                      {(
                        (item.price -
                          (item.price * (item.discount || 0)) / 100) *
                        item.quantity
                      ).toFixed(2)}
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No items in cart.</p>
              )}
            </div>

            <div className="mt-6 space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-semibold">
                  Rs. {subtotal.toFixed(2)}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600">Delivery Fee</span>
                <span className="font-semibold">
                  Rs. {deliveryFee.toFixed(2)}
                </span>
              </div>

              <hr />

              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span className="text-orange-500">
                  Rs. {total.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;