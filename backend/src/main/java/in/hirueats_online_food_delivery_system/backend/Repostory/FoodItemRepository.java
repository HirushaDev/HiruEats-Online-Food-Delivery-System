package in.hirueats_online_food_delivery_system.backend.Repostory;

import in.hirueats_online_food_delivery_system.backend.Entity.FoodItem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface FoodItemRepository  extends JpaRepository<FoodItem, Long> {

    boolean existsByFoodName(String foodName);

    Optional<FoodItem> findById(Long id);

    List<FoodItem> findAll();

    void delete(FoodItem entity);
}
