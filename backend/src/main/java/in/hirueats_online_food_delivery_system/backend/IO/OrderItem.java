package in.hirueats_online_food_delivery_system.backend.IO;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@Entity
@Table(name = "order_items")
@NoArgsConstructor
@AllArgsConstructor
public class OrderItem {
      @Id
      @GeneratedValue(strategy = GenerationType.IDENTITY)
      private Long id;

      private String foodId;
      private String juiceId;
      private double price;
      private String category;
      private String imageUrl;
      private String description;
      private String name;
}
