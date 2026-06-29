import { useState, useEffect, useContext } from "react";
import {
  FiShoppingCart,
  FiEye,
  FiHeart,
  FiPlus,
  FiMinus,
} from "react-icons/fi";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../Context/AppContext";
import { AppConstants } from "../../Util/constants";

const JuiceDisplay = () => {
  const [juices, setJuices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { addToCart, removeFromCart, cart } = useContext(AppContext);
  
 

  // FILTER STATES
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortPrice, setSortPrice] = useState("");
 

  const { userData } = useContext(AppContext);

  const BACKEND_URL = AppConstants.BACKEND_API_BASE_URL;

  useEffect(() => {
    fetchJuices();
  }, []);

  const fetchJuices = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await axios.get(`${BACKEND_URL}/hirueats/juices`);
      setJuices(res.data);
    } catch (err) {
      console.error("Error fetching juices:", err);
      setError("Failed to load juice items. Please try again.");
    } finally {
      setLoading(false);
    }
  };



  const getImageUrl = (imageUrl) => {
    if (!imageUrl) return null;
    if (imageUrl.startsWith("http")) return imageUrl;
    return `${BACKEND_URL}${imageUrl}`;
  };

  const handleAddToCart = (juice) => {
    addToCart(`juice-${juice.id}`);
    toast.success(`${juice.juiceName} added to cart!`);
  };

  const handleViewDetails = (juice) => {
    toast.info(`Viewing details for ${juice.juiceName}`);
    navigate(`/juice/${juice.id}`);
  };
  const handlePlusJuice = (juice) => {
    toast.info(`Adding ${juice.juiceName} to cart`);
    addToCart(`juice-${juice.id}`);
  };

  const handleMinJuice = (juice) => {
    toast.info(`Removing ${juice.juiceName} from cart`);
    removeFromCart(`juice-${juice.id}`);
  };
  const getFinalPrice = (juice) => {
    if (juice.discount > 0) {
      return (juice.price - (juice.price * juice.discount) / 100).toFixed(2);
    }
    return juice.price.toFixed(2);
  };

  // GET CATEGORIES FROM DATABASE
  const categories = [
    "All",
    ...new Set(juices.map((juice) => juice.category).filter(Boolean)),
  ];

  // FILTER & SORT
  const filteredJuices = juices
    .filter((juice) =>
      selectedCategory === "All" ? true : juice.category === selectedCategory,
    )
    .sort((a, b) => {
      if (sortPrice === "low-high") {
        return a.price - b.price;
      }

      if (sortPrice === "high-low") {
        return b.price - a.price;
      }

      return 0;
    });

  

  return (
    <section className="min-h-screen bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold">Explore Delicious Juices</h2>

          <p className="text-gray-500 mt-2">
            Discover tasty juices, fresh items and special discounts
          </p>
        </div>

        {/* FILTER SECTION */}
        <div className="bg-gray-50 border rounded-xl p-4 mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* CATEGORY FILTER */}
          <div className="flex items-center gap-2">
            <label className="font-medium text-gray-700">Category:</label>

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-orange-400"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* PRICE SORT */}
          <div className="flex items-center gap-2">
            <label className="font-medium text-gray-700">Sort By Price:</label>

            <select
              value={sortPrice}
              onChange={(e) => setSortPrice(e.target.value)}
              className="border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-orange-400"
            >
              <option value="">Default</option>
              <option value="low-high">Min → Max</option>
              <option value="high-low">Max → Min</option>
            </select>
          </div>
        </div>

        {/* ERROR */}
        {error && (
          <div className="text-center mb-6 text-red-600 bg-red-50 p-3 rounded-xl">
            {error}
          </div>
        )}

        {/* LOADING */}
        {loading ? (
          <div className="text-center py-10">Loading...</div>
        ) : filteredJuices.length === 0 ? (
          <div className="text-center py-20 text-gray-500">No juices found</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredJuices.map((juice) => (
              <div
                key={juice.id}
                className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 p-4"
              >
                {/* IMAGE */}
                <div className="relative h-40 bg-gray-100 mb-3 rounded-lg overflow-hidden">
                  {getImageUrl(juice.imageUrl) ? (
                    <img
                      src={getImageUrl(juice.imageUrl)}
                      className="w-full h-full object-cover"
                      alt={juice.juiceName}
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-400">
                      No Image
                    </div>
                  )}

                  {/* DISCOUNT BADGE */}
                  {juice.discount > 0 && (
                    <span className="absolute top-2 right-2 bg-orange-500 text-white text-xs px-2 py-1 rounded-full">
                      {juice.discount}% OFF
                    </span>
                  )}
                </div>

                {/* NAME */}
                <h3 className="font-bold text-lg">{juice.juiceName}</h3>

                {/* DESCRIPTION */}
                <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                  {juice.description}
                </p>

                {/* CATEGORY */}
                <div className="mt-2 flex flex-wrap gap-1">
                  {juice.juiceCategory && (
                    <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full font-medium">
                      {juice.juiceCategory}
                    </span>
                  )}
                  {juice.category && (
                    <span className="text-xs bg-orange-100 text-orange-600 px-2 py-1 rounded-full">
                      {juice.category}
                    </span>
                  )}
                </div>

                {/* STATUS */}
                <div className="flex items-center justify-between mt-3">
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      juice.available
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {juice.available ? "Available" : "Not Available"}
                  </span>
                </div>

                {/* PRICE */}
                <div className="mt-3">
                  <p className="text-orange-500 font-bold text-lg">
                    Rs. {getFinalPrice(juice)}
                  </p>

                  {juice.discount > 0 && (
                    <p className="text-gray-400 line-through text-sm">
                      Rs. {juice.price.toFixed(2)}
                    </p>
                  )}
                </div>

                <hr className="my-3 border-gray-300" />

                {/* ACTIONS */}
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => handleAddToCart(juice)}
                    className="flex items-center gap-2 bg-orange-500 text-white px-3 py-2 rounded-lg hover:bg-orange-600 transition"
                  >
                    <FiShoppingCart />
                  </button>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleViewDetails(juice)}
                      className="p-2 border rounded-lg hover:bg-gray-100"
                    >
                      <FiEye />
                    </button>

                    <button
                      className="p-2 border rounded-lg hover:bg-gray-100 text-orange-500"
                      onClick={() =>
                        toast.info(`${juice.juiceName} added to favourites`)
                      }
                    >
                      <FiHeart />
                    </button>

                    {cart[`juice-${juice.id}`] > 0 && (
                      <>
                        <button
                          onClick={() => handleMinJuice(juice)}
                          className="p-2 border rounded-lg hover:bg-red-700 bg-red-500 text-white cursor-pointer"
                        >
                          <FiMinus />
                        </button>
                        <span className="font-semibold text-gray-700 px-2 min-w-[20px] text-center">
                          {cart[`juice-${juice.id}`]}
                        </span>
                      </>
                    )}
                    <button
                      onClick={() => handlePlusJuice(juice)}
                      className="p-2 border rounded-lg hover:bg-green-700 bg-green-500 text-white cursor-pointer"
                    >
                      <FiPlus />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default JuiceDisplay;
