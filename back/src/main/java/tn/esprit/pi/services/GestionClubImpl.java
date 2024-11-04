package tn.esprit.pi.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.esprit.pi.entities.Club;
import tn.esprit.pi.repository.IClubRepository;

import java.util.List;

@Service
public class GestionClubImpl implements IGestionClub{
    @Autowired
    IClubRepository clubRepository;
    @Override
    public List<Club> retrieveAllClub(){
        return (List<Club>) clubRepository.findAll();
    }
}
