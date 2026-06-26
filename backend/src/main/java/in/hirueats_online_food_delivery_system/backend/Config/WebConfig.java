package in.hirueats_online_food_delivery_system.backend.Config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // Serve uploaded images from the filesystem
        registry.addResourceHandler("/Images/**")
                .addResourceLocations("classpath:/static/Images/", "file:src/main/resources/static/Images/");
    }
}
