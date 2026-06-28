package in.hirueats_online_food_delivery_system.backend.Repostory;

import in.hirueats_online_food_delivery_system.backend.Entity.OrderItemEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderItemRepository extends JpaRepository<OrderItemEntity, Long> {
}
