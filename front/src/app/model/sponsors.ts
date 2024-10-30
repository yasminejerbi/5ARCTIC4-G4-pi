import { events } from './event';
export enum sponsors_type {
    material,
    financier
    // Ajoutez plus de catégories ici si nécessaire
}
export class sponsors{
    constructor(
        public id: number, 
        public nomSponsor: string, 
        public dureeSponsoring: number, 
        public montant: number,
        public email: string, 
        public numTel: string, 
        public logo: string, 
        public typeSponsoring: sponsors_type,
        public evenements: events[]
    ){}
}