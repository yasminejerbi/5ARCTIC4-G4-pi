import { Component, Inject, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Forum } from '../model/forum';
import { ForumService } from '../services/forum.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-update-forum',
  templateUrl: './update-forum.component.html',
  styleUrls: ['./update-forum.component.css']
})
export class UpdateForumComponent {

  constructor(public dialogRef: MatDialogRef<UpdateForumComponent>,private consP:ForumService,private rt:Router,private act :ActivatedRoute, @Inject(MAT_DIALOG_DATA) public data: any) { }
  id!:number
  forum!:Forum
 ForumForm = new FormGroup({
    nomForum: new FormControl('', [Validators.required, Validators.minLength(3)]),
    description: new FormControl('', [Validators.required, Validators.minLength(3)]),
  })


  ngOnInit(){
    
    this.id = this.data.id;
    console.log(this.id) // Retrieve ID from dialog data

  // Call getRecrutementId with this.id and pre-populate form
  this.consP.getForumById(this.id).subscribe(
    (data) => {
      this.forum = data;
      console.log(this.forum)
      // Use this.candidate to pre-fill your form controls
    },
    (error) => {
      console.error('Error fetching forum:', error);
      // Handle errors (e.g., display error message)
    }
  );
  }

  save(){

    if (this.ForumForm.valid) {
      const formData = this.ForumForm.value;
      const forumData: any = {
        id:this.id,
        nomForum: formData.nomForum,
        description: formData.description,
        
      };

      this.consP.updateForum(forumData as any).subscribe(
        (response) => {
         console.log('Forum ajouté avec succès :', response);
         window.location.reload();
        
       },
       (error: HttpErrorResponse) => {
         console.error('Erreur lors de l\'ajout du formulaire :', error);
         
         if (error.status === 400) {
           // Bad request error, handle validation errors or other issues
           // You can access error.error to get the detailed error message from the server
           // Provide feedback to the user about the error
         } else {
           // Handle other types of errors (e.g., server down, network error)
           // Provide appropriate feedback to the user
         }
       }
     );
   }  this.dialogRef.close();
 }
}
