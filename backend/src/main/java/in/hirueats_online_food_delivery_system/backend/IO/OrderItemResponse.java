package in.hirueats_online_food_delivery_system.backend.IO;

import lombok.Data;

@Data
public class OrderItemResponse {

    private Long id;
    private String itemName;
    private String itemType;
    private Integer quantity;
    private Double price;
    private Double subtotal;
}
