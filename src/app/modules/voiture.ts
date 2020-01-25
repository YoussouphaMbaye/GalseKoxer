import { Chauffeur } from "./chauffeur";

export class Voiture{
    constructor(public idVoiture:number,public matricule:String,public nombreDePlace:number,public type:String,public Chauffeur:Chauffeur,photo:string){

    }
}