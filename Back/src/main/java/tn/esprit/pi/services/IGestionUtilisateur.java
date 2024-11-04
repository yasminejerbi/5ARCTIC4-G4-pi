package tn.esprit.pi.services;

import tn.esprit.pi.entities.Utilisateur;

import java.util.List;

public interface IGestionUtilisateur {
    public List<Utilisateur> retrieveAllUtilisateurs();
    public Utilisateur addorUpdateUtilisateur (Utilisateur utilisateur );
    public void removeUtilisateur (Long idUtilisateur);
    public Utilisateur retrieveUtilisateur (Long idUtilisateur);
    public Long recupérationMDP(String email,String numTel);
    public Utilisateur findUtilisateurById(long id);
}
