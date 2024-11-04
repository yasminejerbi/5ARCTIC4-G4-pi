import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../model/User';
import { UserService } from 'src/app/services/User.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  id!:number
  user!:User
  constructor(private Act : ActivatedRoute,private service: UserService) {}
  ngOnInit(){
    this.id = this.Act.snapshot.params['id'];
    this.service.getUserById(this.id).subscribe(
{
     next: (data:any)=>{this.user=data
      console.log("photoooooooo",data)
     },
      error: (err) => console.log(err),
      complete: () => console.log('done')
    });
   // console.log(this.id);
  }
}
