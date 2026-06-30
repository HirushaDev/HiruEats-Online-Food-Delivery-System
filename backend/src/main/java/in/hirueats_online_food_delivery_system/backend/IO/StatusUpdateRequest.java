package in.hirueats_online_food_delivery_system.backend.IO;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class StatusUpdateRequest {
    @NotBlank(message = "Status is required")
    private String status;
}
