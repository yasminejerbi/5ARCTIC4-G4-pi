package tn.esprit.pi.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.esprit.pi.entities.Forum;
import tn.esprit.pi.repository.IForumRepository;

import java.util.List;

@Service
public class GestionForumImpl implements IGestionForum{
    @Autowired
    IForumRepository forumRepository;
  public List<Forum> retrieveAllForum(){
        return (List<Forum>) forumRepository.findAll();
   }
   public Forum addorUpdateForum (Forum forum ){
       return forumRepository.save(forum);
  }
    public void removeForum (Long idForum){
        forumRepository.delete(forumRepository.findById(idForum).get());
    }
    public Forum retrieveForum (Long idForum){
        return forumRepository.findById(idForum).get();
    }
}
