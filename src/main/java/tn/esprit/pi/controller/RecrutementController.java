package tn.esprit.pi.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;
import tn.esprit.pi.entities.Recrutement;
import tn.esprit.pi.entities.RecrutementId;
import tn.esprit.pi.entities.Status;
import tn.esprit.pi.services.IGestionRecrutement;

import java.util.List;
@RestController
@CrossOrigin("*")
@RequestMapping("/recrutement")
public class RecrutementController {
    @Autowired
    IGestionRecrutement iGestionRecrutement;
    @GetMapping("/getAll")
    public List<Recrutement> getAll(){
        return iGestionRecrutement.retrieveAllRecrutement();
    }
    @PostMapping("/ajoutRecrutement")
    public Recrutement ajoutRecrutement(@RequestBody Recrutement recrutement){
        return iGestionRecrutement.addorUpdateRecrutement(recrutement);
    }
    @GetMapping("/getRecrutementId/{id}/{id2}")
    public Recrutement getRecrutementId(@PathVariable("id") Long id,@PathVariable("id2") Long id2){

        return iGestionRecrutement.retrieveRecrutement(id,id2);
    }
    @DeleteMapping("/deleteID/{id}/{id2}")
    public ResponseEntity<String> deleteRecrutementById(@PathVariable("id") Long id,@PathVariable("id2") Long id2) {
        iGestionRecrutement.deleteByClubIdAndUserId(id,id2);
        return ResponseEntity.ok("Recrutement deleted successfully");
    }
    @PutMapping ("/updateRecrutement")
    public Recrutement updateRecrutement(@RequestBody  Recrutement recrutement){
        return iGestionRecrutement.addorUpdateRecrutement(recrutement);
    }
    @GetMapping("/findByStatus/{status}")
    public List<Recrutement> findByRecrutementStatus(@PathVariable("status") Status status) {
        return iGestionRecrutement.findByRecrutementStatus(status);
    }
}
