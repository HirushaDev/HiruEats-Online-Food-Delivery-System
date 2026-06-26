package in.hirueats_online_food_delivery_system.backend.Entity;


import in.hirueats_online_food_delivery_system.backend.IO.OrderItem;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
@Table(name = "orders")
public class OrderEntity {
    @Id
      private String Id;
      private String userId;
      private String userAddress;
      private String PhoneNumber;
      private String email;
      private List<OrderItem> orderItemList;
      private double amount;
      private String paymentStatus;
      private String orderStatus;
}
