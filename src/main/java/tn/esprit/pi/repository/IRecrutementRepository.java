package tn.esprit.pi.repository;

import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import tn.esprit.pi.entities.Recrutement;
import tn.esprit.pi.entities.Status;

import java.util.List;

@Repository
public interface IRecrutementRepository extends CrudRepository<Recrutement,Long> {
    @Query("SELECT r FROM Recrutement r WHERE r.id.idClub = ?1 AND r.id.idUtilisateur = ?2")
    Recrutement findByClubIdAndUserId(Long idClub, Long idUtilisateur);

    @Modifying
    @Query("DELETE FROM Recrutement r WHERE r.id.idClub = ?1 AND r.id.idUtilisateur = ?2")
    void deleteByClubIdAndUserId(Long idClub, Long idUtilisateur);

    @Query("SELECT r FROM Recrutement r WHERE r.recrutementStatus = ?1")
    List<Recrutement> findByRecrutementStatus(Status recrutementStatus);
}
