package in.hirueats_online_food_delivery_system.backend.Controller;


import in.hirueats_online_food_delivery_system.backend.IO.OrderRequest;
import in.hirueats_online_food_delivery_system.backend.IO.OrderResponse;
import in.hirueats_online_food_delivery_system.backend.Service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("hirueats/orders")
@RequiredArgsConstructor
public class OrderController {

     private final OrderService orderService;

    @PostMapping
    public OrderResponse createOrder(@RequestBody OrderRequest request){
        return orderService.createOrder(request);
    }

    // Admin Get All Orders
    @GetMapping
    public List<OrderResponse> getAllOrders(){
        return orderService.getAllOrders();
    }

    // User My Orders
    @GetMapping("/user/{userId}")
    public List<OrderResponse> getOrdersByUser(@PathVariable String userId){
        return orderService.getOrdersByUser(userId);
    }

    // Admin Approve Order
    @PutMapping("/{id}/approve")
    public OrderResponse approveOrder(@PathVariable Long id){
        return orderService.approveOrder(id);
    }

    // Admin Reject Order
    @PutMapping("/{id}/reject")
    public OrderResponse rejectOrder(@PathVariable Long id){
        return orderService.rejectOrder(id);
    }
}
