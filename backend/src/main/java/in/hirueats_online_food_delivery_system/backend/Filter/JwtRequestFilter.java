package in.hirueats_online_food_delivery_system.backend.Filter;

import in.hirueats_online_food_delivery_system.backend.Service.AppUserDetailsService;
import in.hirueats_online_food_delivery_system.backend.Util.JwtUtil;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;

@Component
@RequiredArgsConstructor
public class JwtRequestFilter extends OncePerRequestFilter {

    private final AppUserDetailsService appUserDetailsService;
    private final JwtUtil jwtUtil;

    private static final List<String> PUBLIC_URL = List.of("/login", "/register", "/send-reset-otp", "/reset-password",
            "/logout", "/admin/login");

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        String path = request.getServletPath();

        if (PUBLIC_URL.contains(path) || path.startsWith("/Images/")) {
            filterChain.doFilter(request, response);
            return;
        }
        String jwt = null;
        String email = null;

        // 1. check if the request has authorization header
        final String authorizationHeader = request.getHeader("Authorization");

        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            jwt = authorizationHeader.substring(7);
        }
        // 2. If not found in header, check in cookies
        if (jwt == null) {
            if (request.getCookies() != null) {
                for (var cookie : request.getCookies()) {
                    if (cookie.getName().equals("jwt")) {
                        jwt = cookie.getValue();
                        break;
                    }
                }
            }
        }

        // 3. validate the token and set the authentication in the context
        if (jwt != null) {
            try {
                email = jwtUtil.extractEmail(jwt);
                if (email != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                    UserDetails userDetails = appUserDetailsService.loadUserByUsername(email);
                    if (jwtUtil.validToken(jwt, userDetails)) {
                        UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(
                                userDetails, null, userDetails.getAuthorities());
                        usernamePasswordAuthenticationToken
                                .setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                        SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
                    }
                }
            } catch (io.jsonwebtoken.ExpiredJwtException e) {
                // Token expired — clear the cookie so the client is prompted to re-login
                jakarta.servlet.http.Cookie expiredCookie = new jakarta.servlet.http.Cookie("jwt", null);
                expiredCookie.setPath("/");
                expiredCookie.setMaxAge(0);
                expiredCookie.setHttpOnly(true);
                response.addCookie(expiredCookie);
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                response.setContentType("application/json");
                response.getWriter().write("{\"error\":true,\"message\":\"JWT token has expired. Please log in again.\"}");
                return;
            } catch (Exception e) {
                // Invalid token — skip authentication, let Spring Security return 401/403
            }
        }
        filterChain.doFilter(request, response);
    }
}
