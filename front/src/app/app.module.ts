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
import { AddSponsorComponent } from './Sponsor/add-sponsor/add-sponsor.component';
import { ListSponsorComponent } from './Sponsor/list-sponsor/list-sponsor.component';
import { UpdateSponsorComponent } from './Sponsor/update-sponsor/update-sponsor.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

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
    AddSponsorComponent,
    ListSponsorComponent,
    UpdateSponsorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
