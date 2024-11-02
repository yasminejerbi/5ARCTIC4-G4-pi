
package tn.esprit.pi;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.context.SpringBootTest;
import tn.esprit.pi.entities.Forum;
import tn.esprit.pi.repository.IForumRepository;
import tn.esprit.pi.services.GestionForumImpl;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.*;
@SpringBootTest
public class GestionForumImplTest {

    @Mock
    private IForumRepository forumRepository;

    @InjectMocks
    private GestionForumImpl gestionForum;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testRetrieveAllForum() {
        // Arrange
        Forum forum1 = new Forum(1L, "Forum 1", "Description 1", null);
        Forum forum2 = new Forum(2L, "Forum 2", "Description 2", null);
        List<Forum> expectedForums = Arrays.asList(forum1, forum2);

        when(forumRepository.findAll()).thenReturn(expectedForums);

        // Act
        List<Forum> actualForums = gestionForum.retrieveAllForum();

        // Assert
        assertEquals(expectedForums.size(), actualForums.size());
        verify(forumRepository, times(1)).findAll();
    }

    @Test
    void testAddOrUpdateForum() {
        // Arrange
        Forum forum = new Forum(1L, "New Forum", "New Description", null);
        when(forumRepository.save(forum)).thenReturn(forum);

        // Act
        Forum savedForum = gestionForum.addorUpdateForum(forum);

        // Assert
        assertNotNull(savedForum);
        assertEquals("New Forum", savedForum.getNomForum());
        verify(forumRepository, times(1)).save(forum);
    }

    @Test
    void testRemoveForum() {
        // Arrange
        long forumId = 1L;
        Forum forum = new Forum(forumId, "Forum to delete", "Description", null);
        when(forumRepository.findById(forumId)).thenReturn(Optional.of(forum));

        // Act
        gestionForum.removeForum(forumId);

        // Assert
        verify(forumRepository, times(1)).delete(forum);
    }

    @Test
    void testRetrieveForum() {
        // Arrange
        long forumId = 1L;
        Forum forum = new Forum(forumId, "Retrieved Forum", "Description", null);
        when(forumRepository.findById(forumId)).thenReturn(Optional.of(forum));

        // Act
        Forum retrievedForum = gestionForum.retrieveForum(forumId);

        // Assert
        assertNotNull(retrievedForum);
        assertEquals(forumId, retrievedForum.getId());
        verify(forumRepository, times(1)).findById(forumId);
    }
}

