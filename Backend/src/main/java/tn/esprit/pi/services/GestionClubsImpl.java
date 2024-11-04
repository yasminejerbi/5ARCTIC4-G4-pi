package tn.esprit.pi.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.esprit.pi.entities.Club;
import tn.esprit.pi.repository.IClubRepository;
import java.util.List;

@Service
public class GestionClubsImpl implements IGestionClub{
    @Autowired
    IClubRepository ClubRepository;
    @Override
    public List<Club> retrieveAllClub() {
        return (List<Club>) ClubRepository.findAll();
}

    @Override
    public Club addorUpdateClub(Club club) {
        return ClubRepository.save(club);
    }

    @Override
    public void removeClub(Long id) {
        ClubRepository.delete(ClubRepository.findById(id).get());
    }

    @Override
    public Club retrieveClub(Long id) {
        return ClubRepository.findById(id).get();
    }

    @Override
    public Club findClubByNomClub(String nomClub) {
        return ClubRepository.findClubByNomClub(nomClub);
    }
}
