package tn.esprit.pi.services;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import tn.esprit.pi.entities.Evenement;
import tn.esprit.pi.entities.Utilisateur;
import tn.esprit.pi.repository.IEvenementRepository;
import tn.esprit.pi.repository.ISponsorsRepository;

import java.time.LocalDate;

import java.util.List;


import lombok.extern.slf4j.Slf4j;
import tn.esprit.pi.repository.IUtilisateurRepository;

@Slf4j
@Service

public class GestionEvenementImpl implements IGestionEvenement{


    @Autowired
    IEvenementRepository evenementRepository;
    @Autowired
    ISponsorsRepository sponsorsRepository;
    @Autowired
    IUtilisateurRepository utilisateurRepository;
    private static final Logger logger = LogManager.getLogger(GestionEvenementImpl.class);


    @Override
    public void removeSponsorsFromEventbyId(Long idEvent,Long idSponsors){
        Evenement evenement=evenementRepository.findById(idEvent).get();
        evenement.getSponsors().remove(sponsorsRepository.findById(idSponsors));
        evenementRepository.save(evenement);
    }
    public List<Evenement> retrieveAllEvenement(){
        return (List<Evenement>) evenementRepository.findAll();
    }


    public Evenement addorUpdateEvenement (Evenement evenement){
            // Check if the event already exists in the database
            for(Evenement e:evenementRepository.findAll()){
                if(e.getId() == evenement.getId()){
                    e = evenement;

                    return evenementRepository.save(e);
                }

            }
            return evenementRepository.save(evenement);

    }
    public void removeEvenement (Long idEvenement){
        evenementRepository.delete(evenementRepository.findById(idEvenement).get());
    }
    public Evenement retrieveEvenement (Long idEvenement){
        return evenementRepository.findById(idEvenement).get();
    }
    @Override
    public void UpdateEvenement(Evenement evenement){
        evenementRepository.updateEvenement(evenement);
    }

    /*@Override
    public Evenement assignEvenementToClub(Long numEvenement, Long numSponsors) {
        Evenement e = evenementRepository.findById(numEvenement).get();
        Sponsors p = sponsorsRepository.findById(numSponsors).get();
        p.getEvenements().add(e);
        sponsorsRepository.save(p);
        return e;
    }*/
    @Scheduled(cron = "0 0 0 * * *")
    @Override
    public void deleteExpiredEvents() {
        List<Evenement> events = retrieveAllEvenement();
        log.info("success");

        LocalDate now = LocalDate.now();
        for (Evenement event : events) {

            if (event.getDateFin().isBefore(now)) {

                removeEvenement(event.getId());
                log.info("event deleted");
            }
        }
    }
    public void assignUserToEvent(Long eventId, Long userId) {
        try {
            // Retrieve the event from the database
            Evenement event = evenementRepository.findById(eventId)
                    .orElseThrow(() -> new IllegalArgumentException("Event not found"));

            // Log that the event was found
            logger.info("Event with ID {} found successfully.", eventId);

            // Retrieve the user from the database
            Utilisateur user = utilisateurRepository.findById(userId)
                    .orElseThrow(() -> new IllegalArgumentException("User not found"));

            // Log that the user was found
            logger.info("User with ID {} found successfully.", userId);

            // Add the user to the event
            event.getUtilisateurs().add(user);
            logger.info("User with ID {} has been assigned to event ID {}.", userId, eventId);

            // Save the event to update the association with the user
            evenementRepository.save(event); // Use the appropriate repository method to save

            // Log success message
            logger.info("Successfully assigned user with ID {} to event ID {}.", userId, eventId);

        } catch (IllegalArgumentException e) {
            // Log the specific exception message
            logger.error("Error assigning user to event: {}", e.getMessage());
        } catch (Exception e) {
            // Log any other exceptions
            logger.error("An unexpected error occurred while assigning user to event: {}", e.getMessage());
        }
    }

}
