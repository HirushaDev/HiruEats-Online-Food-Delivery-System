package in.hirueats_online_food_delivery_system.backend.Service;

import in.hirueats_online_food_delivery_system.backend.IO.OrderRequest;
import in.hirueats_online_food_delivery_system.backend.IO.OrderResponse;

import java.util.List;

public interface OrderService {

    OrderResponse createOrder(OrderRequest request);

    List<OrderResponse> getAllOrders();

    List<OrderResponse> getOrdersByUser(String userId);

    OrderResponse approveOrder(Long orderId);

    OrderResponse rejectOrder(Long orderId);

    OrderResponse shipOrder(Long orderId);
}
