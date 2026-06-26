import { useEffect, useState,useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { FiArrowLeft, FiShoppingCart } from "react-icons/fi";
import { AppConstants } from "../Util/constants";
import { AppContext } from "../Context/AppContext";

const JuiceDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [juice, setJuice] = useState(null);
  const [loading, setLoading] = useState(true);
   const { addToCart } = useContext(AppContext);

  const BACKEND_URL = AppConstants.BACKEND_API_BASE_URL;

  useEffect(() => {
    fetchJuice();
  }, [id]);

  const fetchJuice = async () => {
    try {
      const res = await axios.get(
        `${BACKEND_URL}/hirueats/juices/${id}`
      );

      setJuice(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getImageUrl = (imageUrl) => {
    if (!imageUrl) return null;

    if (imageUrl.startsWith("http")) {
      return imageUrl;
    }

    return `${BACKEND_URL}${imageUrl}`;
  };

  const getFinalPrice = () => {
    if (!juice) return 0;

    if (juice.discount > 0) {
      return (
        juice.price -
        (juice.price * juice.discount) / 100
      ).toFixed(2);
    }

    return juice.price.toFixed(2);
  };

  const addJCartV = () => {
       addToCart(`juice-${juice.id}`);
       navigate('/cart');
  }

  if (loading) {
    return (
      <div className="text-center py-20">
        Loading...
      </div>
    );
  }

  if (!juice) {
    return (
      <div className="text-center py-20 text-red-500">
        Juice not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">

      <div className="max-w-5xl mx-auto mb-4">
        
      </div>

      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden border border-black">

        <div className="grid md:grid-cols-2 gap-8">

          {/* IMAGE */}
          <div className="p-6">
            <img
              src={getImageUrl(juice.imageUrl)}
              alt={juice.juiceName}
              className="w-full h-[400px] object-cover rounded-xl"
            />
          </div>

          {/* DETAILS */}
          <div className="p-6 flex flex-col justify-center">

            <h1 className="text-4xl font-bold text-gray-800">
              {juice.juiceName}
            </h1>

            <p className="mt-4 text-gray-600">
              {juice.description}
            </p>

            <div className="flex gap-2 mt-4">
              <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm">
                {juice.category}
              </span>

              <span
                className={`px-3 py-1 rounded-full text-sm ${
                  juice.available
                    ? "bg-green-100 text-green-600"
                    : "bg-red-100 text-red-600"
                }`}
              >
                {juice.available
                  ? "Available"
                  : "Not Available"}
              </span>
            </div>

            <div className="mt-6">
              <h2 className="text-3xl font-bold text-orange-500">
                Rs. {getFinalPrice()}
              </h2>

              {juice.discount > 0 && (
                <>
                  <p className="text-gray-400 line-through">
                    Rs. {juice.price.toFixed(2)}
                  </p>

                  <p className="text-green-600 font-semibold">
                    {juice.discount}% OFF
                  </p>
                </>
              )}
            </div>

            <button className="mt-8 flex items-center justify-center gap-2 bg-orange-500 text-white py-3 rounded-xl hover:bg-orange-600 transition" onClick={addJCartV}>
              <FiShoppingCart />
              Add To Cart
            </button>

          </div>

        </div>

      </div>
      <button
          onClick={() => navigate("/user-home")}
          className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
        >
          <FiArrowLeft />
          Back To Home
        </button>
    </div>
  );
};

export default JuiceDetails;