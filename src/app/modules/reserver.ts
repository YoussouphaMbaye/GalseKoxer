import { Client } from "./client";
import { Voyage } from "./voyage";

export class Reserver{
    constructor(
        public idreserver:number,
        public dateReserver:string,
        public nbPlace:number,
        public tel:number,
        public client:Client,
        public voyage:Voyage,
    ){

    }
}