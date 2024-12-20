package tn.esprit.pi.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import tn.esprit.pi.entities.Utilisateur;

@Repository
public interface IUtilisateurRepository extends CrudRepository<Utilisateur,Long> {
    public Utilisateur findByEmailAndAndNumTel(String email,String numTel);
    public Utilisateur findUtilisateurById(long id);
}
