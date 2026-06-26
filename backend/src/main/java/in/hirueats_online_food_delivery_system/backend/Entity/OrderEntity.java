package in.hirueats_online_food_delivery_system.backend.Entity;


import in.hirueats_online_food_delivery_system.backend.IO.OrderItem;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Data
@Builder
@Table(name = "orders")
@AllArgsConstructor
@NoArgsConstructor
public class OrderEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
      private Long Id;

      private String userId;
      private String userAddress;
      private String phoneNumber;
      private String email;
      private double amount;
      private String paymentStatus;
      private String orderStatus;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "order_id")
      private List<OrderItem> orderItemList;


}
