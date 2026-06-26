package in.hirueats_online_food_delivery_system.backend.Service;

import in.hirueats_online_food_delivery_system.backend.IO.OrderRequest;
import in.hirueats_online_food_delivery_system.backend.IO.OrderResponse;

import java.util.List;

public interface OrderService {

  OrderResponse createOrderWithPayment(OrderRequest request);

  List<OrderResponse> getUserOrders(String userId);

  void removeOrder(Long orderId);


}
