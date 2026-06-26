package in.hirueats_online_food_delivery_system.backend.Repostory;

import in.hirueats_online_food_delivery_system.backend.Entity.OrderEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;


public interface OrderRepostory extends JpaRepository<OrderEntity, String> {

    List<OrderEntity> findByUserId(String userId);

    Optional<OrderEntity> findByRazorpayOrderId(String  razorpayOrderId);



}
