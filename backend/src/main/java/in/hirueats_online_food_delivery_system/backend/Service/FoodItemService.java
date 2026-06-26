package in.hirueats_online_food_delivery_system.backend.Service;

import in.hirueats_online_food_delivery_system.backend.IO.FoodItemRequest;
import in.hirueats_online_food_delivery_system.backend.IO.FoodItemResponse;

import java.util.List;

public interface FoodItemService {

    FoodItemResponse createFood(FoodItemRequest request);

    FoodItemResponse updateFood(Long id, FoodItemRequest request);

    FoodItemResponse getFoodById(Long id);

    List<FoodItemResponse> getAllFoods();

    void deleteFood(Long id);
}
