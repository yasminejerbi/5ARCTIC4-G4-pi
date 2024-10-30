package tn.esprit.pi.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import tn.esprit.pi.entities.Sponsors;
import tn.esprit.pi.services.IGestionSponsors;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/sponsors")

public class SponsorsController {
    @Autowired
    IGestionSponsors iGestionSponsors;
    @GetMapping("/getAll")
    public List<Sponsors> getAll(){
        return iGestionSponsors.retrieveAllSponsors();
    }


    @PostMapping("/ajout/{id}")
    public Sponsors ajoutSponsors(@RequestBody Sponsors sponsors,@PathVariable("id") Long idEve){
        return iGestionSponsors.addorUpdateSponsors(sponsors,idEve);
    }


    @GetMapping("/getSponsorsId/{id}")
    public Sponsors getSponsorsId(@PathVariable("id") long id){

        return iGestionSponsors.retrieveSponsors(id);
    }
    @DeleteMapping("/deleteID/{id}")
    public  void delete(@PathVariable("id") long id){
        iGestionSponsors.removeSponsors(id);
    }


    /*@PutMapping ("/updateSponsors")
    public Sponsors updateSponsors(@RequestBody  Sponsors sponsors){
        return iGestionSponsors.addorUpdateSponsors(sponsors);
    }*/

}
