import { Component, OnInit } from '@angular/core';
import { Sponsor } from 'src/app/model/Sponsor';
import { SponsorService } from 'src/app/services/Sponsor.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-update-sponsor',
  templateUrl: './update-sponsor.component.html',
  styleUrls: ['./update-sponsor.component.css']
})
export class UpdateSponsorComponent implements OnInit {
  id: any;
  sponsorForm: FormGroup;
  formSubmitted = false;

  constructor(private sponsorService: SponsorService, private router: Router, private route: ActivatedRoute, private fb: FormBuilder) {
    let formControls = {
      nomSponsor: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),
      typeSponsoring: new FormControl('', [
        Validators.required,
      ]),
      dureeSponsoring: new FormControl('', [
        Validators.required,
      ]),
      montant: new FormControl('', [
        Validators.required,
      ]),
      typemateriel: new FormControl('', [
        Validators.required,
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.email,
      ]),
      numTel: new FormControl('', [
        Validators.required,
      ])
    };
    this.sponsorForm = this.fb.group(formControls);
  }

  ngOnInit() {
    let id = this.route.snapshot.params['id'];
    
    this.id = id;
   
    this.sponsorService.getSponsor(this.id).subscribe((result: Sponsor) => {
      let sponsor = result;
      this.sponsorForm.patchValue({
        nomSponsor: sponsor.nomSponsor,
        typeSponsoring: sponsor.typeSponsoring,
        dureeSponsoring: sponsor.dureeSponsoring,
        montant: sponsor.montant,
        typemateriel: sponsor.typemateriel,
        email: sponsor.email,
        numTel: sponsor.numTel
      });
    });
  }

  get nomSponsor() { return this.sponsorForm.get('nomSponsor'); }
  get typeSponsoring() { return this.sponsorForm.get('typeSponsoring'); }
  get dureeSponsoring() { return this.sponsorForm.get('dureeSponsoring'); }
  get montant() { return this.sponsorForm.get('montant'); }
  get typemateriel() { return this.sponsorForm.get('typemateriel'); }
  get email() { return this.sponsorForm.get('email'); }
  get numTel() { return this.sponsorForm.get('numTel'); }

  validateField(field: string) {
    return (
      this.sponsorForm.get(field)?.invalid &&
      (this.sponsorForm.get(field)?.touched || this.formSubmitted)
    );
  }

  getErrorMessage(field: string) {
    if (this.sponsorForm.get(field)?.hasError('required')) {
      return 'Ce champ est obligatoire';
    }
    if (this.sponsorForm.get(field)?.hasError('minlength')) {
      return 'Ce champ doit contenir au moins 4 caractères';
    }
    if (this.sponsorForm.get(field)?.hasError('email')) {
      return 'Adresse email invalide';
    }
    return '';
  }

  modifierSponsor() {
    this.formSubmitted = true;
    if (this.sponsorForm.invalid) {
      return;
    }
    let data = this.sponsorForm.value;
    let sponsor = new Sponsor(
      this.id,
      data.nomSponsor,
      data.typeSponsoring,
      data.dureeSponsoring,
      data.montant,
      data.typemateriel,
      data.email,
      data.numTel
    );
    this.sponsorService.modifierSponsor(sponsor).subscribe(
      () => {
        console.log('Sponsor updated successfully');
        this.router.navigate(['listSponsor']);
      },
      (error: HttpErrorResponse) => {
        console.error('Error updating sponsor:', error);
      }
    );
  }
}
