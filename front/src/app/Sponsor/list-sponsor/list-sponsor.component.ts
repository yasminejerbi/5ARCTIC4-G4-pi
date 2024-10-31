import { Component } from '@angular/core';
import { SponsorService } from 'src/app/services/Sponsor.service';
import { Router } from '@angular/router';
import { Sponsor } from 'src/app/model/Sponsor';

@Component({
  selector: 'app-list-sponsor',
  templateUrl: './list-sponsor.component.html',
  styleUrls: ['./list-sponsor.component.css']
})
export class ListSponsorComponent {

  sponsors: Sponsor[] = [];
  searchKeyword: string = '';
  p: number = 1;

  constructor(private service: SponsorService, private router: Router) { }
  
  ngOnInit() {
    this.getSponsors();
  }
  
  getSponsors(): void {
    this.service.listSponsor().subscribe(
      (data: any) => {
        this.sponsors = data;
        console.log('Sponsors:', data);
      },
      error => {
        console.error('Erreur lors de la récupération des sponsors', error);
      }
    );
  }
  
  deleteSponsor(id: number): void {
    this.service.deleteSponsor(id)
      .subscribe(() => {
        this.sponsors = this.sponsors.filter(sponsor => sponsor.id !== id);
      });
  } 
  
  modifierSponsor(id: any) {
    this.router.navigate(['modifierSponsor' + '/' + id]);
  }

  openResponseForm(sponsor: Sponsor): void {
    this.router.navigate(['response', sponsor.id], { state: { sponsorDetails: sponsor } });
}

}
