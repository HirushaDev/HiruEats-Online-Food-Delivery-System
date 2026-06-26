package in.hirueats_online_food_delivery_system.backend.IO;


import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class FoodItemRequest {

    @NotNull(message =  "Food name cannot be null")
    @Size(min = 3, max = 50, message = "Food name must be between 3 and 50 characters")
    private String foodName;
    @NotNull(message = "Description cannot be null")
    @Size(min = 5, max = 200, message = "Description must be between 5 and 200 characters")
    private String description;
    @NotNull(message = "Price cannot be null")
    private Double price;
    @NotNull(message = "Category cannot be null")
    private String category;
    private String imageUrl;
    private String foodCategory;
    @NotNull(message = "Availability cannot be null")
    private Boolean available;
    private Double discount;
}
