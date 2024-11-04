package tn.esprit.pi.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import tn.esprit.pi.entities.Forum;
import tn.esprit.pi.services.IGestionForum;

import java.util.List;
@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/Forums")
public class IForumController {
    @Autowired
    IGestionForum iGestionForum;
    @GetMapping("/getAll")
    public List<Forum> getAll(){
        return iGestionForum.retrieveAllForum();
    }
    @PostMapping("/ajout")
    public Forum ajoutForum(@RequestBody Forum forum){
        return iGestionForum.addorUpdateForum(forum);
    }
    @GetMapping("/getForumId/{id}")
    public Forum getForumId(@PathVariable("id") long id){

        return iGestionForum.retrieveForum(id);
    }
    @DeleteMapping("/deleteID/{id}")
    public  void delete(@PathVariable("id") long id){
        iGestionForum.removeForum(id);
    }
    @PutMapping ("/updateForum")
    public Forum updateForum(@RequestBody  Forum forum){
        return iGestionForum.addorUpdateForum(forum);
    }
   /* @PostMapping("/like/{idForum}")
    public Forum likeForum(@PathVariable Long idForum) {
        return iGestionForum.likeForum(idForum);
    }


    @PutMapping("/dislike/{idForum}")
    public Forum dislikeForum(@PathVariable Long idForum) {
        return iGestionForum.dislikeForum(idForum);
    }*/

}