import { User } from "./User";
export enum TYPE {
    ERROR='error',
    SUCCESS='success',
    WARNING='warning',
    INFO='info',
    QUESTION='question'
  }
export enum Event_type {
    prive,
    publique,
    payant,
    gratuit
    
}
export class events {
     id!: number; 
     nomEvenement!: string; 
     lieuEvenement!: string; 
     actionEvenement!: string;
     dateDebut!: Date; 
     dateFin!: Date; 
     numPlaces!: number; 
     photo!: string; 
     eventType!: Event_type;
     utilisateurs!: User[];     
      
        
}