package in.hirueats_online_food_delivery_system.backend.Service;

import in.hirueats_online_food_delivery_system.backend.Entity.JuiceItem;
import in.hirueats_online_food_delivery_system.backend.IO.JuiceItemRequest;
import in.hirueats_online_food_delivery_system.backend.IO.JuiceItemResponse;
import in.hirueats_online_food_delivery_system.backend.Repostory.JuiceItemRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
@AllArgsConstructor
public class JuiceItemServiceImpl  implements  JuiceItemService{

     private final JuiceItemRepository repository;

    @Override
    public JuiceItemResponse createJuice(JuiceItemRequest request) {
        if(!repository.existsByJuiceName(request.getJuiceName())) {
            JuiceItem juiceItem = convertToJuiceItemEntity(request);
            juiceItem = repository.save(juiceItem);
            return convertToJuiceItemResponse(juiceItem);
        }
        throw new ResponseStatusException( HttpStatus.CONFLICT, "Juice item already exists" );
    }

    @Override
    public JuiceItemResponse updateJuice(Long id, JuiceItemRequest request) {
        JuiceItem existingJuice = repository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Juice item not found"
                ));
        // optional: duplicate name check (if name changing)
        if (!existingJuice.getJuiceName().equals(request.getJuiceName())
                && repository.existsByJuiceName(request.getJuiceName())) {

            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "Juice name already exists"
            );
        }
        existingJuice.setJuiceName(request.getJuiceName());
        existingJuice.setDescription(request.getDescription());
        existingJuice.setPrice(request.getPrice());
        existingJuice.setCategory(request.getCategory());
        existingJuice.setImageUrl(request.getImageUrl());
        existingJuice.setJuiceCategory(request.getJuiceCategory());
        existingJuice.setAvailable(request.getAvailable());
        existingJuice.setDiscount(request.getDiscount());

        JuiceItem updatedJuice = repository.save(existingJuice);

        return convertToJuiceItemResponse(updatedJuice);
    }

    @Override
    public JuiceItemResponse getJuiceById(Long id) {
        JuiceItem juiceItem = repository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Juice item not found with id: " + id
                ));

        return convertToJuiceItemResponse(juiceItem);
    }

    @Override
    public List<JuiceItemResponse> getAllJuice() {
        List<JuiceItem> juiceItems = repository.findAll();

        return juiceItems.stream()
                .map(this::convertToJuiceItemResponse)
                .toList();
    }

    @Override
    public void deleteJuice(Long id) {
        JuiceItem juiceItem = repository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Juice item not found with id: " + id
                ));

        repository.delete(juiceItem);
    }


    private JuiceItem convertToJuiceItemEntity(JuiceItemRequest request) {
        return JuiceItem.builder()
                .juiceName(request.getJuiceName())
                .description(request.getDescription())
                .price(request.getPrice())
                .category(request.getCategory())
                .imageUrl(request.getImageUrl())
                .juiceCategory(request.getJuiceCategory())
                .available(request.getAvailable())
                .discount(request.getDiscount())
                .build(); }

    private JuiceItemResponse convertToJuiceItemResponse(JuiceItem juiceItem) {
        return JuiceItemResponse.builder()
                .id(juiceItem.getId())
                .juiceName(juiceItem.getJuiceName())
                .description(juiceItem.getDescription())
                .price(juiceItem.getPrice())
                .category(juiceItem.getCategory())
                .imageUrl(juiceItem.getImageUrl())
                .juiceCategory(juiceItem.getJuiceCategory())
                .available(juiceItem.getAvailable())
                .discount(juiceItem.getDiscount())
                .build(); }
}
