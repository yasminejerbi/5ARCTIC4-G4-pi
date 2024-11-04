package tn.esprit.pi.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.Cascade;
import org.hibernate.annotations.CascadeType;

import java.io.Serializable;
import java.util.List;


@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Utilisateur implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String nomUtilisateur;
    private String prenomUtilisateur;
    private String email;
    private String numTel;
    private String motDePasse;
    private String photo;
    @Enumerated(EnumType.STRING)
    private Role role;
    @Enumerated(EnumType.STRING)
    private Interet interet;
    @OneToMany(mappedBy = "utilisateur")
    private List<Forum> forums;
    @ManyToMany(mappedBy = "utilisateurs")
    @Cascade(value = {CascadeType.PERSIST, CascadeType.MERGE})
    private List<Evenement> evenements;
    private List<Recrutement> recrutements;
    @OneToMany(mappedBy = "utilisateur")
    public List<Recrutement> getRecrutement(){
        return recrutements;
    }
    public void setRecrutement(List<Recrutement> recrutements){
        this.recrutements=recrutements;
    }
    // ... getters and setters
}

