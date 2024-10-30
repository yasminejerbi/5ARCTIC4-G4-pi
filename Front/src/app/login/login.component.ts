import { Component } from '@angular/core';
import { User } from '../model/User';
import { UserService } from 'src/app/services/User.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor( private service: UserService, private router:Router, private authService: AuthService) { }
  listUser!: User[];

  email!:string;
  motDePasse!:string;
  login(){
    let i=0;
    let test=false;
    while((i < this.listUser.length)&&(test==false)){
      if(this.listUser[i].email==this.email&&this.listUser[i].motDePasse==this.motDePasse){
        test=true
      }
      else i++;
    }
    if(test==false||this.email==""||this.motDePasse==""){
      alert("your email or password is invalid");
    }
    else{
      this.authService.setLoggedIn(true); // Notification de connexion réussie
      this.router.navigate(['profile',this.listUser[i].id])
    }
  }
  
 ngOnInit(){
     this.service.getAll().subscribe(
       { next: (data) => this.listUser=data,
         error: (err) => console.log(err),
         complete: () => console.log('done')
       });
    
   }   
}
