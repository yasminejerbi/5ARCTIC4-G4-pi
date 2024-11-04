package tn.esprit.pi.services;

import static org.junit.jupiter.api.Assertions.*;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import tn.esprit.pi.entities.Recrutement;
import tn.esprit.pi.repository.IRecrutementRepository;

import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

class GestionRecrutementImplTest {

    @InjectMocks
    GestionRecrutementImpl gestionRecrutement;

    @Mock
    IRecrutementRepository recRepository;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this); // Initialize mocks
    }

    @Test
    void testRetrieveAllRecrutement() {
        // Arrange: Mock the behavior of the repository
        Recrutement rec1 = new Recrutement();
        Recrutement rec2 = new Recrutement();
        List<Recrutement> mockRecrutements = Arrays.asList(rec1, rec2);
        when(recRepository.findAll()).thenReturn(mockRecrutements);

        // Act: Call the method
        List<Recrutement> result = gestionRecrutement.retrieveAllRecrutement();

        // Assert: Verify the results
        assertEquals(2, result.size());
        verify(recRepository, times(1)).findAll();  // Ensure the method was called once
    }

    @Test
    void testAddOrUpdateRecrutement() {
        // Arrange: Mock the behavior of the repository
        Recrutement recrutement = new Recrutement();
        when(recRepository.save(recrutement)).thenReturn(recrutement);

        // Act: Call the method
        Recrutement result = gestionRecrutement.addorUpdateRecrutement(recrutement);

        // Assert: Verify the results
        assertEquals(recrutement, result);
        verify(recRepository, times(1)).save(recrutement);  // Ensure the method was called once
    }
}
