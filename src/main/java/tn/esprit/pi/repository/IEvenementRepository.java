package tn.esprit.pi.repository;

import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import tn.esprit.pi.entities.Evenement;

@Repository
public interface IEvenementRepository extends CrudRepository<Evenement,Long> {
    @Transactional
    @Modifying
    @Query("UPDATE Evenement e SET e.nomEvenement = :#{#event.nomEvenement}, e.lieuEvenement = :#{#event.lieuEvenement}, e.actionEvenement = :#{#event.actionEvenement},e.dateDebut = :#{#event.dateDebut},e.dateFin = :#{#event.dateFin},e.numPlaces = :#{#event.numPlaces},e.photo = :#{#event.photo},e.eventType = :#{#event.eventType} WHERE e.id = :#{#event.id}")
    void updateEvenement(@Param("event") Evenement event);
}
