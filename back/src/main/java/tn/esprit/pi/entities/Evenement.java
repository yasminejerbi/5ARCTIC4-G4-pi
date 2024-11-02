package tn.esprit.pi.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.JsonView;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.Cascade;
import org.hibernate.annotations.CascadeType;
import org.hibernate.annotations.Fetch;
import org.springframework.context.annotation.Lazy;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Evenement implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String nomEvenement;
    private String lieuEvenement;
    private String actionEvenement;
    private LocalDate dateDebut;
    private LocalDate dateFin;
    private int numPlaces;
    private String photo;
    @Enumerated(EnumType.STRING)
    private Event_type eventType;
    @ManyToMany
    @JsonIgnore
    private List<Utilisateur> utilisateurs = new ArrayList<Utilisateur>();
    @ManyToMany
    @JsonIgnore
    private List<Club> clubs;
    @OneToMany(mappedBy = "evenement")
    @Cascade(value = CascadeType.ALL)
    private List<Feedback>feedbacks;

    @JsonIgnore
    @ManyToMany(mappedBy ="evenements")
    @Cascade(value = {CascadeType.PERSIST, CascadeType.MERGE})
    private List<Sponsors> sponsors = new ArrayList<Sponsors>();
    @OneToMany(mappedBy = "evenement")
    @Cascade(value = CascadeType.ALL)
    private List<Logistique> logistiques;

    public Evenement(String nom, String lieuEvenement, String actionEvenement, LocalDate dateD, LocalDate dateF, int nbP, String imageUrl, Event_type eventType) {
        this.nomEvenement = nom;
        this.lieuEvenement = lieuEvenement;
        this.actionEvenement = actionEvenement;
        this.dateDebut = dateD;
        this.dateFin = dateF;
        this.numPlaces = nbP;
        this.photo = imageUrl;
        this.eventType = eventType;

    }

    public Evenement(long l, String s, LocalDate now, LocalDate localDate) {
        this.id = l;
        this.nomEvenement = s;
        this.dateDebut = now;
        this.dateFin = localDate;
    }
}
