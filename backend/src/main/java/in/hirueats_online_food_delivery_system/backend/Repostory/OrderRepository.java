package in.hirueats_online_food_delivery_system.backend.Repostory;

import in.hirueats_online_food_delivery_system.backend.Entity.OrderEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderRepository  extends JpaRepository<OrderEntity, Long> {

    List<OrderEntity> findByUserId(String userId);

    List<OrderEntity> findByStatus(String status);
}
