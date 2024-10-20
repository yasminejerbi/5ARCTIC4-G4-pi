package tn.esprit.pi.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.esprit.pi.entities.Logistique;
import tn.esprit.pi.repository.ILogistiqueRepository;

import java.util.List;

@Service
public class GestionLogistiqueImpl implements IGestionLogistique{
    @Autowired
    ILogistiqueRepository logistiqueRepository;
    public List<Logistique> retrieveAllLogistique(){
        return (List<Logistique>) logistiqueRepository.findAll();
    }
    public Logistique addorUpdateLogistique (Logistique logistique ){
        return logistiqueRepository.save(logistique);
    }
    public void removeLogistique (Long idLogistique){
        logistiqueRepository.delete(logistiqueRepository.findById(idLogistique).get());
    }
    public Logistique retrieveLogistique (Long idLogistique){
        return logistiqueRepository.findById(idLogistique).get();
    }
}
