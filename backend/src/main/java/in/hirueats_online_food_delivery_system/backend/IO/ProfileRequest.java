package in.hirueats_online_food_delivery_system.backend.IO;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ProfileRequest {

     private String name;
     private String email;
     private String password;
}
