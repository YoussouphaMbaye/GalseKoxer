import { Component, OnInit } from '@angular/core';
import { VoitureServiceService } from 'app/myservice/voiture-service.service';
import { DatePipe } from '@angular/common';
import { Reserver } from 'app/modules/reserver';
import { Voyage } from 'app/modules/voyage';
import { forEach } from '@angular/router/src/utils/collection';
import { Voiture } from 'app/modules/voiture';
import { Chauffeur } from 'app/modules/chauffeur';

@Component({
  selector: 'app-liste-voyage',
  templateUrl: './liste-voyage.component.html',
  styleUrls: ['./liste-voyage.component.scss']
})
export class ListeVoyageComponent implements OnInit {

  voyages;
  lesVoyages;
  chauffeur:Chauffeur
  voiture:Voiture
  constructor(private voitureServ:VoitureServiceService) { }

  ngOnInit() {
    this.voitureServ.getVoyage("/voyages").subscribe(
      (data)=>{
        this.voyages=data
        console.log(this.voyages)
        //debut
        let voyages2:Voyage[]=[];
        let i=1;
        for(let v of this.voyages._embedded.voyages){
          
          
          voyages2.push(this.getVoiture(v))
         
          console.log(voyages2)
          i++;
        }
        this.lesVoyages=voyages2;
        console.log("mmmmmmmmmmmmmm"+this.voyages)
        
        //fin
       
        console.log(this.voyages)
      },
      (err)=>{
        console.log(err)
      }
    )
    console.log(this.voyages)
  }
  reserver(f,v:Voyage){
    console.log(f.value.tel)
    console.log(v)
    this.voitureServ.getClientByIdpv("/clients/"+sessionStorage.getItem("idClient")).subscribe(
      (data)=>{
        const client=data;
        
        const rs=new Reserver(0,null,f.value.nbPlace,f.value.tel,client,v);
        this.voitureServ.addReserver("/addReserver",rs).subscribe(
          (data)=>{
            let reserver=data
            //update voyage pour changer le nombre de place
            v.nbPlace=v.nbPlace-rs.nbPlace
            this.voitureServ.updateVoyage("/updateVoyage/",v).subscribe(
              (data)=>{
                let voyage=data
              },
              (err)=>{
                console.log(err)
              }
            )
          },
          (err)=>{
            console.log(err)

          }
        )
        const pipe=new DatePipe('en-fr')
        let a=Date.now()
        let now=pipe.transform(a,'short')
        console.log(now)
        
      },
      (err)=>{
        console.log(err)
      }
    )
   
  }
  getVoiture(v:Voyage):Voyage{
    this.voitureServ.getChauffeurById("/voyages/"+v.idVoyage+"/chauffeur").subscribe(
      (data1)=>{
        this.chauffeur=data1;
        //donne le voiture
        this.voitureServ.getVoitureById("/chauffeurs/"+this.chauffeur.idChauffeur+"/voiture").subscribe(
          (data2)=>{
            this.voiture=data2
            this.chauffeur.voiture=this.voiture
            v.chauffeur=this.chauffeur
          },
          (err)=>{
            console.log(err)
          }
        )
      },
      (err)=>{
        console.log(err);
      }
    )
    return v;
    
  }

}
