package tn.esprit.pi.services;

import tn.esprit.pi.entities.Forum;

import java.util.List;

public interface IGestionForum {
    public List<Forum> retrieveAllForum();
    public Forum addorUpdateForum (Forum forum );
    public void removeForum (Long idForum);
    public Forum retrieveForum (Long idForum);
}