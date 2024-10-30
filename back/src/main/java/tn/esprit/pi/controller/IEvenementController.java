package tn.esprit.pi.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import tn.esprit.pi.entities.*;
import tn.esprit.pi.repository.IClubRepository;
import tn.esprit.pi.repository.IEvenementRepository;
import tn.esprit.pi.repository.IUtilisateurRepository;
import tn.esprit.pi.services.IGestionEvenement;
import tn.esprit.pi.services.IGestionEvenement;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import lombok.extern.slf4j.Slf4j;

@RestController
@CrossOrigin("*")
@RequestMapping("/event")

public class IEvenementController {
    @Autowired
    IGestionEvenement iGestionEvenement;
    @Autowired
    IEvenementRepository evenementRepository;
    @Autowired
    IClubRepository    clubRepository;
    @Autowired
    IUtilisateurRepository utilisateurRepository;
    //private final static String IMAGE_UPLOAD_DIR = System.getProperty("user.dir") + "/../Cloud-Project-angular/src/assets/img/";
    private final static String IMAGE_UPLOAD_DIR = "/app/uploads/";

    @GetMapping("/getAll")
    public List<Evenement> getAll(){
        return iGestionEvenement.retrieveAllEvenement();
    }



    @GetMapping("/getEvenementId/{id}")
    public ResponseEntity<?> getEvenementId(@PathVariable("id") long id) {
        try {
            Evenement evenement = iGestionEvenement.retrieveEvenement(id);
            if (evenement != null) {
                return ResponseEntity.ok(evenement);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(Map.of(
                                "status", "error",
                                "message", "Event not found."
                        ));
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of(
                            "status", "error",
                            "message", "Error retrieving event."
                    ));
        }
    }
    @DeleteMapping("/deleteID/{id}")
    public  void delete(@PathVariable("id") long id){
        iGestionEvenement.removeEvenement(id);
    }


    @PostMapping("/addEvent")
    public ResponseEntity<Object> addPost(@RequestParam("nomEvenement") String nom,
                                          @RequestParam("lieuEvenement") String lieuEvenement,
                                          @RequestParam("actionEvenement") String actionEvenement,
                                          @RequestParam("dateDebut") LocalDate dateD,
                                          @RequestParam("dateFin") LocalDate dateF,
                                          @RequestParam("numPlaces") int nbP,
                                          @RequestParam(value = "photo", required = false) MultipartFile image,
                                          @RequestParam("eventType") Event_type eventType
                                          //@RequestParam("idClub") Long idClub
                                          ) {
        try {
            String imageUrl = null;
            if (image != null && !image.isEmpty()) {
                imageUrl = saveImage(image);
            }

            /*Club c = clubRepository.findById(idClub).get();
            List<Club> clubs = new ArrayList<>();*/
            // Create a new Post object using the provided constructor
            Evenement evenement = new Evenement(nom,lieuEvenement,actionEvenement,dateD,dateF,nbP,imageUrl, eventType);
            /*clubs.add(c);
            evenement.setClubs(clubs);*/

            // Save the evenement to the database
            iGestionEvenement.addorUpdateEvenement(evenement);
            System.out.println(evenement.getClubs());

            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(Map.of(

                            "status", "success",

                            "message", "Evenement created successfully"

                    ));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of(
                                    "status", "error",
                                    "message", "Error creating evenement."
                            )
                    );
        }
    }

    // This method saves the image to your desired location
    private String saveImage(MultipartFile image) throws Exception {
        try {
            String fileName = image.getOriginalFilename();
            byte[] imageData = image.getBytes();

            Path imagePath = Paths.get(IMAGE_UPLOAD_DIR + fileName);
            Files.write(imagePath, imageData);

            return fileName; // Return only the file name
        } catch (Exception e) {
            e.printStackTrace(); // Log the exception
            throw e; // Rethrow the exception to propagate it
        }
    }
    @PutMapping("/updateEvent/{eventId}")
    public ResponseEntity<Object> updateEvent(@PathVariable("eventId") Long eventId,
                                              @RequestParam("nomEvenement") String nom,
                                              @RequestParam("lieuEvenement") String lieuEvenement,
                                              @RequestParam("actionEvenement") String actionEvenement,
                                              @RequestParam("dateDebut") LocalDate dateD,
                                              @RequestParam("dateFin") LocalDate dateF,
                                              @RequestParam("numPlaces") int nbP,
                                              @RequestParam(value = "photo", required = false) MultipartFile image,
                                              @RequestParam("eventType") Event_type eventType
    ) {
        try {
            // Retrieve the existing event from the database
            Evenement existingEvent = evenementRepository.findById(eventId).get();

            // Check if the event exists
            if (existingEvent == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(Map.of(
                                "status", "error",
                                "message", "Event not found."
                        ));
            }

            // Update the event properties
            existingEvent.setNomEvenement(nom);
            existingEvent.setLieuEvenement(lieuEvenement);
            existingEvent.setActionEvenement(actionEvenement);
            existingEvent.setDateDebut(dateD);
            existingEvent.setDateFin(dateF);
            existingEvent.setNumPlaces(nbP);
            existingEvent.setEventType(eventType);

            // Update the event image if provided
            if (image != null && !image.isEmpty()) {
                String imageUrl = saveImage(image);
                existingEvent.setPhoto(imageUrl);
            }

            // Save the updated event to the database
            iGestionEvenement.addorUpdateEvenement(existingEvent);

            return ResponseEntity.status(HttpStatus.OK)
                    .body(Map.of(
                            "status", "success",
                            "message", "Event updated successfully"
                    ));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of(
                            "status", "error",
                            "message", "Error updating event."
                    ));
        }
    }

    @PostMapping("/assignUserToEvent")
    public ResponseEntity<Object> assignUserToEvent(@RequestParam("eventId") Long eventId,
                                                    @RequestParam("userId") Long userId) {
        try {
            // Retrieve the event from the database
            Evenement event = evenementRepository.findById(eventId).orElseThrow(() -> new IllegalArgumentException("Event not found"));

            // Retrieve the user from the database
            Utilisateur user = utilisateurRepository.findById(userId).orElseThrow(() -> new IllegalArgumentException("User not found"));

            // Add the user to the event
            event.getUtilisateurs().add(user);

            // Save the event to update the association with the user
            iGestionEvenement.addorUpdateEvenement(event);

            return ResponseEntity.status(HttpStatus.OK)
                    .body(Map.of(
                            "status", "success",
                            "message", "User assigned to event successfully"
                    ));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of(
                            "status", "error",
                            "message", "Error assigning user to event."
                    ));
        }
    }

}
