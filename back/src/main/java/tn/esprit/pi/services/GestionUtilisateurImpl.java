package tn.esprit.pi.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.esprit.pi.entities.Evenement;
import tn.esprit.pi.entities.Utilisateur;
import tn.esprit.pi.repository.IEvenementRepository;
import tn.esprit.pi.repository.IUtilisateurRepository;

import java.util.List;
@Service
public class GestionUtilisateurImpl implements IGestionUtilisateur{
    @Autowired
    IUtilisateurRepository utilisateurRepository;
    @Autowired
    IEvenementRepository   evenementRepository;
    public List<Utilisateur> retrieveAllUtilisateurs(){
        return (List<Utilisateur>) utilisateurRepository.findAll();
    }
    public Utilisateur addorUpdateUtilisateur (Utilisateur utilisateur ){
        return utilisateurRepository.save(utilisateur);
    }
    public void removeUtilisateur (Long idUtilisateur){
        utilisateurRepository.delete(utilisateurRepository.findById(idUtilisateur).get());
    }
    public Utilisateur retrieveUtilisateur (Long idUtilisateur){
        return utilisateurRepository.findById(idUtilisateur).get();
    }
    @Override
    public Utilisateur assignUtilisateurToEvenement(Long numUtilisateur, Long numEvenement) {
        Utilisateur user = utilisateurRepository.findById(numUtilisateur).get();
        Evenement event = evenementRepository.findById(numEvenement).get();

        event.getUtilisateurs().add(user);
        evenementRepository.save(event);
        return user;
    }
}
