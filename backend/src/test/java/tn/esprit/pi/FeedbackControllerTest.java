package tn.esprit.pi;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import tn.esprit.pi.controller.FeedbackController;
import tn.esprit.pi.entities.Feedback;
import tn.esprit.pi.services.IGestionFeedback;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.mock.web.MockServletContext;

@SpringBootTest
class FeedbackControllerTest {

    @Mock
    private IGestionFeedback iGestionFeedback;

    @InjectMocks
    private FeedbackController feedbackController;

    private MockMvc mockMvc;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        mockMvc = MockMvcBuilders.standaloneSetup(feedbackController).build();
    }

    @Test
    public void testSearchReclamation() throws Exception {
        // Arrange
        Feedback feedback1 = new Feedback(
                1L,
                "John Doe",
                "Description containing keyword",
                LocalDate.now(),
                Feedback.CategorieType.negatif
        );
        Feedback feedback2 = new Feedback(
                2L,
                "Jane Smith",
                "Another description",
                LocalDate.now(),
                Feedback.CategorieType.positif
        );
        Feedback feedback3 = new Feedback(
                3L,
                "Keyword Johnson",
                "Description without keyword",
                LocalDate.now(),
                Feedback.CategorieType.neutre
        );

        List<Feedback> allFeedbacks = Arrays.asList(feedback1, feedback2, feedback3);
        List<Feedback> expectedResults = Arrays.asList(feedback1, feedback3);

        when(iGestionFeedback.retrieveAllFeeddbacks()).thenReturn(allFeedbacks);

        // Act & Assert
        mockMvc.perform(get("/feedback/searchReclamation?keyword=keyword")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].name").value("John Doe"))
                .andExpect(jsonPath("$[1].name").value("Keyword Johnson"));
    }
}
