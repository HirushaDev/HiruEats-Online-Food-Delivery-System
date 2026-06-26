package in.hirueats_online_food_delivery_system.backend.IO;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class OrderRequest {

     private String userAddress;
     private List<OrderItem> orderItemList;
     private double amount;
     private String email;
     private String PhoneNumber;
     private String orderStatus;
}
