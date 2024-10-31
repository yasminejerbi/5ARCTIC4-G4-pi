import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

import { MaterielType, Sponsor, Sponsoring_type } from 'src/app/model/Sponsor';
import { SponsorService } from 'src/app/services/Sponsor.service';

@Component({
  selector: 'app-add-sponsor',
  templateUrl: './add-sponsor.component.html',
  styleUrls: ['./add-sponsor.component.css']
})
export class AddSponsorComponent {
  constructor(private formBuilder: FormBuilder, private service: SponsorService, private router:Router) { }
  listUser!: Sponsor[];
  length:number=0;
  montant!:number
  typemateriel!:MaterielType
   i:number=0;
   sponsorForm = new FormGroup({
    nomSponsor: new FormControl('', [Validators.required, Validators.minLength(3)]),


    typeSponsoring: new FormControl('', [Validators.required,]),

    email: new FormControl('', [Validators.required, Validators.email]),


    numTel: new FormControl('', [Validators.required, Validators.pattern('[0-9]{8}')]),


    dureeSponsoring: new FormControl('', [
      Validators.required,
      Validators.pattern('[0-9]+$'),
      Validators.min(30)
    ]),

    /*typemateriel: new FormControl('', [Validators.required,]),

    
    montant: new FormControl('', [
      Validators.required,
      Validators.pattern('[0-9]+$'),
      Validators.min(100)
    ]),*/
  });
  

  persistUser() {
    if (this.sponsorForm.valid) {
    const formData = this.sponsorForm.value
        const SponsorData: any = {
         nomSponsor: formData.nomSponsor,
         typeSponsoring: formData.typeSponsoring,
         email: formData.email,
         numTel: formData.numTel,
         dureeSponsoring: formData.dureeSponsoring,
      
         montant:this.montant,
         
         typemateriel:this.typemateriel,
       };

       console.log(SponsorData.montant);
       console.log(SponsorData.typemateriel);


      this.service.ajouterSponsor(SponsorData).subscribe(
        (response) => {

          this.router.navigate(['home'])

          console.log('Sponsor ajouté avec succée :', response);
          // Optionally, provide feedback to the user that registration was successful
        },
        (error: HttpErrorResponse) => {
          console.error('Erreur lors de l\'ajout du sponsor :', error);
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

  ngOnInit(): void {
  }

}