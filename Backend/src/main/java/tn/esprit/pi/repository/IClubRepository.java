package tn.esprit.pi.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import tn.esprit.pi.entities.Club;

@Repository
public interface IClubRepository extends CrudRepository<Club,Long> {

    @Query("SELECT c FROM Club c WHERE c.nomClub = ?1")
    Club findClubByNomClub(String nomClub);
}
