package in.hirueats_online_food_delivery_system.backend.IO;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class OrderItem {
      private String foodId;
      private String juiceId;
      private double price;
      private String category;
      private String imageUrl;
      private String description;
      private String name;
}
