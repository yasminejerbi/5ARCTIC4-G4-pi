package tn.esprit.pi.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import tn.esprit.pi.entities.Sponsors;
import tn.esprit.pi.entities.Utilisateur;

@Repository
public interface ISponsorRepository extends JpaRepository<Sponsors,Long> {
}
