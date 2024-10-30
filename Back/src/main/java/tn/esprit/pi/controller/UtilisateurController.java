package tn.esprit.pi.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import tn.esprit.pi.entities.Interet;
import tn.esprit.pi.entities.Role;
import tn.esprit.pi.entities.Utilisateur;
import tn.esprit.pi.services.EmailVerificationService;
import tn.esprit.pi.services.IGestionUtilisateur;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin("*")
@RequestMapping("/utilisateur")
public class UtilisateurController {
    @Autowired
    IGestionUtilisateur iGestionUtilisateur;
    private final static String IMAGE_UPLOAD_DIR = System.getProperty("user.dir") + "/../pi-angular/src/assets/img/";
    @GetMapping("/getAll")
    public List<Utilisateur> getAll(){
        return iGestionUtilisateur.retrieveAllUtilisateurs();
    }
    @PostMapping("/ajout2")
    public Utilisateur ajoutUtilisateur(@RequestBody Utilisateur utilisateur){
        return iGestionUtilisateur.addorUpdateUtilisateur(utilisateur);
    }
    @GetMapping("/getUtilisateurId/{id}")
    public Utilisateur getUtilisateurId(@PathVariable("id") long id){

        return iGestionUtilisateur.retrieveUtilisateur(id);
    }
    @GetMapping("/mdp/{id}/{id2}")
    public Long recuperationMDP(@PathVariable("id") String email,@PathVariable("id2") String numTel){
        return iGestionUtilisateur.recupérationMDP(email,numTel);
    }
    @DeleteMapping("/deleteID/{id}")
    public  void delete(@PathVariable("id") long id){
        iGestionUtilisateur.removeUtilisateur(id);
    }
    @PutMapping ("/updateUtilisateur")
    public Utilisateur updateUtilisateur(@RequestBody  Utilisateur utilisateur){
        return iGestionUtilisateur.addorUpdateUtilisateur(utilisateur);
    }
    @PostMapping("/ajout")
    public ResponseEntity<Object> addPost(@RequestParam("nomUtilisateur") String nomUtilisateur,
                                          @RequestParam("prenomUtilisateur") String prenomUtilisateur,
                                          @RequestParam("email") String email,
                                          @RequestParam("numTel") String numTel,
                                          @RequestParam("motDePasse") String motDePasse,
                                          @RequestParam(value = "image", required = false) MultipartFile image,
                                          @RequestParam("role") Role role,
                                          @RequestParam("interet") Interet interet


    ) {
        try {
            String imageUrl = null;
            if (image != null && !image.isEmpty()) {
                imageUrl = saveImage(image);
            }
            Utilisateur utilisateur=new Utilisateur(nomUtilisateur,prenomUtilisateur,email,numTel,motDePasse,imageUrl,role,interet);


            iGestionUtilisateur.addorUpdateUtilisateur(utilisateur);
            System.out.println(utilisateur.getPhoto());

            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(Map.of(

                            "status", "success",

                            "message", "user created successfully"

                    ));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of(
                                    "status", "error",
                                    "message", "Error creating user."
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
    public ResponseEntity<Object> updateUser(@PathVariable("id") Long id,
                                             @RequestParam("nomUtilisateur") String nomUtilisateur,
                                             @RequestParam("prenomUtilisateur") String prenomUtilisateur,
                                             @RequestParam("email") String email,
                                             @RequestParam("numTel") String numTel,
                                             @RequestParam("motDePasse") String motDePasse,
                                             @RequestParam(value = "image", required = false) MultipartFile image,
                                             @RequestParam("role") Role role,
                                             @RequestParam("interet") Interet interet) {
        try {
            String imageUrl = null;
            if (image != null && !image.isEmpty()) {
                imageUrl = saveImage(image);
            }

            Utilisateur utilisateur = iGestionUtilisateur.findUtilisateurById(id);
            if (utilisateur == null) {
                return ResponseEntity.notFound().build();
            }


            utilisateur.setNomUtilisateur(nomUtilisateur);
            utilisateur.setPrenomUtilisateur(prenomUtilisateur);
            utilisateur.setEmail(email);
            utilisateur.setNumTel(numTel);
            utilisateur.setMotDePasse(motDePasse);
            utilisateur.setRole(role);
            utilisateur.setInteret(interet);
            utilisateur.setPhoto(imageUrl);

            iGestionUtilisateur.addorUpdateUtilisateur(utilisateur);

            return ResponseEntity.ok(Map.of(
                    "status", "success",
                    "message", "User updated successfully"
            ));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of(
                            "status", "error",
                            "message", "Error updating user."
                    ));
        }
    }

}
