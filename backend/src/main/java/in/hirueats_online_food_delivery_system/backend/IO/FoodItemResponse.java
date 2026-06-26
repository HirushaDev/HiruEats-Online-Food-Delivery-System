package in.hirueats_online_food_delivery_system.backend.IO;


import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class FoodItemResponse {

    private Long id;
    private String foodName;
    private String description;
    private Double price;
    private String category;
    private String imageUrl;
    private String foodCategory;
    private Boolean available;
    private Double discount;
}
