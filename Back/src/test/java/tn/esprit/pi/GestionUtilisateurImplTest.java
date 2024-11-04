package tn.esprit.pi;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import tn.esprit.pi.entities.Utilisateur;
import tn.esprit.pi.repository.IUtilisateurRepository;
import tn.esprit.pi.services.GestionUtilisateurImpl;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

public class GestionUtilisateurImplTest {

    @InjectMocks
    GestionUtilisateurImpl gestionUtilisateur;

    @Mock
    IUtilisateurRepository utilisateurRepository;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testRetrieveAllUtilisateurs() {
        Utilisateur utilisateur1 = new Utilisateur();
        Utilisateur utilisateur2 = new Utilisateur();
        when(utilisateurRepository.findAll()).thenReturn(Arrays.asList(utilisateur1, utilisateur2));

        List<Utilisateur> utilisateurs = gestionUtilisateur.retrieveAllUtilisateurs();

        assertEquals(2, utilisateurs.size());
        verify(utilisateurRepository, times(1)).findAll();
    }

    @Test
    public void testAddorUpdateUtilisateur() {
        Utilisateur utilisateur = new Utilisateur();
        when(utilisateurRepository.save(any(Utilisateur.class))).thenReturn(utilisateur);

        Utilisateur result = gestionUtilisateur.addorUpdateUtilisateur(utilisateur);

        assertNotNull(result);
        verify(utilisateurRepository, times(1)).save(utilisateur);
    }

    @Test
    public void testRemoveUtilisateur() {
        Long id = 1L;
        Utilisateur utilisateur = new Utilisateur();
        when(utilisateurRepository.findById(id)).thenReturn(Optional.of(utilisateur));

        gestionUtilisateur.removeUtilisateur(id);

        verify(utilisateurRepository, times(1)).delete(utilisateur);
    }

    @Test
    public void testRetrieveUtilisateur() {
        Long id = 1L;
        Utilisateur utilisateur = new Utilisateur();
        when(utilisateurRepository.findById(id)).thenReturn(Optional.of(utilisateur));

        Utilisateur result = gestionUtilisateur.retrieveUtilisateur(id);

        assertNotNull(result);
        verify(utilisateurRepository, times(1)).findById(id);
    }

    @Test
    public void testRecupérationMDP() {
        String email = "test@example.com";
        String numTel = "123456789";
        Utilisateur utilisateur = new Utilisateur();
        utilisateur.setId(1L);
        when(utilisateurRepository.findByEmailAndAndNumTel(email, numTel)).thenReturn(utilisateur);

        Long result = gestionUtilisateur.recupérationMDP(email, numTel);

        assertEquals(1L, result);
        verify(utilisateurRepository, times(1)).findByEmailAndAndNumTel(email, numTel);
    }

    @Test
    public void testFindUtilisateurById() {
        long id = 1L;
        Utilisateur utilisateur = new Utilisateur();
        when(utilisateurRepository.findUtilisateurById(id)).thenReturn(utilisateur);

        Utilisateur result = gestionUtilisateur.findUtilisateurById(id);

        assertNotNull(result);
        verify(utilisateurRepository, times(1)).findUtilisateurById(id);
    }
}
