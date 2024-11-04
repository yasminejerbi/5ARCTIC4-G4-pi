import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { UserService } from 'src/app/services/User.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Role, User } from '../model/User';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
 
  constructor(private formBuilder: FormBuilder, private service: UserService, private router:Router) { }
  listUser!: User[];
  photoUser:any;
  length:number=0;
   i:number=0;
  RegisterForm = new FormGroup({
    nomUtilisateur: new FormControl('', [Validators.required, Validators.minLength(3)]),
    prenomUtilisateur: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    motDePasse: new FormControl('', [Validators.required, Validators.minLength(8),
       Validators.pattern('^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).*$')]),
    numTel: new FormControl('', [Validators.required, Validators.pattern('[0-9]{8}')]),
    role: new FormControl('', [Validators.required]),
    interet: new FormControl('', [Validators.required]),
  });

  persistUser() {
    if (this.RegisterForm.valid) {
      const formData = this.RegisterForm.value;
      const UserData: any = {
        nomUtilisateur: formData.nomUtilisateur,
        prenomUtilisateur: formData.prenomUtilisateur,
        email: formData.email,
        numTel: formData.numTel,
        motDePasse: formData.motDePasse,
        role:formData.role,
        interet:formData.interet,
   
      };
      
      // if (this.photoUser) {
      //   UserData.photo = this.photoUser; 
      //   console.log(this.photoUser)
      // }
      this.service.ajouterUser(UserData,this.photoUser).subscribe(
        (response) => {
          this.router.navigate(['login'])

          console.log('Utilisateur ajoutée avec succès :', response);
          // Optionally, provide feedback to the user that registration was successful
        },
        (error: HttpErrorResponse) => {
          console.error('Erreur lors de l\'ajout de l\'utilisateur :', error);
          // Check the error status and handle it appropriately
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
    }
  }
  image(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      this.photoUser = event.target.files[0]; // Store the File object immediately
      const reader = new FileReader();
      reader.readAsDataURL(this.photoUser); // Read file content asynchronously
    } else {
      this.photoUser = null; // Clear photoUser if no file is selected
    }
  }
  ngOnInit(): void {
  }

}
