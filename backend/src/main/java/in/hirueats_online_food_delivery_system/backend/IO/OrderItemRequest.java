package in.hirueats_online_food_delivery_system.backend.IO;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class OrderItemRequest {

    private Long foodId;

    private Long juiceId;

    private String itemName;

    private double price;

    private int quantity;
}
