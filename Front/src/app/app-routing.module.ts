import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ForumComponent } from './forum/forum.component';
import { EventsComponent } from './events/events.component';
import { ClubsComponent } from './clubs/clubs.component';
import { ComplaintsComponent } from './complaints/complaints.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ProfileComponent } from './profile/profile.component';
import { ContactComponent } from './contact/contact.component';
import { RegisterComponent } from './register/register.component';
import { UpdateProfileComponent } from './update-profile/update-profile.component';
import { MdpComponent } from './mdp/mdp.component';
import { IAComponent } from './ia/ia.component';
import { ComptageESComponent } from './comptage-es/comptage-es.component';
import { ComptageFouleComponent } from './comptage-foule/comptage-foule.component';

const routes: Routes = [

  //route par defaut
  {path:'' , redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', component : HomeComponent },
  { path: 'forum', component : ForumComponent },
  { path: 'events', component : EventsComponent },
  { path: 'clubs', component : ClubsComponent },
  { path: 'complaints', component : ComplaintsComponent },
  { path: 'login', component : LoginComponent },
  { path: 'profile/:id', component : ProfileComponent },
  { path: 'contact', component : ContactComponent },
  { path: 'register', component : RegisterComponent },
  { path: 'update/:id' , component : UpdateProfileComponent},
  { path: 'mdp' , component : MdpComponent},
  { path: 'ia' , component : IAComponent},
  { path: 'es' , component : ComptageESComponent},
  { path: 'foule' , component : ComptageFouleComponent},
    //route parametré
/*
  { path: 'detail/:id' , component : DetailProductComponent},
  { path: 'appartement/:id' , component : AppartementComponent},*/
  //route NotFound
  {path:'**' , component: NotFoundComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
