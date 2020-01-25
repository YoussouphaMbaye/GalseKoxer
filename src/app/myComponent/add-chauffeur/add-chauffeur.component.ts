import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Chauffeur } from 'app/modules/chauffeur';
import { VoitureServiceService } from 'app/myservice/voiture-service.service';
import { Voiture } from 'app/modules/voiture';
import { Router } from '@angular/router';




@Component({
  selector: 'app-add-chauffeur',
  templateUrl: './add-chauffeur.component.html',
  styleUrls: ['./add-chauffeur.component.scss']
})
export class AddChauffeurComponent implements OnInit {

  constructor(private formB:FormBuilder,private voitureServ:VoitureServiceService,private router:Router) { }

  chaufForm:FormGroup;
  chauffeur:Chauffeur;
  isSubscribe=false;
  
  ngOnInit() {
    this.chaufForm=this.formB.group({
      nom:["",[Validators.required]],
      prenom:["",[Validators.required]],
      tel:["",[Validators.required]],
      matricule:["",Validators.required],
      type:["",Validators.required],
      nombreDePlace:["",Validators.required, ],
      password:["",[Validators.required,Validators.minLength(6)]],
      confirmPassword:["",Validators.required,],
  },{validator: this.MustMatch('password', 'confirmPassword')})
    
  }
  sincrire(){
    this.isSubscribe=true;
  }
  authChauffeur(f){
    let tel=f.value.tel;
    let password=f.value.password;
    this.voitureServ.getChauffeurById("/chauffeurs/search/chauffeurByTelPassword?password="+password+"&&tel="+tel).subscribe(
      (data)=>{
        this.chauffeur=data
        this.router.navigate(["/chauffeur"])
        sessionStorage.setItem("idChauffeur",this.chauffeur.idChauffeur.toString())
      },
      (err)=>{
        alert("login ou mot de passe invalide")
      }
    );
  }
  //acces facile aux formulaire
  get f() { return this.chaufForm.controls; }
  addChauffeur(){
    console.log("bbbbbbbb",this.chaufForm)
    const chF=this.chaufForm.value;
    
    console.log(chF);
    let chauf:Chauffeur=new Chauffeur(0,chF["nom"],chF["prenom"],chF["tel"],null,chF["password"],false);
    console.log(chauf.nom);
    this.voitureServ.addChauffeur("/addChauffeur",chauf).subscribe(
      data=>{
        this.chauffeur=data;
        const voiture=new Voiture(0,chF['matricule'],chF['nombreDePlace'],chF['type'],data,null);
        this.voitureServ.addVoiture("/addVoiture",voiture).subscribe(
          data1=>{
            console.log(data1.type)
            console.log(this.chaufForm.invalid)
            if(!this.chaufForm.invalid){
                  this.isSubscribe=false;
                }else{
                  console.log("------------------",this.f.confirmPassword.errors)
                  
                  console.log("------------------",this.f.password)
                }
          },
          err=>{console.log(err)}
          
        )
      },
      err=>{console.log(err)}

    );
  }
  MustMatch(controlName: string, matchingControlName: string){
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];
        console.log(control)
        console.log(matchingControl)

        

        // set error on matchingControl if validation fails
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ mustMatch: true });
        } else {
            matchingControl.setErrors(null);
        }
    }
}

}
