export enum Role {
    super_admin,
    admin_club,
    user
}

export enum Interet {
    sport,
    music,
    tech,
    photographie,
    design,
    dessin,
    robots
}

export class User {
    constructor(  
        public id?: number,
        public nomUtilisateur?: string,
        public prenomUtilisateur?: string,
        public email?: string,
        public numTel?: string,
        public motDePasse?: string,
        public photo?: string,
        public role?: Role,
        public interet?: Interet
    ) {}
}
