package tn.esprit.pi.services;

import tn.esprit.pi.entities.Sponsors;

import java.util.List;

public interface IGestionSponsors {
    public List<Sponsors> retrieveAllSponsors();
    public Sponsors addorUpdateSponsors (Sponsors sponsors, Long idEve );
    public void removeSponsors (Long idSponsors);
    public Sponsors retrieveSponsors (Long idSponsors);
}
