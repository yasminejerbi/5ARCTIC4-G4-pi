package tn.esprit.pi.services;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

import java.time.LocalDate;
import java.util.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import tn.esprit.pi.entities.Evenement;
import tn.esprit.pi.entities.Utilisateur;
import tn.esprit.pi.repository.IEvenementRepository;
import tn.esprit.pi.repository.ISponsorsRepository;
import tn.esprit.pi.repository.IUtilisateurRepository;

class GestionEvenementImplTest {

    @InjectMocks
    private GestionEvenementImpl gestionEvenement;

    @Mock
    private IEvenementRepository evenementRepository;

    @Mock
    private ISponsorsRepository sponsorsRepository;
    @Mock
    private IUtilisateurRepository utilisateurRepository;
    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testRetrieveAllEvenement() {
        List<Evenement> mockEvents = new ArrayList<>();
        mockEvents.add(new Evenement(1L, "Event 1", LocalDate.now(), LocalDate.now().plusDays(5)));
        when(evenementRepository.findAll()).thenReturn(mockEvents);

        List<Evenement> events = gestionEvenement.retrieveAllEvenement();

        assertEquals(1, events.size());
        assertEquals("Event 1", events.get(0).getNomEvenement());
    }

    @Test
    void testAddOrUpdateEvenement_NewEvent() {
        Evenement newEvent = new Evenement(2L, "New Event", LocalDate.now(), LocalDate.now().plusDays(2));
        when(evenementRepository.save(newEvent)).thenReturn(newEvent);

        Evenement savedEvent = gestionEvenement.addorUpdateEvenement(newEvent);

        assertNotNull(savedEvent);
        assertEquals(newEvent.getId(), savedEvent.getId());
        verify(evenementRepository, times(1)).save(newEvent);
    }

    @Test
    void testRemoveEvenement() {
        Evenement event = new Evenement(3L, "Event to Delete", LocalDate.now(), LocalDate.now().plusDays(3));
        when(evenementRepository.findById(event.getId())).thenReturn(Optional.of(event));

        gestionEvenement.removeEvenement(event.getId());

        verify(evenementRepository, times(1)).delete(event);
    }
    @Test
    public void testAssignUserToEvent_Success() {
        Long eventId = 1L;
        Long userId = 1L;

        // Create an event and user
        Evenement event = new Evenement();
        event.setId(eventId);
        event.setUtilisateurs(new ArrayList<>());

        Utilisateur user = new Utilisateur();
        user.setId(userId);

        // Mocking the behavior of the repositories
        when(evenementRepository.findById(eventId)).thenReturn(Optional.of(event));
        when(utilisateurRepository.findById(userId)).thenReturn(Optional.of(user));

        // Call the method to assign the user to the event
        gestionEvenement.assignUserToEvent(eventId, userId);

        // Assert that the user was added to the event's user list
        assertTrue(event.getUtilisateurs().contains(user), "User should be assigned to the event");

        // Verify that the save method was called on the repository
        verify(evenementRepository, times(1)).save(event); // Verify save was called once
    }

}

