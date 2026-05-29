package in.hirueats_online_food_delivery_system.backend.IO;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class AuthResponse {

     private String email;
     private String token;

}
