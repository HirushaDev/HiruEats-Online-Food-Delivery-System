import { useEffect, useState ,useContext} from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { AppConstants } from "../../Util/constants";
import { FiArrowLeft } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../Context/AppContext";


const FoodDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [food, setFood] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useContext(AppContext);

  const BACKEND_URL = AppConstants.BACKEND_API_BASE_URL;

  useEffect(() => {
    fetchFood();
  }, [id]);

  const fetchFood = async () => {
    try {
      const res = await axios.get(
        `${BACKEND_URL}/hirueats/foods/${id}`
      );

      setFood(res.data);
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
    if (!food) return 0;

    if (food.discount > 0) {
      return (
        food.price -
        (food.price * food.discount) / 100
      ).toFixed(2);
    }

    return food.price.toFixed(2);
  };

  const addToCartV = () => {
       addToCart(`food-${food.id}`);
       navigate('/cart');
  }

  if (loading) {
    return (
      <div className="text-center py-20">
        Loading...
      </div>
    );
  }

  if (!food) {
    return (
      <div className="text-center py-20 text-red-500">
        Food not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 ">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl border-1 border-black shadow-lg overflow-hidden">

        <div className="grid md:grid-cols-2 gap-8">

          {/* IMAGE */}
          <div className="p-6">
            <img
              src={getImageUrl(food.imageUrl)}
              alt={food.foodName}
              className="w-full h-[400px] object-cover rounded-xl"
            />
          </div>

          {/* DETAILS */}
          <div className="p-6 flex flex-col justify-center">
            <h1 className="text-4xl font-bold text-gray-800">
              {food.foodName}
            </h1>

            <p className="mt-4 text-gray-600">
              {food.description}
            </p>

            <div className="flex gap-2 mt-4">
              <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-sm">
                {food.category}
              </span>

              <span
                className={`px-3 py-1 rounded-full text-sm ${
                  food.available
                    ? "bg-green-100 text-green-600"
                    : "bg-red-100 text-red-600"
                }`}
              >
                {food.available
                  ? "Available"
                  : "Not Available"}
              </span>
            </div>

            {/* PRICE */}
            <div className="mt-6">
              <h2 className="text-3xl font-bold text-orange-500">
                Rs. {getFinalPrice()}
              </h2>

              {food.discount > 0 && (
                <>
                  <p className="text-gray-400 line-through">
                    Rs. {food.price.toFixed(2)}
                  </p>

                  <p className="text-green-600 font-semibold">
                    {food.discount}% OFF
                  </p>
                </>
              )}
            </div>

            {/* BUTTON */}
            <button className="mt-8 w-[150px] bg-orange-500  text-white py-3 rounded-xl hover:bg-orange-600 transition" onClick={addToCartV}>
              Add To Cart
            </button>
          </div>

        </div>
      </div>
      <button
  onClick={() => navigate("/user-home")}
  className="flex items-center gap-2 px-4 py-2 bg-transparent border-2 border-black text-black rounded-lg hover:bg-orange-400 transition cursor-pointer "
>
  <FiArrowLeft />
  Back To Home
</button>
    </div>
  );
};

export default FoodDetails;