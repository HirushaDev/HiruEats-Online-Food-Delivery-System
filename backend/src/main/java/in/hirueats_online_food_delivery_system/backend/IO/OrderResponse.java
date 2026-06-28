package in.hirueats_online_food_delivery_system.backend.IO;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class OrderResponse {

    private Long id;

    private String userId;

    private String paymentMethod;

    private double subtotal;

    private double deliveryFee;

    private double total;

    private String status;

    private LocalDateTime createdAt;

    private List<OrderItemRequest> items;
}
