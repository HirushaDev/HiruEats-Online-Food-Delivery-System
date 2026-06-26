package in.hirueats_online_food_delivery_system.backend.Entity;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.security.Timestamp;
import java.time.LocalDateTime;

@Entity
@Table(name = "users")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
     private Long id;
    @Column(unique = true)
     private String userId;
     private String name;
     @Column(unique = true)
     private String email;
     private String password;
     private String verifyOtp;
     private Boolean isAccountVerified;
     private Long verifyOtpExpireAt;
     private String resetOtp;
     private Long resetOtpExpiredAt;

     @CreationTimestamp
     @Column(updatable = false)
     private LocalDateTime createdAt;
     @UpdateTimestamp
     private LocalDateTime updatedAt;

    @Enumerated(EnumType.STRING)
    @Column(columnDefinition = "VARCHAR(10)")
    private Role role;

    @Builder.Default
    private Boolean isAccountDisabled = false;
}
