import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/services/event/event.service';
import {Event_type, TYPE, events} from 'src/app/model/event';
import { Router } from '@angular/router';
import { sponsors } from '../model/sponsors';

import Swal from 'sweetalert2'

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css'],
  
})
export class EventsComponent{ 
    pageSize = 5;
    page = 1  
    searchEvents : any[] = [];
    searchInput!: string;
    eventsGrp: events[] = [];
    sponsorsGRP: sponsors[] = []
    eventTypes = Event_type;
    eventTypeCounts: { [key: string]: number } = {};
    filteredEvents: events[] = [];
/**count event_types */
    getEventTypes(): Event_type[] {
      const types :any[] = [];
      for (const type in this.eventTypes) {
        if (isNaN(Number(type))) {
          types.push(type);
        }
      }
      return types;
    }

    countEventTypes(): void {
    this.eventTypeCounts = {};
    this.eventsGrp.forEach((event) => {
      if (event.eventType in this.eventTypeCounts) {
        this.eventTypeCounts[event.eventType]++;
      } else {
        this.eventTypeCounts[event.eventType] = 1;
      }
    });
  }
/**load events */  

    loadEvents(): void {
      this.eventService.listevents().subscribe(events => {
        this.eventsGrp = events
        this.searchEvents = this.eventsGrp
        this.countEventTypes();
      })
      
      this.eventService.listSponsors().subscribe(sponsors => {
        this.sponsorsGRP = sponsors});
      
    
  }
  Supp(id:number){
    this.eventService.deleteEvent(id).subscribe(()=>
      
      this.ngOnInit()
    )
    this.toast(TYPE.INFO,"Event deleted successfully")
  }
  /**Search */
  SearchedEvents() {
    
    this.searchEvents = this.eventsGrp.filter(event =>
      !this.searchInput || event.nomEvenement.toLowerCase().includes(this.searchInput.toLowerCase())
    );
    
  }
  /**sweetalert */
  toast(typeIcon = TYPE.SUCCESS,message: string, timerProgressBar: boolean = false) {
    Swal.fire({
      toast: true,
      position: 'top',
      showConfirmButton: false,
      icon: typeIcon,
      timerProgressBar,
      timer: 3000,
      title: message
    })
  }
  
    ngOnInit(): void{
      this.loadEvents();
      this.searchEvents = this.eventsGrp
      
      this.page = 1
    }
    
    constructor(private eventService: EventService) { };

}
