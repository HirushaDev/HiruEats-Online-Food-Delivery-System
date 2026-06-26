package in.hirueats_online_food_delivery_system.backend.Entity;

import jakarta.persistence.*;
import lombok.*;


@Entity
@Table(name = "Juice_Items")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class JuiceItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String juiceName;
    private String description;
    private Double price;
    private String  juiceCategory;
    private String imageUrl;
    private Boolean  available;
    private String  category;
    private Double  discount;
}
