import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ClubService } from '../services/club.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { RecrutementID } from '../model/RecrutementID';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from '../model/User';
import { UserService } from '../services/user.service';
import { MatSnackBar, MatSnackBarConfig, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  animations: []
})
export class RegisterComponent implements OnInit {
  listUser!: User[];
  userId!: any;

  constructor(
    private formBuilder: FormBuilder,
    private service: ClubService,
    private serviceUser: UserService,
    private router: Router,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any // Inject MAT_DIALOG_DATA to access data passed from the dialog
  ) {}

  RegisterForm = new FormGroup({
    nomCandidat: new FormControl('', [Validators.required, Validators.minLength(3)]),
    poste: new FormControl('', [Validators.required, Validators.minLength(3)]),
    date: new FormControl('', [Validators.required]),
    recrutementStatus: new FormControl({ value: 'In Progress', disabled: true }, Validators.required),
  });

  persist() {
    if (this.RegisterForm.valid) {
      const formData = this.RegisterForm.value;
      const clubId = this.data.clubId;
      
      for (let i = 0; i < this.listUser.length; i++) {
        if (this.listUser[i].nomUtilisateur == this.RegisterForm.value.nomCandidat) {
          this.userId = this.listUser[i].id;
        }
      }

      const idCompose: RecrutementID = new RecrutementID();
      idCompose.idClub = clubId;
      idCompose.idUtilisateur = this.userId;

      const RecData: any = {
        nomCandidat: formData.nomCandidat,
        poste: formData.poste,
        date: formData.date,
        recrutementStatus: "progress",
        id: idCompose,
      };

      this.service.ajoutRecrutement(RecData).subscribe(
        (response) => {
          console.log('Recrutement ajoutée avec succès :', response);
          // Configure the snack bar position and style
          const horizontalPosition: MatSnackBarHorizontalPosition = 'start';
          const verticalPosition: MatSnackBarVerticalPosition = 'bottom';
          this.snackBar.open('Your request has been sent successfully', 'Close', {
            duration: 3000,
            horizontalPosition,
            verticalPosition,
            panelClass: ['success-snackbar']
          });
        },
        (error: HttpErrorResponse) => {
          console.error('Erreur lors de l\'ajout du recrutement :', error);
          // Display error notification
          this.snackBar.open('This username does not exist', 'Close', { duration: 3000 });
          if (error.status === 400) {
            // Handle validation errors or other issues
          } else {
            // Handle other types of errors
          }
        }
      );
    }
  }

  ngOnInit() {
    this.serviceUser.getAll().subscribe(
      { next: (data) => this.listUser = data,
        error: (err) => console.log(err),
        complete: () => console.log('done')
      });
  }
}
