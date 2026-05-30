package in.hirueats_online_food_delivery_system.backend.Service;

import in.hirueats_online_food_delivery_system.backend.IO.ProfileRequest;
import in.hirueats_online_food_delivery_system.backend.IO.ProfileResponse;

public interface ProfileService {

      ProfileResponse createProfile(ProfileRequest request);

      ProfileResponse getProfile(String email);

      void sendResetOtp(String email);

      void resetPassword(String email, String otp, String newPassword);

      String getLoggedUserId(String email);

      void sendOtp(String email);

}
