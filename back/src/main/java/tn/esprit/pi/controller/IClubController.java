package tn.esprit.pi.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import tn.esprit.pi.entities.Club;
import tn.esprit.pi.entities.Evenement;
import tn.esprit.pi.services.IGestionClub;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/club")
public class IClubController {
    @Autowired
    IGestionClub iGestionClub;

    @GetMapping("/getAll")
    public List<Club> getAll(){
        return iGestionClub.retrieveAllClub();
    }
}
