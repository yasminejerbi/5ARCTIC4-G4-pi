package tn.esprit.pi;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class PiApplication {
    private final static String IMAGE_UPLOAD_DIR = "/app/uploads/";
    public static void main(String[] args) {
        SpringApplication.run(PiApplication.class, args);
    }
    @Override
			public void addResourceHandlers(ResourceHandlerRegistry registry) {
				// Map the "/images/**" URL path to serve files from the IMAGE_UPLOAD_DIR
				registry.addResourceHandler("/app/uploads/**")
						.addResourceLocations("file:" + IMAGE_UPLOAD_DIR);
			}

}
