package in.hirueats_online_food_delivery_system.backend.Service;

import in.hirueats_online_food_delivery_system.backend.Entity.UserEntity;
import in.hirueats_online_food_delivery_system.backend.Repostory.UserRepostory;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AppUserDetailsService implements UserDetailsService {

    private final UserRepostory userRepostory;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {

        UserEntity existingUser = userRepostory.findByEmail(email)
                .orElseThrow(() ->
                        new UsernameNotFoundException("Email not found " + email)
                );

        boolean isEnabled = existingUser.getIsAccountDisabled() == null || !existingUser.getIsAccountDisabled();

        return new User(
                existingUser.getEmail(),
                existingUser.getPassword(),
                isEnabled,
                true,
                true,
                true,
                List.of(
                        new SimpleGrantedAuthority("ROLE_" + existingUser.getRole())
                )
        );
    }
}