package tn.esprit.pi.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import tn.esprit.pi.entities.MaterielType;
import tn.esprit.pi.entities.Sponsoring_type;
import tn.esprit.pi.entities.Sponsors;
import tn.esprit.pi.services.IGestionSponsors;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin("*")
@RequestMapping("/sponsors")

public class SponsorController {
    @Autowired
    IGestionSponsors iGestionSponsors;

    private final static String IMAGE_UPLOAD_DIR = System.getProperty("user.dir") + "/../Cloud-Project-angular/src/assets/img/";

    @GetMapping("/getAll")
    public List<Sponsors> getAll(){
        return iGestionSponsors.retrieveAllSponsors();
    }


    /*@PostMapping("/ajout")
    public Sponsors ajoutSponsors(@RequestBody Sponsors sponsors){
        return iGestionSponsors.addorUpdateSponsors(sponsors);
    }*/

    @PostMapping("/ajout")
    public ResponseEntity<Object> addPost(@RequestParam("nomSponsor") String nomSponsor,
                                          @RequestParam("dureeSponsoring") int dureeSponsoring,
                                          @RequestParam("typeSponsoring") Sponsoring_type typeSponsoring,
                                          @RequestParam("montant") Float montant,
                                          @RequestParam("numTel") String numTel,
                                          @RequestParam("email") String email,
                                          @RequestParam("typeMateriel") MaterielType typeMateriel,
                                          @RequestParam(value = "image", required = false) MultipartFile image
    ) {
        try {
            String imageUrl = null;
            if (image != null && !image.isEmpty()) {
                imageUrl = saveImage(image);
            }
            Sponsors sponsors = new Sponsors(nomSponsor,imageUrl,dureeSponsoring,montant,email,numTel,typeSponsoring,typeMateriel);

            iGestionSponsors.addorUpdateSponsors(sponsors);
            System.out.println(sponsors);

            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(Map.of(

                            "status", "success",

                            "message", "Sponsor created successfully"

                    ));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of(
                                    "status", "error",
                                    "message", "Error creating sponsor."
                            )
                    );
        }
    }

    private String saveImage(MultipartFile image) throws Exception {
        try {
            String fileName = image.getOriginalFilename();
            byte[] imageData = image.getBytes();

            Path imagePath = Paths.get(IMAGE_UPLOAD_DIR + fileName);
            Files.write(imagePath, imageData);

            return fileName;
        } catch (Exception e) {
            e.printStackTrace();
            throw e;
        }
    }


    @PutMapping("/update/{id}")
    public ResponseEntity<Object> updateOrAddPost(@PathVariable("id") Long sponsorId,
                                                  @RequestParam("nomSponsor") String nomSponsor,
                                                  @RequestParam("dureeSponsoring") int dureeSponsoring,
                                                  @RequestParam("typeSponsoring") Sponsoring_type typeSponsoring,
                                                  @RequestParam("montant") Float montant,
                                                  @RequestParam("numTel") String numTel,
                                                  @RequestParam("email") String email,
                                                  @RequestParam("typeMateriel") MaterielType typeMateriel,
                                                  @RequestParam(value = "image", required = false) MultipartFile image) {
        try {
            String imageUrl = null;
            if (image != null && !image.isEmpty()) {
                imageUrl = saveImage(image);
            }


            Sponsors sponsor;
            if (sponsorId != null) {
                sponsor = iGestionSponsors.retrieveSponsors(sponsorId);
                if (sponsor == null) {
                    return ResponseEntity.status(HttpStatus.NOT_FOUND)
                            .body(Map.of(
                                    "status", "error",
                                    "message", "Sponsor not found."
                            ));
                }

                sponsor.setNomSponsor(nomSponsor);
                sponsor.setDureeSponsoring(dureeSponsoring);
                sponsor.setTypeSponsoring(typeSponsoring);
                sponsor.setMontant(montant);
                sponsor.setNumTel(numTel);
                sponsor.setEmail(email);
                sponsor.setTypeMateriel(typeMateriel);
                sponsor.setImage(imageUrl);
            } else {

                sponsor = new Sponsors(nomSponsor, imageUrl, dureeSponsoring, montant, email, numTel, typeSponsoring, typeMateriel);
            }

            iGestionSponsors.addorUpdateSponsors(sponsor);

            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(Map.of(
                            "status", "success",
                            "message", "Sponsor " + (sponsorId != null ? "updated" : "created") + " successfully"
                    ));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of(
                            "status", "error",
                            "message", "Error " + (sponsorId != null ? "updating" : "creating") + " sponsor."
                    ));
        }
    }



    /*@PutMapping("/update")
    public Sponsors updateSponsors(@RequestBody Sponsors sponsors){
        return iGestionSponsors.addorUpdateSponsors(sponsors);
    }*/


    @GetMapping("/getSponsorsId/{id}")
    public Sponsors getSponsorsId(@PathVariable("id") long id){

        return iGestionSponsors.retrieveSponsors(id);
    }
    @DeleteMapping("/deleteID/{id}")
    public  void delete(@PathVariable("id") long id){
        iGestionSponsors.removeSponsors(id);
    }




}