package tn.esprit.pi;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import tn.esprit.pi.entities.Sponsors;
import tn.esprit.pi.entities.Sponsoring_type;
import tn.esprit.pi.entities.MaterielType;
import tn.esprit.pi.repository.ISponsorRepository;
import tn.esprit.pi.services.GestionSponsorsImp;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class GestionSponsorImplTest {

    @Mock
    private ISponsorRepository sponsorRepository;

    @InjectMocks
    private GestionSponsorsImp gestionSponsorsImp;

    private Sponsors sponsor;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        sponsor = new Sponsors("SponsorName", "ImageURL", 12, 1000.0f, "email@example.com", "1234567890", Sponsoring_type.materiel, MaterielType.Laptop);
    }

    @Test
    void testRetrieveAllSponsors() {
        // Préparation des données
        List<Sponsors> sponsorsList = new ArrayList<>();
        sponsorsList.add(sponsor);

        // Configuration du comportement du mock
        when(sponsorRepository.findAll()).thenReturn(sponsorsList);

        // Appel de la méthode à tester
        List<Sponsors> result = gestionSponsorsImp.retrieveAllSponsors();

        // Vérification des résultats
        assertNotNull(result);
        assertEquals(1, result.size());
        assertEquals("SponsorName", result.get(0).getNomSponsor());
        verify(sponsorRepository, times(1)).findAll();
    }

    @Test
    void testAddOrUpdateSponsors() {
        // Configuration du comportement du mock
        when(sponsorRepository.save(sponsor)).thenReturn(sponsor);

        // Appel de la méthode à tester
        Sponsors result = gestionSponsorsImp.addorUpdateSponsors(sponsor);

        // Vérification des résultats
        assertNotNull(result);
        assertEquals("SponsorName", result.getNomSponsor());
        verify(sponsorRepository, times(1)).save(sponsor);
    }

    @Test
    void testRemoveSponsors() {
        // Configuration du comportement du mock
        when(sponsorRepository.findById(sponsor.getId())).thenReturn(Optional.of(sponsor));
        doNothing().when(sponsorRepository).delete(sponsor);

        // Appel de la méthode à tester
        gestionSponsorsImp.removeSponsors(sponsor.getId());

        // Vérification des résultats
        verify(sponsorRepository, times(1)).delete(sponsor);
        verify(sponsorRepository, times(1)).findById(sponsor.getId());
    }

    @Test
    void testRetrieveSponsors() {
        // Configuration du comportement du mock
        when(sponsorRepository.findById(sponsor.getId())).thenReturn(Optional.of(sponsor));

        // Appel de la méthode à tester
        Sponsors result = gestionSponsorsImp.retrieveSponsors(sponsor.getId());

        // Vérification des résultats
        assertNotNull(result);
        assertEquals("SponsorName", result.getNomSponsor());
        verify(sponsorRepository, times(1)).findById(sponsor.getId());
    }
}
