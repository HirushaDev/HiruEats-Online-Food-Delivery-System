package in.hirueats_online_food_delivery_system.backend.IO;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class FeedbackResponse {

    private Long id;

    private String customerName;

    private String email;

    private Integer rating;

    private String message;

    private LocalDateTime createdAt;
}
