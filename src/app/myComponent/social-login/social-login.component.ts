import { Component, OnInit } from '@angular/core';
import {SocialUser, AuthService, FacebookLoginProvider, GoogleLoginProvider} from 'ng4-social-login';
import { Client } from 'app/modules/client';
import { VoitureServiceService } from 'app/myservice/voiture-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-social-login',
  templateUrl: './social-login.component.html',
  styleUrls: ['./social-login.component.scss']
})
export class SocialLoginComponent implements OnInit {

  user :any=SocialUser;
  client:Client;
  constructor( private socialAuthService:AuthService,private voitureServ:VoitureServiceService ,private router:Router) { }

  ngOnInit() {
    sessionStorage.clear()
  }
  facebookLogin(){
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID).then(
      (userData)=>{
      
      console.log(this.user)
      //http://localhost:3020/clients/search/clientIdpv?idpv=112254271736114293078
      this.voitureServ.getClientByIdpv("/clients/search/clientIdpv?idpv="+userData.id).subscribe(
        (data)=>{
          console.log(data)
          this.client=data
          if(this.client!=null){
            this.user=userData;
            sessionStorage.setItem('photoUrl',userData.photoUrl)
            this.router.navigate(['/chauffeur',this.user])
            console.log("user not null")
          }else{
            this.router.navigate(['/socialLogin'])
            this.user=null
            console.log("user  null")
          }
        },(err)=>{
          console.log(err)
          this.user=null
          this.router.navigate(['/socialLogin'])
          console.log("user  null")
        });
    },
    (err)=>{
      console.log(err)
    });
  }
  //compte log in
  compteLogin(f){
    //http://localhost:3020/clients/search/clientEmailPassword?email=laye@l.com&&password=yyy
    console.log(f.value)
    //getClientByEmailPassword
    this.voitureServ.getClientByIdpv("/clients/search/clientEmailPassword?email="+f.value['email']+"&&password="+f.value['password']).subscribe(
      (data)=>{
        console.log(data)
        this.client=data
        if(this.client!=null){
          sessionStorage.setItem("idClient",this.client.idClient.toString());
          
          this.router.navigate(['/listeVoyage'])
          console.log("user not null")
        }else{
          this.router.navigate(['/socialLogin'])
          
          console.log("user  null")
        }
      },(err)=>{
        console.log(err)
        this.user=null
        this.router.navigate(['/socialLogin'])
        console.log("user  null")
      });
  
  }
  googleLogin(){
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID).then((userData)=>{
      this.user=userData;
      console.log(this.user);
    },(err)=>{
      console.log(err)
    });
    
  }
  //create logIn client Facebook
  createfacebookLogin(){
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID).then((userData)=>{
      this.user=userData;
      this.client=new Client(0,userData.id,userData.name,userData.email,null,null,userData.provider,userData.photoUrl);
      
      
      if(this.client!=null){
        this.voitureServ.addClient("/addClient",this.client).subscribe(
          (data)=>{
            console.log("ccccccccccccccc"+this.client.nom)
            this.client=data;
            console.log("add--"+data.nom);
          },(err)=>{
            console.log(err);
          }
        );
      }
    });

  }
  //create logIn client google
  creategoogleLogin(){
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID).then((userData)=>{
      this.user=userData;
      this.client=new Client(0,userData.id,userData.name,userData.email,null,null,userData.provider,userData.photoUrl);
      
      console.log(this.client)
      console.log(this.user);
      console.log("eeeeeeeeeeeeee")
    if(this.client!=null){
      this.voitureServ.addClient("/addClient",this.client).subscribe(
        (data)=>{
          console.log("dans le save")
          console.log(this.client.nom)
          this.client=data;
          console.log("add--"+data.nom);
        },(err)=>{
          console.log(err);
        }
      )
    }
    });
    
  }
  
  

}
