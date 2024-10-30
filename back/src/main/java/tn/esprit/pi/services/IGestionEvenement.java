package tn.esprit.pi.services;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.web.multipart.MultipartFile;
import tn.esprit.pi.entities.Evenement;

import java.util.List;

public interface IGestionEvenement {
    public List<Evenement> retrieveAllEvenement();
    public Evenement addorUpdateEvenement (Evenement evenement);
    public void UpdateEvenement (Evenement evenement);
    public void removeEvenement (Long idEvenement);
    public Evenement retrieveEvenement (Long idEvenement);
    public void removeSponsorsFromEventbyId(Long idEvent, Long idSponsors);
    public void deleteExpiredEvents();
}
