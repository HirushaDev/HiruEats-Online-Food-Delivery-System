package in.hirueats_online_food_delivery_system.backend.Entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "Food_Items")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FoodItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String foodName;
    private String description;
    private Double price;
    private String  foodCategory;
    private String imageUrl;
    private Boolean  available;
    private String  category;
    private Double  discount;
}
