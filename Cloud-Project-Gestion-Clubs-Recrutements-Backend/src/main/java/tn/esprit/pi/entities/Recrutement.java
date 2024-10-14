package tn.esprit.pi.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Date;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Recrutement implements Serializable {
    @EmbeddedId
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    RecrutementId id;
    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "idClub", referencedColumnName = "id", insertable = false, updatable = false)
    private Club club;

    @ManyToOne(cascade = CascadeType.DETACH)

    @JsonIgnore
    @JoinColumn(name = "idUtilisateur", referencedColumnName = "id", insertable = false, updatable = false)
    private Utilisateur utilisateur;
    private String nomCandidat;
    private String poste;
    private LocalDate date;

    @Enumerated(EnumType.STRING)
    private Status recrutementStatus;

  /*  @PostUpdate
    public void onStatusUpdate() {
        if (recrutementStatus == Status.accepted && club != null) {
            club.getMembres().add(nomCandidat);
        }
    }*/
}
