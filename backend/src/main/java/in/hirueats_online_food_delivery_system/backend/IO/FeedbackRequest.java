package in.hirueats_online_food_delivery_system.backend.IO;

import lombok.Data;

@Data
public class FeedbackRequest {

    private String customerName;

    private String email;

    private Integer rating;

    private String message;
}
