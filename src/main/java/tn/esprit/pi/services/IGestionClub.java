package tn.esprit.pi.services;

import org.springframework.data.repository.CrudRepository;
import tn.esprit.pi.entities.Club;
import tn.esprit.pi.entities.Evenement;

import java.util.List;

public interface IGestionClub {
    public List<Club> retrieveAllClub();

}
