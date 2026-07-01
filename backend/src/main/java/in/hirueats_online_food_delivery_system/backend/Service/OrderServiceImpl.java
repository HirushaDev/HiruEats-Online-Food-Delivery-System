package in.hirueats_online_food_delivery_system.backend.Service;


import in.hirueats_online_food_delivery_system.backend.Entity.OrderEntity;
import in.hirueats_online_food_delivery_system.backend.Entity.OrderItemEntity;
import in.hirueats_online_food_delivery_system.backend.IO.OrderItemRequest;
import in.hirueats_online_food_delivery_system.backend.IO.OrderRequest;
import in.hirueats_online_food_delivery_system.backend.IO.OrderResponse;
import in.hirueats_online_food_delivery_system.backend.Repostory.OrderRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class OrderServiceImpl implements OrderService {

       private final OrderRepository orderRepository;

    @Override
    public OrderResponse createOrder(OrderRequest request) {
        OrderEntity order = new OrderEntity();

        order.setUserId(request.getUserId());
        order.setPaymentMethod(request.getPaymentMethod());
        order.setSubtotal(request.getSubtotal());
        order.setDeliveryFee(request.getDeliveryFee());
        order.setTotal(request.getTotal());
        order.setStatus("PENDING");
        order.setDeliveryAddress(request.getDeliveryAddress());
        order.setDeliveryCity(request.getDeliveryCity());
        order.setDeliveryPhoneNumber(request.getDeliveryPhoneNumber());
        order.setDeliveryNote(request.getDeliveryNote());

        List<OrderItemEntity> orderItems = new ArrayList<>();

        for (OrderItemRequest item : request.getItems()) {

            OrderItemEntity orderItem = new OrderItemEntity();

            orderItem.setFoodId(item.getFoodId());
            orderItem.setJuiceId(item.getJuiceId());
            orderItem.setItemName(item.getItemName());
            orderItem.setPrice(item.getPrice());
            orderItem.setQuantity(item.getQuantity());
            orderItem.setTotal(item.getPrice() * item.getQuantity());

            orderItem.setOrder(order);

            orderItems.add(orderItem);
        }

        order.setOrderItems(orderItems);

        OrderEntity savedOrder = orderRepository.save(order);

        return mapToResponse(savedOrder);
    }

    @Override
    public List<OrderResponse> getAllOrders() {
        return orderRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Override
    public List<OrderResponse> getOrdersByUser(String userId) {
        return orderRepository.findByUserId(userId)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Override
    public OrderResponse approveOrder(Long orderId) {
        OrderEntity order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order Not Found"));

        order.setStatus("APPROVED");

        return mapToResponse(orderRepository.save(order));
    }

    @Override
    public OrderResponse rejectOrder(Long orderId) {
        OrderEntity order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order Not Found"));

        order.setStatus("REJECTED");

        return mapToResponse(orderRepository.save(order));
    }

    private OrderResponse mapToResponse(OrderEntity order) {

        List<OrderItemRequest> items = new ArrayList<>();

        if (order.getOrderItems() != null) {

            for (OrderItemEntity item : order.getOrderItems()) {

                items.add(
                        OrderItemRequest.builder()
                                .foodId(item.getFoodId())
                                .juiceId(item.getJuiceId())
                                .itemName(item.getItemName())
                                .price(item.getPrice())
                                .quantity(item.getQuantity())
                                .build()
                );
            }
        }

        return OrderResponse.builder()
                .id(order.getId())
                .userId(order.getUserId())
                .paymentMethod(order.getPaymentMethod())
                .subtotal(order.getSubtotal())
                .deliveryFee(order.getDeliveryFee())
                .total(order.getTotal())
                .status(order.getStatus())
                .createdAt(order.getCreatedAt())
                .items(items)
                .deliveryAddress(order.getDeliveryAddress())
                .deliveryCity(order.getDeliveryCity())
                .deliveryPhoneNumber(order.getDeliveryPhoneNumber())
                .deliveryNote(order.getDeliveryNote())
                .build();
    }

}
