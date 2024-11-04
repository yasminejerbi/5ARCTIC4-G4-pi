import { Component } from '@angular/core';
import { User } from '../model/User';
import { UserService } from 'src/app/services/User.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-mdp',
  templateUrl: './mdp.component.html',
  styleUrls: ['./mdp.component.css']
})
export class MdpComponent {
  constructor( private service: UserService, private router:Router, private authService: AuthService) { }
  listUser!: User[];

  email:string="";
  numTel:string="";
  id!:number;
  login(){


    if(this.email==""||this.numTel==""){
      alert("your email or numTel is invalid");
    }
      else{
this.service.recupererMDP(this.email, this.numTel).subscribe(
    (mdp: number) => {
        this.id = mdp; // Assurez-vous que "this.id" est du bon type, potentiellement aussi un Observable<number>
    },
    (error) => {
      alert("User not found");
        // Vous pouvez afficher un message spécifique dans la console
    }
);

      console.log(this.id);
      this.router.navigate(['update',this.id]);
      this.authService.setLoggedIn(true); // Notification de connexion réussie
    }
  }
  
 ngOnInit(){

    
   }   
}
