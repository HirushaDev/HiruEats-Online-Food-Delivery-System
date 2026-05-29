package in.hirueats_online_food_delivery_system.backend.Controller;

import in.hirueats_online_food_delivery_system.backend.IO.ProfileRequest;
import in.hirueats_online_food_delivery_system.backend.IO.ProfileResponse;
import in.hirueats_online_food_delivery_system.backend.Service.ProfileService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
public class ProfileController {

     private final ProfileService profileService;

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
      public ProfileResponse register(@Valid @RequestBody ProfileRequest request) {
        ProfileResponse response = profileService.createProfile(request);
        //TODO:Welcome Email

        return response;

    }

    @GetMapping("/test")
    public String test() {
        return "Auth is Working";
    }


}
