package tn.esprit.pi.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.esprit.pi.entities.Evenement;
import tn.esprit.pi.entities.Sponsors;
import tn.esprit.pi.repository.IEvenementRepository;
import tn.esprit.pi.repository.ISponsorRepository;

import java.util.ArrayList;
import java.util.List;
@Service
public class GestionSponsorsImp implements IGestionSponsors{
    @Autowired
    ISponsorRepository sponsorsRepository;

    public List<Sponsors> retrieveAllSponsors(){
        return (List<Sponsors>) sponsorsRepository.findAll();
    }


   /* public Sponsors addorUpdateSponsors (Sponsors sponsors, Long idEve ){
        Evenement e = evenementRepository.findById(idEve).get();
        List<Evenement> list = new ArrayList<>();
        if(sponsors.getEvenements() == null){
            list.add(e);
            sponsors.setEvenements(list);
        }else{
            sponsors.getEvenements().add(e);
        }
        return sponsorsRepository.save(sponsors);
    }*/
    public Sponsors addorUpdateSponsors (Sponsors sponsors)
    {return sponsorsRepository.save(sponsors);}

    public void removeSponsors (Long idSponsors){
        sponsorsRepository.delete(sponsorsRepository.findById(idSponsors).get());
    }
    public Sponsors retrieveSponsors (Long idSponsors){
        return sponsorsRepository.findById(idSponsors).get();
    }
}