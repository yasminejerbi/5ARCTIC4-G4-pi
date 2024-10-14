package tn.esprit.pi.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import tn.esprit.pi.entities.Club;
import tn.esprit.pi.services.IGestionClub;

import java.util.List;
@RestController
@CrossOrigin("*")
public class ClubController {
    @Autowired
    IGestionClub iGestionClub;
    @GetMapping("/getAll")
    public List<Club> getAll(){
        return iGestionClub.retrieveAllClub();
    }
    @PostMapping("/ajoutClub")
    public Club ajoutClub(@RequestBody Club club){
        return iGestionClub.addorUpdateClub(club);
    }
    @GetMapping("/getClubId/{id}")
    public Club getClubId(@PathVariable("id") long id){

        return iGestionClub.retrieveClub(id);
    }
    @DeleteMapping("/deleteID/{id}")
    public  void delete(@PathVariable("id") long id){
        iGestionClub.removeClub(id);
    }
    @PutMapping ("/updateClub")
    public Club updateClub(@RequestBody  Club club){
        return iGestionClub.addorUpdateClub(club);
    }

    @GetMapping ("/findClubByNomClub/{nomClub}")
    public Club findClubByNomClub(@PathVariable("nomClub") String nomClub){
        return iGestionClub.findClubByNomClub(nomClub);
    }
}
