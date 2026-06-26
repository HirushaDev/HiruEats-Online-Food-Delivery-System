package in.hirueats_online_food_delivery_system.backend.Service;

import in.hirueats_online_food_delivery_system.backend.Entity.FoodItem;
import in.hirueats_online_food_delivery_system.backend.IO.FoodItemRequest;
import in.hirueats_online_food_delivery_system.backend.IO.FoodItemResponse;
import in.hirueats_online_food_delivery_system.backend.Repostory.FoodItemRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;


@Service
@RequiredArgsConstructor
public class FoodItemServiceImpl implements  FoodItemService {


      private final FoodItemRepository repository;


      @Override
    public FoodItemResponse createFood(FoodItemRequest request) {
           if(!repository.existsByFoodName(request.getFoodName())) {
               FoodItem foodItem = convertToFoodItemEntity(request);
               foodItem = repository.save(foodItem);
               return convertToFoodItemResponse(foodItem);
           }
        throw new ResponseStatusException( HttpStatus.CONFLICT, "Food item already exists" );
    }

    @Override
    public FoodItemResponse updateFood(Long id, FoodItemRequest request) {
        FoodItem existingFood = repository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Food item not found"
                ));
        // optional: duplicate name check (if name changing)
        if (!existingFood.getFoodName().equals(request.getFoodName())
                && repository.existsByFoodName(request.getFoodName())) {

            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "Food name already exists"
            );
        }
        existingFood.setFoodName(request.getFoodName());
        existingFood.setDescription(request.getDescription());
        existingFood.setPrice(request.getPrice());
        existingFood.setCategory(request.getCategory());
        existingFood.setImageUrl(request.getImageUrl());
        existingFood.setFoodCategory(request.getFoodCategory());
        existingFood.setAvailable(request.getAvailable());
        existingFood.setDiscount(request.getDiscount());

        FoodItem updatedFood = repository.save(existingFood);

        return convertToFoodItemResponse(updatedFood);

    }

    @Override
    public FoodItemResponse getFoodById(Long id) {
        FoodItem foodItem = repository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Food item not found with id: " + id
                ));

        return convertToFoodItemResponse(foodItem);
    }

    @Override
    public List<FoodItemResponse> getAllFoods() {
        List<FoodItem> foodItems = repository.findAll();

        return foodItems.stream()
                .map(this::convertToFoodItemResponse)
                .toList();
    }

    @Override
    public void deleteFood(Long id) {
        FoodItem foodItem = repository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Food item not found with id: " + id
                ));

        repository.delete(foodItem);
    }


    private FoodItem convertToFoodItemEntity(FoodItemRequest request) {
          return FoodItem.builder()
                  .foodName(request.getFoodName())
                  .description(request.getDescription())
                  .price(request.getPrice())
                  .category(request.getCategory())
                  .imageUrl(request.getImageUrl())
                  .foodCategory(request.getFoodCategory())
                  .available(request.getAvailable())
                  .discount(request.getDiscount())
                  .build(); }

    private FoodItemResponse convertToFoodItemResponse(FoodItem foodItem) {
          return FoodItemResponse.builder()
                  .id(foodItem.getId())
                  .foodName(foodItem.getFoodName())
                  .description(foodItem.getDescription())
                  .price(foodItem.getPrice())
                  .category(foodItem.getCategory())
                  .imageUrl(foodItem.getImageUrl())
                  .foodCategory(foodItem.getFoodCategory())
                  .available(foodItem.getAvailable())
                  .discount(foodItem.getDiscount())
                  .build(); }
}
