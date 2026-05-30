package in.hirueats_online_food_delivery_system.backend.Service;

import in.hirueats_online_food_delivery_system.backend.Entity.UserEntity;
import in.hirueats_online_food_delivery_system.backend.IO.ProfileRequest;
import in.hirueats_online_food_delivery_system.backend.IO.ProfileResponse;
import in.hirueats_online_food_delivery_system.backend.Repostory.UserRepostory;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.UUID;
import java.util.concurrent.ThreadLocalRandom;

@Service
@RequiredArgsConstructor
public class ProfileServiceImpl implements ProfileService {

    private final UserRepostory userRepostory;
    private final PasswordEncoder passwordEncoder;
    private final EmailService emailService;

    @Override
    public ProfileResponse createProfile(ProfileRequest request) {

        UserEntity newProfile = convertToUserEntity(request);
        if (!userRepostory.existsByEmail(request.getEmail())) {
            newProfile = userRepostory.save(newProfile);
            return convertToProfileResponse(newProfile);
        }
        throw new ResponseStatusException(HttpStatus.CONFLICT, "Email already exists");

    }

    @Override
    public ProfileResponse getProfile(String email) {
        UserEntity existingUser = userRepostory.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found" + email));
        return convertToProfileResponse(existingUser);
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
        return UserEntity.builder()
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

    @Override
    public void sendResetOtp(String email) {
        UserEntity existingUser = userRepostory.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found" + email));

        // Generate 6 digit otp
        String otp = String.valueOf(ThreadLocalRandom.current().nextInt(100000, 1000000));
        // Set otp expired time 5 minutes
        long expiryTime = System.currentTimeMillis() + 5 * 60 * 1000;
        // Update user with otp and expired time
        existingUser.setResetOtp(otp);
        existingUser.setResetOtpExpiredAt(expiryTime);
        userRepostory.save(existingUser);

        try {
            emailService.sendResetOtpEmail(existingUser.getEmail(), existingUser.getName(), otp);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to send OTP");
        }
    }

    @Override
    public void resetPassword(String email, String otp, String newPassword) {
        UserEntity existingUser = userRepostory.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found" + email));

        if (existingUser.getResetOtp() == null || !existingUser.getResetOtp().equals(otp)) {
            throw new RuntimeException("Invalid OTP");
        }

        if (existingUser.getResetOtpExpiredAt() < System.currentTimeMillis()) {
            throw new RuntimeException("OTP has expired");
        }

        existingUser.setPassword(passwordEncoder.encode(newPassword));
        existingUser.setResetOtp(null);
        existingUser.setResetOtpExpiredAt(0L);
        userRepostory.save(existingUser);

    }

    @Override
    public String getLoggedUserId(String email) {
        UserEntity existingUser = userRepostory.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found" + email));
        return existingUser.getUserId();
    }

    @Override
    public void sendOtp(String email) {
        UserEntity existingUser = userRepostory.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found" + email));

        if (existingUser.getIsAccountVerified() != null && existingUser.getIsAccountVerified()) {
            throw new RuntimeException("Account is already verified");
        }
        // Generate 6 digit otp
        String otp = String.valueOf(ThreadLocalRandom.current().nextInt(100000, 1000000));
        // Set otp expired time 24 Hours
        long expiryTime = System.currentTimeMillis() + 24 * 60 * 60 * 1000;
        // Update user with otp and expired time
        existingUser.setVerifyOtp(otp);
        existingUser.setVerifyOtpExpireAt(expiryTime);
        userRepostory.save(existingUser);

        try {
            emailService.sendOtpEmail(existingUser.getEmail(), existingUser.getName(), otp);
        } catch (Exception e) {
            System.err.println(" [ProfileServiceImpl.sendOtp] Failed to send OTP email");
            System.err.println("   Email: " + existingUser.getEmail());
            System.err.println("   Exception: " + e.getMessage());
            e.printStackTrace();
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to send OTP");
        }
    }

}
