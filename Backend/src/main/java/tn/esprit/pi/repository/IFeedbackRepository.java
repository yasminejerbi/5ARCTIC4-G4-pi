package tn.esprit.pi.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import tn.esprit.pi.entities.Feedback;

@Repository
public interface IFeedbackRepository extends CrudRepository<Feedback,Long> {
}
