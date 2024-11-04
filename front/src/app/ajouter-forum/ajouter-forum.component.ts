import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Forum } from '../model/forum';
import { ForumService } from '../services/forum.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-ajouter-forum',
  templateUrl: './ajouter-forum.component.html',
  styleUrls: ['./ajouter-forum.component.css']
})
export class AjouterForumComponent {

 // description!: string ;
  //nomForum!: string;
  badWords: string[] = ['badword1', 'badword2', '...'];
  constructor(public dialogRef: MatDialogRef<AjouterForumComponent> ,private formBuilder: FormBuilder, private service: ForumService, private router:Router) {}
 ForumForm = new FormGroup({
    nomForum: new FormControl('', [Validators.required, Validators.minLength(3)]),
    description: new FormControl('', [Validators.required, Validators.minLength(3)]),
   
  });
  containsBadWords(formData: any): boolean {
    const nomForum = formData.nomForum.toLowerCase();
    const description = formData.description.toLowerCase();

    return this.badWords.some((badWord) =>
      nomForum.includes(badWord) || description.includes(badWord)
    );
  }

  persistUser() {
    if (this.ForumForm.valid && this.containsBadWords(this.ForumForm.value)) {
      console.error('Forum contains bad words. Please remove them.');
      return; // Prevent submission if bad words are found
    }

    if (this.ForumForm.valid) {
      const formData = this.ForumForm.value;
      const ForumData: any = {
        nomForum: formData.nomForum,
        description: formData.description,
      };

      this.service.ajouterForum(ForumData).subscribe(
        (response) => {
          console.log('Forum ajouté avec succès :', response);
          window.location.reload();
        },
        (error: HttpErrorResponse) => {
          console.error('Erreur lors de l\'ajout du formulaire :', error);
          // Handle errors as needed
        }
      );
    }

    this.dialogRef.close();
  }
  
  ngOnInit() {}
    // Initialization logic here
    
    //console.log(this.ForumForm.value);}
  /*submitForm() {
    // Ici, vous pouvez traiter les données du formulaire
    console.log('Title:', this.nomForum);
    console.log('Description:', this.description);
    this.persistForum();
    
    // Fermez la fenêtre modale
    this.dialogRef.close();
  }

*/
}
