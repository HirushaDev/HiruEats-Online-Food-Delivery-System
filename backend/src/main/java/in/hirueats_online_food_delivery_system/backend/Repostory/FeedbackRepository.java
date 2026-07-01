package in.hirueats_online_food_delivery_system.backend.Repostory;

import in.hirueats_online_food_delivery_system.backend.Entity.FeedbackEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FeedbackRepository extends JpaRepository<FeedbackEntity, Long> {
}
