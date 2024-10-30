import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { UserService } from 'src/app/services/User.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Role, User } from '../model/User';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css']
})
export class UpdateProfileComponent {
 constructor(private formBuilder: FormBuilder, private service: UserService, private router:Router,private act :ActivatedRoute) { }
    user!:User;
    id!:number;
    photoUser:any;
    RegisterForm = new FormGroup({
      nomUtilisateur: new FormControl('', [Validators.required, Validators.minLength(3)]),
      prenomUtilisateur: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      motDePasse: new FormControl('', [Validators.required, Validators.minLength(8),
         Validators.pattern('^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).*$')]),
      numTel: new FormControl('', [Validators.required, Validators.pattern('[0-9]{8}')]),
      role: new FormControl('', [Validators.required]),
      interet: new FormControl('', [Validators.required]),
      photo:new FormControl(null, [Validators.required]),
    });
  
    save() {
      if (this.RegisterForm.valid) {
        const formData = this.RegisterForm.value;
        const UserData: any = {
          id:this.id,
          nomUtilisateur: formData.nomUtilisateur,
          prenomUtilisateur: formData.prenomUtilisateur,
          email: formData.email,
          numTel: formData.numTel,
          motDePasse: formData.motDePasse,
          role:formData.role,
          interet:formData.interet,
          image: this.photoUser.name,
        };
  
        this.service.updateUser(UserData, this.photoUser).subscribe(
          (response) => {
            this.router.navigate(['profile/'+this.id]);
            console.log('Utilisateur mis à jour avec succès :', response);
            // Fournir éventuellement une rétroaction à l'utilisateur indiquant que la mise à jour a réussi
          },
          (error: HttpErrorResponse) => {
            console.error('Erreur lors de la mise à jour de l\'utilisateur :', error);
            // Vérifier le statut de l'erreur et la gérer de manière appropriée
            if (error.status === 400) {
              // Erreur de requête incorrecte, gérer les erreurs de validation ou autres problèmes
              // Vous pouvez accéder à error.error pour obtenir le message d'erreur détaillé du serveur
              // Fournir une rétroaction à l'utilisateur sur l'erreur
            } else {
              // Gérer d'autres types d'erreurs (par exemple, serveur hors ligne, erreur réseau)
              // Fournir une rétroaction appropriée à l'utilisateur
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
      this.id=this.act.snapshot.params['id'];
      //4- recuperation du produit par id
      this.service.getUserById(this.id).subscribe(
        (data)=>{
          this.user=data,
          //5- remplir le formulaire par les données du produit
          this.RegisterForm.patchValue(this.user as any)
        }
      )
    }
  
  }
  
