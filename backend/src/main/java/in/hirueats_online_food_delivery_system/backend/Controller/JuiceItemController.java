package in.hirueats_online_food_delivery_system.backend.Controller;


import in.hirueats_online_food_delivery_system.backend.IO.FoodItemRequest;
import in.hirueats_online_food_delivery_system.backend.IO.FoodItemResponse;
import in.hirueats_online_food_delivery_system.backend.IO.JuiceItemRequest;
import in.hirueats_online_food_delivery_system.backend.IO.JuiceItemResponse;
import in.hirueats_online_food_delivery_system.backend.Service.JuiceItemService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/hirueats/juices")
@RequiredArgsConstructor
public class JuiceItemController {

     private final JuiceItemService service;

    @PostMapping
    public ResponseEntity<JuiceItemResponse> createJuice(@Valid @RequestBody JuiceItemRequest request) {
        return new ResponseEntity<>(service.createJuice(request), HttpStatus.CREATED);
    }

    @PostMapping(value = "/upload", consumes = "multipart/form-data")
    public ResponseEntity<?> uploadJuice(
            @RequestParam("juiceName") String juiceName,
            @RequestParam("description") String description,
            @RequestParam("price") Double price,
            @RequestParam("category") String category,
            @RequestParam(value = "discount", required = false, defaultValue = "0") Double discount,
            @RequestParam("available") Boolean available,
            @RequestParam(value = "image", required = false) MultipartFile image
    ) {
        try {
            String imageUrl = null;
            if (image != null && !image.isEmpty()) {
                String uploadDir = "src/main/resources/static/Images/";
                Path uploadPath = Paths.get(uploadDir);
                if (!Files.exists(uploadPath)) {
                    Files.createDirectories(uploadPath);
                }
                String originalFilename = image.getOriginalFilename();
                String extension = originalFilename != null && originalFilename.contains(".")
                        ? originalFilename.substring(originalFilename.lastIndexOf("."))
                        : ".jpg";
                String uniqueFilename = UUID.randomUUID().toString() + extension;
                Path filePath = uploadPath.resolve(uniqueFilename);
                Files.copy(image.getInputStream(), filePath);
                imageUrl = "/Images/" + uniqueFilename;
            }

            JuiceItemRequest request = new JuiceItemRequest();
            request.setJuiceName(juiceName);
            request.setDescription(description);
            request.setPrice(price);
            request.setCategory(category);
            request.setDiscount(discount);
            request.setAvailable(available);
            request.setImageUrl(imageUrl);
            request.setJuiceCategory("juice");

            JuiceItemResponse response = service.createJuice(request);
            return new ResponseEntity<>(response, HttpStatus.CREATED);

        } catch (IOException e) {
            Map<String, Object> error = new HashMap<>();
            error.put("error", true);
            error.put("message", "Failed to upload image: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        } catch (Exception e) {
            Map<String, Object> error = new HashMap<>();
            error.put("error", true);
            error.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
        }
    }

    @GetMapping
    public ResponseEntity<List<JuiceItemResponse>> getAllJuice() {
        return ResponseEntity.ok(service.getAllJuice());
    }

    @GetMapping("/{id}")
    public ResponseEntity<JuiceItemResponse> getJuiceById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getJuiceById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<JuiceItemResponse> updateJuice(
            @PathVariable Long id,
            @Valid @RequestBody JuiceItemRequest request
    ) {
        return ResponseEntity.ok(service.updateJuice(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteJuice(@PathVariable Long id) {
        service.deleteJuice(id);
        return ResponseEntity.noContent().build();
    }
}
