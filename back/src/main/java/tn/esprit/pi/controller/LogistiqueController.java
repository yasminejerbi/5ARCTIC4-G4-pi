package tn.esprit.pi.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import tn.esprit.pi.entities.Logistique;
import tn.esprit.pi.services.IGestionLogistique;

import java.util.List;

@RestController
@RequestMapping("/logis")
public class LogistiqueController {
    @Autowired
    IGestionLogistique iGestionLogistique;
    @GetMapping("/getAll")
    public List<Logistique> getAll(){
        return iGestionLogistique.retrieveAllLogistique();
    }
    @PostMapping("/ajout")
    public Logistique ajoutLogistique(@RequestBody Logistique logistique){
        return iGestionLogistique.addorUpdateLogistique(logistique);
    }
    @GetMapping("/getLogistiqueId/{id}")
    public Logistique getLogistiqueId(@PathVariable("id") long id){

        return iGestionLogistique.retrieveLogistique(id);
    }
    @DeleteMapping("/deleteID/{id}")
    public  void delete(@PathVariable("id") long id){
        iGestionLogistique.removeLogistique(id);
    }
    @PutMapping ("/updateLogistique")
    public Logistique updateLogistique(@RequestBody  Logistique logistique){
        return iGestionLogistique.addorUpdateLogistique(logistique);
    }
}
