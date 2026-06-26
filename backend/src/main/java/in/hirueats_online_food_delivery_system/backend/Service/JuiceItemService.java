package in.hirueats_online_food_delivery_system.backend.Service;

import in.hirueats_online_food_delivery_system.backend.IO.FoodItemRequest;
import in.hirueats_online_food_delivery_system.backend.IO.FoodItemResponse;
import in.hirueats_online_food_delivery_system.backend.IO.JuiceItemRequest;
import in.hirueats_online_food_delivery_system.backend.IO.JuiceItemResponse;

import java.util.List;

public interface JuiceItemService {

    JuiceItemResponse createJuice(JuiceItemRequest request);

   JuiceItemResponse updateJuice(Long id, JuiceItemRequest request);

    JuiceItemResponse getJuiceById(Long id);

    List<JuiceItemResponse> getAllJuice();

    void deleteJuice(Long id);
}
