import { Component, OnInit } from '@angular/core';
import { VoitureServiceService } from 'app/myservice/voiture-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Voiture } from 'app/modules/voiture';
import { Chauffeur } from 'app/modules/chauffeur';
import { HttpEventType, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-chauffeur',
  templateUrl: './chauffeur.component.html',
  styleUrls: ['./chauffeur.component.scss']
})
export class ChauffeurComponent implements OnInit {

  constructor(private voitureServ:VoitureServiceService,private aRouter:ActivatedRoute,private router:Router) { }
  url;
  voiture:Voiture;
  chauffeur:Chauffeur;
  selectedFile;
  currentFile;
  progressBar:number=0;
  ngOnInit() {
    //this.url=sessionStorage.getItem("photoUrl");
    let id=sessionStorage.getItem("idChauffeur");
    console.log(id)
    this.voitureServ.getChauffeurById("/chauffeurs/"+id).subscribe(
      (data)=>{
        this.chauffeur=data
        this.voitureServ.getVoitureById("/voitures/"+this.chauffeur.idChauffeur).subscribe(
          (data1)=>{
            this.voiture=data1
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
  upSelect(event){
    this.selectedFile=event.target.files;
    this.currentFile=this.selectedFile.item(0)
    console.log(this.currentFile)
    this.voitureServ.uploadPhoto(this.currentFile,"/uploadPhoto/"+this.voiture.idVoiture).subscribe(
      (event)=>{
        if(event.type === HttpEventType.UploadProgress){
          this.progressBar=Math.round(100*(event.loaded/event.total))
          console.log(this.progressBar)
        }else if (event instanceof HttpResponse){
          alert("chargement termine")
          
        }
        //this.router.navigate(["chauffeur",this.chauffeur.idChauffeur])
        //recharger la page
        location.reload()
      },
      (err)=>{
        alert("probleme de chargement")
        console.log(err)
      }
    )
  }

}
