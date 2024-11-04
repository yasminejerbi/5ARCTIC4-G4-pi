import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ForumComponent } from './forum/forum.component';
import { EventsComponent } from './events/events.component';
import { ClubsComponent } from './clubs/clubs.component';
import { ComplaintsComponent } from './complaints/complaints.component';
import { ContactComponent } from './contact/contact.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ProfileComponent } from './profile/profile.component';
import {MatCardModule} from '@angular/material/card';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {MatBadgeModule} from '@angular/material/badge';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AjouterForumComponent } from './ajouter-forum/ajouter-forum.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { UpdateForumComponent } from './update-forum/update-forum.component';
import { Router } from '@angular/router';
import { CommentComponent } from './comment/comment.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBarModule } from '@angular/material/snack-bar';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    LoginComponent,
    HomeComponent,
    ForumComponent,
    EventsComponent,
    ClubsComponent,
    ComplaintsComponent,
    ContactComponent,
    NotFoundComponent,
    ProfileComponent,
    
  
    
    AjouterForumComponent,
              UpdateForumComponent,
              CommentComponent,
          
    
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatCardModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatPaginatorModule,
    MatBadgeModule,
    MatDialogModule,
    MatFormFieldModule,
    FormsModule ,
    HttpClientModule,
    ReactiveFormsModule,
    MatIconModule,MatSnackBarModule
    
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
