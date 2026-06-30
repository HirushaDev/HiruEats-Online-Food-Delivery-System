package in.hirueats_online_food_delivery_system.backend.IO;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class ContactResponse {

    private Long id;
    private String name;
    private String email;
    private String message;
    private String status;
    private LocalDateTime createdAt;
}
