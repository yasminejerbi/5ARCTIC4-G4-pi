package tn.esprit.pi.services;

import tn.esprit.pi.entities.Logistique;

import java.util.List;

public interface IGestionLogistique {
    public List<Logistique> retrieveAllLogistique();
    public Logistique addorUpdateLogistique (Logistique logistique );
    public void removeLogistique (Long idLogistique);
    public Logistique retrieveLogistique (Long idLogistique);
}
