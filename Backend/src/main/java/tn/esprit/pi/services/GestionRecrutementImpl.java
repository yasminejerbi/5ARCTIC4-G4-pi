package tn.esprit.pi.services;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.esprit.pi.entities.Club;
import tn.esprit.pi.entities.Recrutement;
import tn.esprit.pi.entities.Status;
import tn.esprit.pi.repository.IClubRepository;
import tn.esprit.pi.repository.IRecrutementRepository;

import java.util.ArrayList;
import java.util.List;
@Service
public class GestionRecrutementImpl implements IGestionRecrutement{
    @Autowired
    IRecrutementRepository RecRepository;
    IClubRepository clubRepository;

    @Override
    public List<Recrutement> retrieveAllRecrutement() {
        return (List<Recrutement>) RecRepository.findAll();    }

    @Override
    public Recrutement addorUpdateRecrutement(Recrutement recrutement) {
        return RecRepository.save(recrutement);
    }

    @Override
    public Recrutement retrieveRecrutement(Long idClub, Long idUtilisateur) {
       return RecRepository.findByClubIdAndUserId(idClub, idUtilisateur);
    }



    @Transactional
    @Override
    public void deleteByClubIdAndUserId(Long idClub, Long idUtilisateur) {
        RecRepository.findByClubIdAndUserId(idClub, idUtilisateur);
        RecRepository.deleteByClubIdAndUserId(idClub, idUtilisateur);

    }

    @Override
    public List<Recrutement> findByRecrutementStatus(Status recrutementStatus) {
        return RecRepository.findByRecrutementStatus(recrutementStatus);
    }

   /* @Override
    public void DecisionRecrutement(Long idClub, Long idUtilisateur, Status recrutementStatus) {
        Recrutement recrutement = RecRepository.findByClubIdAndUserId(idClub, idUtilisateur);

        if (recrutement != null) {
            recrutement.setRecrutementStatus(recrutementStatus);
            RecRepository.save(recrutement);

            if (recrutementStatus == Status.accepted) {
                Club club = recrutement.getClub();
                if (club != null) {
                    if (club.getMembres() == null) {
                        club.setMembres(new ArrayList<>());
                    }
                    String nomCandidat = recrutement.getNomCandidat();
                    club.getMembres().add(nomCandidat);
                    clubRepository.save(club);
                }
            }
        }
}*/
}
