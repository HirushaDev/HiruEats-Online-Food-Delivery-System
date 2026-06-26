package in.hirueats_online_food_delivery_system.backend.Service;

import in.hirueats_online_food_delivery_system.backend.Entity.UserEntity;
import in.hirueats_online_food_delivery_system.backend.IO.ProfileRequest;
import in.hirueats_online_food_delivery_system.backend.IO.ProfileResponse;


import java.util.List;

public interface ProfileService {

      ProfileResponse createProfile(ProfileRequest request);

      ProfileResponse getProfile(String email);

      void sendResetOtp(String email);

      void resetPassword(String email, String otp, String newPassword);

      String getLoggedUserId(String email);

      void sendOtp(String email);

      void verifyOtp(String email, String otp);

      void makeAdmin(String userId);

       List<UserEntity> getAllUsers();

       in.hirueats_online_food_delivery_system.backend.IO.UserManagementResponse toggleUserStatus(Long id);

       void deleteUser(Long id);

       List<in.hirueats_online_food_delivery_system.backend.IO.UserManagementResponse> getAllUsersForAdmin();

}
