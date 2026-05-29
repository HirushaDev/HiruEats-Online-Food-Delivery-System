package in.hirueats_online_food_delivery_system.backend.Service;

import in.hirueats_online_food_delivery_system.backend.Entity.UserEntity;
import in.hirueats_online_food_delivery_system.backend.IO.ProfileRequest;
import in.hirueats_online_food_delivery_system.backend.IO.ProfileResponse;
import in.hirueats_online_food_delivery_system.backend.Repostory.UserRepostory;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ProfileServiceImpl implements  ProfileService{

      private final UserRepostory userRepostory;
    private final PasswordEncoder passwordEncoder;
      


    @Override
    public ProfileResponse createProfile(ProfileRequest request) {

        UserEntity newProfile = convertToUserEntity(request);
        if(!userRepostory.existsByEmail(request.getEmail())) {
            newProfile = userRepostory.save(newProfile);
            return convertToProfileResponse(newProfile);
        }
        throw  new ResponseStatusException(HttpStatus.CONFLICT,"Email already exists");


    }

    private ProfileResponse convertToProfileResponse(UserEntity newProfile) {
       return ProfileResponse.builder()
                .name(newProfile.getName())
                .email(newProfile.getEmail())
                .userId(newProfile.getUserId())
                .isAccountVerified(newProfile.getIsAccountVerified())
                .build();

    }

    private UserEntity convertToUserEntity(ProfileRequest request) {
      return  UserEntity.builder()
                .email(request.getEmail())
                .userId(UUID.randomUUID().toString())
                .name(request.getName())
                                .password(passwordEncoder.encode(request.getPassword()))
                .isAccountVerified(false)
                .resetOtpExpiredAt(0L)
                .verifyOtp(null)
                .verifyOtpExpireAt(0L)
                .resetOtp(null)
                .build();

    }
}
