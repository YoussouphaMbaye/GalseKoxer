import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest, HttpEvent } from '@angular/common/http';
import { RequestOptions } from '@angular/http';
import { Chauffeur } from 'app/modules/chauffeur';
import { Observable } from 'rxjs';
import { Voiture } from 'app/modules/voiture';
import { Client } from 'app/modules/client';
import { Voyage } from 'app/modules/voyage';
import { Reserver } from 'app/modules/reserver';

@Injectable({
  providedIn: 'root'
})
export class VoitureServiceService {

  constructor(private httpc:HttpClient) { }
  clients:any=[];
  host="http://localhost:3020"
  getRessource(url:String){

    return this.httpc.get(this.host+url);
  }
  addChauffeur(url:String,chauf:Chauffeur):Observable<Chauffeur>{
    let header=new HttpHeaders({'content-type':'application/json'});
    
    return this.httpc.post<Chauffeur>(this.host+url,chauf,{headers : header} );

  }
  header=new HttpHeaders({'content-type':'application/json'});
  addVoiture(url:String,voiture:Voiture):Observable<Voiture>{
    
    
    return this.httpc.post<Voiture>(this.host+url,voiture,{headers : this.header} );

  }
  addClient(url:String,client:Client):Observable<Client>{
    return this.httpc.post<Client>(this.host+url,client,{headers : this.header});
  }
  getClientByIdpv(url:String):Observable<Client>{
    return this.httpc.get<Client>(this.host+url)
  }
  addVoyage(url:String,voyage:Voyage):Observable<Voyage>{
    return this.httpc.post<Voyage>(this.host+url,voyage,{headers : this.header});
  }
  updateVoyage(url:String,voyage:Voyage):Observable<Voyage>{
    return this.httpc.put<Voyage>(this.host+url,voyage,{headers : this.header});
  }
  getChauffeurById(url:String):Observable<Chauffeur>{
    return this.httpc.get<Chauffeur>(this.host+url)
  }
  getVoyage(url:String):Observable<Voyage[]>{
    return this.httpc.get<Voyage[]>(this.host+url)
  }
  getVoyageById(url:String):Observable<Voyage>{
    return this.httpc.get<Voyage>(this.host+url)
  }
  
  getVoitureById(url:String):Observable<Voiture>{
    return this.httpc.get<Voiture>(this.host+url)
  }
  addReserver(url:string,reserver:Reserver):Observable<Reserver>{
    return this.httpc.post<Reserver>(this.host+url,reserver);
  }
  uploadPhoto(file:File,url:string):Observable<HttpEvent<{}>>{
    let formData:FormData =new FormData();
    formData.append("file",file)
    const req=new HttpRequest("POST",this.host+url,formData)
    return this.httpc.request(req)
  }
  
}
