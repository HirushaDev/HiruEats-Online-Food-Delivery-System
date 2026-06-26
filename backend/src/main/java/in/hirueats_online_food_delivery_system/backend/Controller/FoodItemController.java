package in.hirueats_online_food_delivery_system.backend.Controller;

import in.hirueats_online_food_delivery_system.backend.IO.FoodItemRequest;
import in.hirueats_online_food_delivery_system.backend.IO.FoodItemResponse;
import in.hirueats_online_food_delivery_system.backend.Service.FoodItemService;
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
@RequestMapping("/hirueats/foods")
@RequiredArgsConstructor
public class FoodItemController {

     private final FoodItemService service;

     @PostMapping
    public ResponseEntity<FoodItemResponse> createFood(@Valid @RequestBody FoodItemRequest request) {
        return new ResponseEntity<>(service.createFood(request), HttpStatus.CREATED);
    }

     @PostMapping(value = "/upload", consumes = "multipart/form-data")
     public ResponseEntity<?> uploadFood(
               @RequestParam("foodName") String foodName,
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

               FoodItemRequest request = new FoodItemRequest();
               request.setFoodName(foodName);
               request.setDescription(description);
               request.setPrice(price);
               request.setCategory(category);
               request.setDiscount(discount);
               request.setAvailable(available);
               request.setImageUrl(imageUrl);
               request.setFoodCategory("food");

               FoodItemResponse response = service.createFood(request);
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
    public ResponseEntity<List<FoodItemResponse>> getAllFoods() {
        return ResponseEntity.ok(service.getAllFoods());
    }

    @GetMapping("/{id}")
    public ResponseEntity<FoodItemResponse> getFoodById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getFoodById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<FoodItemResponse> updateFood(
            @PathVariable Long id,
            @Valid @RequestBody FoodItemRequest request
    ) {
        return ResponseEntity.ok(service.updateFood(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFood(@PathVariable Long id) {
        service.deleteFood(id);
        return ResponseEntity.noContent().build();
    }


}
