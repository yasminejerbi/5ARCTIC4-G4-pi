import { Component } from '@angular/core';
import { Recrutement } from '../model/recrutement'; // Replace with path to your recruitment class
import { RecrutementID } from '../model/RecrutementID';
import { CandidatesService } from '../services/candidates.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { RegisterComponent } from '../register/register.component';
import { UpdateCandidatesComponent } from '../update-candidates/update-candidates.component';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { SmsRequest } from '../model/SmsRequest';

@Component({
  selector: 'app-candidates',
  templateUrl: './candidates.component.html',
  styleUrls: ['./candidates.component.css']
})
export class CandidatesComponent {
  constructor(public dialog: MatDialog, public candidatesService: CandidatesService, 
    private snackBar: MatSnackBar,
    private router: Router/*,public service:UserService*/) { }

deleteRecrutementById(id: RecrutementID) {
  this.candidatesService.deleteRecrutementById(id).subscribe(
    ()=>this.ngOnInit()
  )
  const horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  const verticalPosition: MatSnackBarVerticalPosition = 'top';
  this.snackBar.open('The request has been deleted successfully !', 'Close', {
    duration: 3000,
    horizontalPosition,
    verticalPosition,
    panelClass: ['success-snackbar']
  })
         
 const smsRequest: SmsRequest = {
  message: 'unfortunately you are not a match for this post',
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
}


modifierCandidate(id: RecrutementID) {
  const dialogRef = this.dialog.open(UpdateCandidatesComponent, {
    width: '400px', // Adjust the width as needed
    // Pass both club ID and user ID to the dialog component
    data: { id:id }
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
    // You can handle any actions after the dialog is closed here
  });
}
  candidates :Recrutement[] = [];

  ngOnInit() {
    this.getCandidates();
  }
  
  getCandidates(): void {
    this.candidatesService.getAll().subscribe(
      (data: any) => {
        this.candidates = data;
        console.log('Candidates:', data);
      },
      error => {
        console.error('Erreur lors de la récupération des candidatures', error);
      }
    );
  }
}
