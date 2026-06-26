package in.hirueats_online_food_delivery_system.backend.Service;

import in.hirueats_online_food_delivery_system.backend.Entity.OrderEntity;
import in.hirueats_online_food_delivery_system.backend.IO.OrderRequest;
import in.hirueats_online_food_delivery_system.backend.IO.OrderResponse;
import in.hirueats_online_food_delivery_system.backend.Repostory.OrderRepostory;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class OrderServiceImpl implements OrderService {


     private final OrderRepostory orderRepostory;

    @Override
    public OrderResponse createOrderWithPayment(OrderRequest request) {
        OrderEntity newOrder = convertToEntity(request);

        newOrder.setOrderStatus("PENDING_PAYMENT");
        newOrder.setPaymentStatus("NOT_PAID");

        newOrder = orderRepostory.save(newOrder);

        // TODO: integrate payment gateway here to process the payment and update the order status accordingly

        return convertToResponse(newOrder);
    }

    @Override
    public List<OrderResponse> getUserOrders(String userId) {
        List<OrderEntity>  list = orderRepostory.findByUserId(userId);
        return list.stream().map(entity -> convertToResponse(entity)).collect(Collectors.toList());

    }

    private OrderEntity convertToEntity(OrderRequest request) {
       return OrderEntity.builder()
                .userAddress(request.getUserAddress())
                .amount(request.getAmount())
                .email(request.getEmail())
                .phoneNumber(request.getPhoneNumber())
                .orderStatus(request.getOrderStatus())
                .orderItemList(request.getOrderItemList())
                .build();
    }

    private OrderResponse convertToResponse(OrderEntity newOrder) {
           return OrderResponse.builder()
                   .id(newOrder.getId())
                   .userId(newOrder.getUserId())
                   .email(newOrder.getEmail())
                   .amount(newOrder.getAmount())
                   .userAddress(newOrder.getUserAddress())
                   .phoneNumber(newOrder.getPhoneNumber())
                   .paymentStatus(newOrder.getPaymentStatus())
                   .orderItemList(newOrder.getOrderItemList())
                   .orderStatus(newOrder.getOrderStatus())
                   .build();
    }
}
