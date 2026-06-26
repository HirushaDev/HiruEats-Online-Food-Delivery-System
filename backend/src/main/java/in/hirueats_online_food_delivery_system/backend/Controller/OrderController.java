package in.hirueats_online_food_delivery_system.backend.Controller;

import in.hirueats_online_food_delivery_system.backend.IO.OrderRequest;
import in.hirueats_online_food_delivery_system.backend.IO.OrderResponse;
import in.hirueats_online_food_delivery_system.backend.Service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}