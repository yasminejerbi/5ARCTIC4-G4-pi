package tn.esprit.pi.services;

import tn.esprit.pi.entities.Club;

import java.util.List;

public interface IGestionClub {
    public List<Club> retrieveAllClub();
    public Club addorUpdateClub (Club club );
    public void removeClub (Long id);
    public Club retrieveClub (Long id);

    Club findClubByNomClub(String nomClub);
}
