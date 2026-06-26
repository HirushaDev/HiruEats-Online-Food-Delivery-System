package in.hirueats_online_food_delivery_system.backend.Controller;

import in.hirueats_online_food_delivery_system.backend.IO.OrderRequest;
import in.hirueats_online_food_delivery_system.backend.IO.OrderResponse;
import in.hirueats_online_food_delivery_system.backend.Service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("hirueats/orders")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;

    @PostMapping("/create")
    public ResponseEntity<OrderResponse> createOrder(@RequestBody OrderRequest request) {

        OrderResponse response = orderService.createOrderWithPayment(request);

        return new ResponseEntity<>(response, HttpStatus.CREATED);


    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<OrderResponse>> getUserOrders(@PathVariable String userId) {
        return ResponseEntity.ok(orderService.getUserOrders(userId));
    }

    @DeleteMapping("/{orderId}")
    public ResponseEntity<String> deleteOrder(@PathVariable Long orderId) {
        orderService.removeOrder(orderId);
        return ResponseEntity.ok("Order deleted successfully");
    }
}