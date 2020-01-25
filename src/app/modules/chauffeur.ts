import { Voiture } from "./voiture";

export class Chauffeur{
    constructor(public idChauffeur:number,public nom:String,public prenom:String,public tel:String,public voiture:Voiture,public password:string,public etat:boolean){}
}