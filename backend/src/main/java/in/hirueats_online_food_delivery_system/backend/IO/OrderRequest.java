package in.hirueats_online_food_delivery_system.backend.IO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class OrderRequest {

    private String userId;

    private String paymentMethod;

    private double subtotal;

    private double deliveryFee;

    private double total;

    private List<OrderItemRequest> items;

    private String deliveryAddress;

    private String deliveryCity;

    private String deliveryPhoneNumber;

    private String deliveryNote;

}
