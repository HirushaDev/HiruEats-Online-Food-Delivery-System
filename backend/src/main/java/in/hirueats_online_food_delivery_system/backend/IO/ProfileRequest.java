package in.hirueats_online_food_delivery_system.backend.IO;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ProfileRequest {

    @NotBlank(message = "Name cannot be blank")
     private String name;
    @Email(message = "Email should be valid")
    @NotNull(message = "Email cannot be null")
     private String email;
    @Size(min = 6, message = "Password must be at least 6 characters long")
     private String password;
}
