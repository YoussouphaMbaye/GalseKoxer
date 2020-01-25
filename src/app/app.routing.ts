import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { ComponentsComponent } from './components/components.component';
import { ProfileComponent } from './examples/profile/profile.component';
import { SignupComponent } from './examples/signup/signup.component';
import { LandingComponent } from './examples/landing/landing.component';
import { NucleoiconsComponent } from './components/nucleoicons/nucleoicons.component';
import { AcceuilComponent } from './myComponent/acceuil/acceuil.component';
import { AddChauffeurComponent } from './myComponent/add-chauffeur/add-chauffeur.component';
import { AddVoitureComponent } from './myComponent/add-voiture/add-voiture.component';
import { SocialLoginComponent } from './myComponent/social-login/social-login.component';
import { AddClientComponent } from './myComponent/add-client/add-client.component';
import { ChauffeurComponent } from './myComponent/chauffeur/chauffeur.component';
import {ListeVoyageComponent } from './myComponent/liste-voyage/liste-voyage.component';
import { VoyageComponent } from './myComponent/voyage/voyage.component';
import { DetailsVoyageComponent } from './myComponent/details-voyage/details-voyage.component';

const routes: Routes =[
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home',             component: ComponentsComponent },
    { path: 'user-profile',     component: ProfileComponent },
    { path: 'signup',           component: SignupComponent },
    { path: 'landing',          component: LandingComponent },
    { path: 'nucleoicons',      component: NucleoiconsComponent },
    { path: 'acceuil',      component: AcceuilComponent },
    { path: 'ajoutChauffeur',      component: AddChauffeurComponent },
    { path: 'ajoutVoiture',      component: AddVoitureComponent },
    { path: 'socialLogin',      component: SocialLoginComponent },
    { path: 'ajoutClient',      component: AddClientComponent },
    { path: 'chauffeur',      component: ChauffeurComponent },
    { path: 'voyage',      component: VoyageComponent },
    { path: 'listeVoyage', component: ListeVoyageComponent },
    { path: 'detailVoyage/:voyage', component: DetailsVoyageComponent },
    { path: 'chauffeur/:idch', component: ChauffeurComponent },
];


@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes,{
      useHash: true
    })
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
