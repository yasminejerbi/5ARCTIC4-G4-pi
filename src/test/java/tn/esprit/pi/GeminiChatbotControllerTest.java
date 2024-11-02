package tn.esprit.pi;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.when;

import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.mock.web.MockServletContext;
import tn.esprit.pi.controller.GeminiChatbotController;

@SpringBootTest
@ActiveProfiles("test")
public class GeminiChatbotControllerTest {

    @Mock
    private RestTemplate restTemplate;

    @InjectMocks
    private GeminiChatbotController geminiChatbotController;

    private Map<String, String> requestBody;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.openMocks(this);
        requestBody = new HashMap<>();
    }

    @Test
    public void testGenerateContent_ResponseNotNull() {
        // Arrange
        ResponseEntity<String> mockResponse = ResponseEntity.ok("Some response from Gemini API");
        when(restTemplate.postForEntity(anyString(), any(HttpEntity.class), eq(String.class)))
                .thenReturn(mockResponse);

        // Act
        requestBody.put("userText", "hello");
        ResponseEntity<String> result = geminiChatbotController.generateContent(requestBody);

        // Assert
        assertNotNull(result, "Response should not be null");
        assertNotNull(result.getBody(), "Response body should not be null");
        assertEquals(HttpStatus.OK, result.getStatusCode());
    }

    @Test
    public void testGenerateContent_EmptyInput() {
        // Act
        ResponseEntity<String> result = geminiChatbotController.generateContent(new HashMap<>());

        // Assert
        assertNotNull(result, "Response should not be null");
        assertNotNull(result.getBody(), "Response body should not be null");
        assertEquals(HttpStatus.OK, result.getStatusCode());
    }
}
