package tn.esprit.pi.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.Cascade;
import org.hibernate.annotations.CascadeType;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

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
    private int dureeSponsoring;
    private Float montant;
    private String email;
    private String numTel;
    private String logo;

    @Enumerated(EnumType.STRING)
    private Sponsoring_type typeSponsoring;
    @ManyToMany
    @Cascade(value = CascadeType.ALL)

    private List<Evenement> evenements=new ArrayList<Evenement>();
    @ManyToOne
    private Categorie_sponsor categorieSponsor;

}
