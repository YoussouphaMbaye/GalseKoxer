import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';

import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';

import { ComponentsModule } from './components/components.module';
import { ExamplesModule } from './examples/examples.module';
import { AcceuilComponent } from './myComponent/acceuil/acceuil.component';
import { HttpClientModule } from '@angular/common/http';
import { VoitureServiceService } from './myservice/voiture-service.service';
import { AddChauffeurComponent } from './myComponent/add-chauffeur/add-chauffeur.component';
import { AddVoitureComponent } from './myComponent/add-voiture/add-voiture.component';
import {SocialLoginModule,AuthServiceConfig,GoogleLoginProvider,FacebookLoginProvider,LinkedinLoginProvider} from 'ng4-social-login';
import { SocialLoginComponent } from './myComponent/social-login/social-login.component';
import { AddClientComponent } from './myComponent/add-client/add-client.component';
import { ChauffeurComponent } from './myComponent/chauffeur/chauffeur.component';
import { VoyageComponent } from './myComponent/voyage/voyage.component';
import { ListeVoyageComponent } from './myComponent/liste-voyage/liste-voyage.component';
import { DetailsVoyageComponent } from './myComponent/details-voyage/details-voyage.component';

const config=new AuthServiceConfig([
{
  id:GoogleLoginProvider.PROVIDER_ID,
  provider: new GoogleLoginProvider('491502939933-06upsgegrb89n7uksussrval3lu3v33s.apps.googleusercontent.com')
},
{
  id:FacebookLoginProvider.PROVIDER_ID,
  provider:new FacebookLoginProvider('2587972848171740')
}
],false);

export function prvideConfig(){
  return config;
}

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    AcceuilComponent,
    AddChauffeurComponent,
    AddVoitureComponent,
    SocialLoginComponent,
    AddClientComponent,
    ChauffeurComponent,
    VoyageComponent,
    ListeVoyageComponent,
    DetailsVoyageComponent
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    FormsModule,
    RouterModule,
    ComponentsModule,
    ExamplesModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    SocialLoginModule
  ],
  providers: [VoitureServiceService,
  {provide:AuthServiceConfig, useFactory:prvideConfig}],
  bootstrap: [AppComponent]
})
export class AppModule { }
