package in.hirueats_online_food_delivery_system.backend.Repostory;

import in.hirueats_online_food_delivery_system.backend.Entity.JuiceItem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface JuiceItemRepository extends JpaRepository<JuiceItem, Long> {

    boolean existsByJuiceName(String juiceName);

    Optional<JuiceItem> findById(Long id);

    List<JuiceItem> findAll();

    void delete(JuiceItem entity);
}
