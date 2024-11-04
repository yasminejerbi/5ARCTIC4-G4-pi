import { Component, Input, inject } from '@angular/core';
import { ClubService } from '../services/club.service';
import { Club } from '../model/club';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { RegisterComponent } from '../register/register.component';
import { User } from '../model/User';
//import { UserService } from '../services/user.service';

@Component({
  selector: 'app-clubs',
  templateUrl: './clubs.component.html',
  styleUrls: ['./clubs.component.css']
})
export class ClubsComponent {
  searchText: string = ''; 
  clubs: Club[] = [];
  @Input() ClubSearch!: Club;



  List: Club[] = [];
  //housingService: ClubService = inject(ClubService);
  filteredList: Club[] = [];




  constructor(public dialog: MatDialog, public clubService: ClubService, private router: Router) { }

  // filterResults(text: string) {
  //   if (!text) {
  //     this.filteredList = this.List;
  //     return;
  //   }

  //   this.filteredList = this.List.filter(
  //     List => List?.nomClub.toLowerCase().includes(text.toLowerCase())
  //   );
  // }
  filterResults(text: string) {
    if (!text) {
      this.filteredList = this.clubs; // Reset filteredList to all clubs
      return;
    }

    this.filteredList = this.clubs.filter(
      club => club?.nomClub?.toLowerCase().includes(text.toLowerCase())
    );
  }
  

  loadClubs() : void{
    this.clubService.getAll().subscribe(clubFound => {
      this.clubs = clubFound;
    });
  }

  ngOnInit(): void{
    this.loadClubs();
    this.router.navigate(['/clubs']);
   
  }


  openRegisterDialog(clubId: number): void {
    const dialogRef = this.dialog.open(RegisterComponent, {
      width: '400px', // Adjust the width as needed
      // Pass both club ID and user ID to the dialog component
      data: { clubId: clubId }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

    });
  }

  
}
