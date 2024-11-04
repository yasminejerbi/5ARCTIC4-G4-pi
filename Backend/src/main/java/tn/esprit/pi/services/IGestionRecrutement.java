package tn.esprit.pi.services;

import tn.esprit.pi.entities.Recrutement;
import tn.esprit.pi.entities.RecrutementId;
import tn.esprit.pi.entities.Status;

import java.util.List;

public interface IGestionRecrutement {
    public List<Recrutement> retrieveAllRecrutement();
    public Recrutement addorUpdateRecrutement (Recrutement recrutement );

    public Recrutement retrieveRecrutement (Long idClub, Long idUtilisateur);
    public void deleteByClubIdAndUserId(Long idClub, Long idUtilisateur);
    public List<Recrutement> findByRecrutementStatus(Status recrutementStatus);

    /*public void DecisionRecrutement(Long idClub, Long idUtilisateur, Status recrutementStatus);*/
}
