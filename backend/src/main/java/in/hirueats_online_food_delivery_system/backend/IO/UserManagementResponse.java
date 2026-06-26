package in.hirueats_online_food_delivery_system.backend.IO;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class UserManagementResponse {
    private Long id;
    private String userId;
    private String name;
    private String email;
    private String role;
    private Boolean isAccountVerified;
    private Boolean isAccountDisabled;
    private LocalDateTime createdAt;
}
