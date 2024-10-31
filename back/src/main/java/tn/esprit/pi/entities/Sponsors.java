package tn.esprit.pi.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Sponsors implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String nomSponsor;
    private String image;
    private int dureeSponsoring;
    private Float montant;
    private String email;
    private String numTel;
    @Enumerated(EnumType.STRING)
    private Sponsoring_type typeSponsoring;

    @Enumerated(EnumType.STRING)
    private MaterielType typeMateriel;

    public Sponsors(String nomSponsor, String imageUrl, int dureeSponsoring,Float montant, String email, String numTel, Sponsoring_type typeSponsoring,MaterielType typeMateriel) {

        this.nomSponsor=nomSponsor;
        this.image=imageUrl;
        this.dureeSponsoring=dureeSponsoring;
        this.montant=montant;
        this.email=email;
        this.numTel=numTel;
        this.typeSponsoring=typeSponsoring;
        this.typeMateriel=typeMateriel;
    }






}
