import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CandidatesService } from '../services/candidates.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Recrutement } from '../model/recrutement';
import { RecrutementID } from '../model/RecrutementID';
import { ClubService } from '../services/club.service';
import { HttpErrorResponse } from '@angular/common/http';
import { User } from '../model/User';
import { UserService } from '../services/user.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { SmsRequest } from '../model/SmsRequest';

@Component({
  selector: 'app-update-candidates',
  templateUrl: './update-candidates.component.html',
  styleUrls: ['./update-candidates.component.css']
})
export class UpdateCandidatesComponent {

  constructor(private candidatesService:CandidatesService,
    private rt:Router,
    private serviceUser:UserService,
    private activatedRoute :ActivatedRoute,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any ) { }

  id!:RecrutementID
  candidate!:Recrutement
  RegisterForm = new FormGroup({
    nomCandidat : new FormControl('',Validators.required),
    poste : new FormControl('',[Validators.required,Validators.minLength(6)]),
    date : new FormControl('',Validators.required),
    recrutementStatus : new FormControl('',Validators.required),
  })

  ngOnInit() {
    this.id = this.data.id;
    console.log(this.id) // Retrieve ID from dialog data

  // Call getRecrutementId with this.id and pre-populate form
  this.candidatesService.getRecrutementId(this.id).subscribe(
    (data) => {
      this.candidate = data;
      console.log(this.candidate)
      // Use this.candidate to pre-fill your form controls
    },
    (error) => {
      console.error('Error fetching candidate:', error);
      // Handle errors (e.g., display error message)
    }
  ); 
  }
  
  save(){ 
    if (this.RegisterForm.valid) {
      const formData = this.RegisterForm.value;
      
      // Retrieve club ID and user ID from the data object passed from the dialog
      this.id = this.data.id;

      const RecData: any = {
        nomCandidat: formData.nomCandidat,
        poste: formData.poste,
        date: formData.date,
        recrutementStatus: formData.recrutementStatus,
        id: this.id,
      };

      console.log(this.RegisterForm.value);
      this.candidatesService.modifierCandidate(RecData).subscribe(
        (response) => {
          console.log('recrutement modifié avec succès :', response);
 // Configure the snack bar position and style
 const horizontalPosition: MatSnackBarHorizontalPosition = 'end';
 const verticalPosition: MatSnackBarVerticalPosition = 'top';
 this.snackBar.open('Your request has been modified successfully', 'Close', {
   duration: 3000,
   horizontalPosition,
   verticalPosition,
   panelClass: ['success-snackbar']
 });
       
 const smsRequest: SmsRequest = {
  message: 'Congratulations ! you have been accepted to join our club',
  phoneNumber: '+21650607702' // Replace with actual phone number
};

this.candidatesService.sendSms(smsRequest).subscribe(
  (response) => {
    console.log('SMS sent successfully:', response);
     // Configure the snack bar position and style
 const horizontalPosition: MatSnackBarHorizontalPosition = 'end';
 const verticalPosition: MatSnackBarVerticalPosition = 'top';
 this.snackBar.open('SMS sent successfully to the candidate', 'Close', {
   duration: 3000,
   horizontalPosition,
   verticalPosition,
   panelClass: ['success-snackbar']
 });
  },
  (error) => {
    console.error('Error sending SMS:', error);
    // Handle errors appropriately, e.g., display an error message to the user
  }
);
},
        (error: HttpErrorResponse) => {
          console.error('Erreur lors de la modofication du recrutement :', error);      
        }
      );
    }
  }
  persist() {}
  }
