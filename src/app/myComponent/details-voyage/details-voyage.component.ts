import { Component, OnInit } from '@angular/core';
import { VoitureServiceService } from 'app/myservice/voiture-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Chauffeur } from 'app/modules/chauffeur';
import { Voyage } from 'app/modules/voyage';
import { Voiture } from 'app/modules/voiture';
import { Reserver } from 'app/modules/reserver';

@Component({
  selector: 'app-details-voyage',
  templateUrl: './details-voyage.component.html',
  styleUrls: ['./details-voyage.component.scss']
})
export class DetailsVoyageComponent implements OnInit {

  constructor(private voitureServ:VoitureServiceService,private router:ActivatedRoute) { }

  voyage:Voyage
  chauffeur:Chauffeur;
  voiture:Voiture
  reserver=false
  ngOnInit() {
    let i=this.router.snapshot.params["voyage"]
    console.log(i);
    this.voitureServ.getVoyageById("/voyages/"+i).subscribe(
      (data)=>{
        this.voyage=data
        //donne le chauffeur
        this.voitureServ.getChauffeurById("/voyages/"+this.voyage.idVoyage+"/chauffeur").subscribe(
          (data1)=>{
            this.chauffeur=data1;
            //donne le voiture
            this.voitureServ.getVoitureById("/chauffeurs/"+this.chauffeur.idChauffeur+"/voiture").subscribe(
              (data2)=>{
                this.voiture=data2
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
      },
      (err)=>{
        console.log(err)
      }
    )
  }
  preReserver(){
    this.reserver=true
  }
  reservation(f,v:Voyage){
    console.log(f.value.nbPlace)
    console.log(v)
    this.voitureServ.getClientByIdpv("/clients/"+1).subscribe(
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
        
        
      },
      (err)=>{
        console.log(err)
      }
    )
   
  }

}
