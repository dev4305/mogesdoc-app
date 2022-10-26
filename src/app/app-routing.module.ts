import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { KeycloakAngularModule } from 'keycloak-angular';
import { AppMainComponent } from './app.main.component';
import { KeycloakGuard } from './keycloak.guard';
import { PublicSpaceComponent } from './public-space/public-space.component';
import { RestrictedSpaceComponent } from './restricted-space/restricted-space.component';

const routes: Routes = [
  {path:'public', component: PublicSpaceComponent},
  {path:'restricted', component: RestrictedSpaceComponent},
  {path: '', component: AppMainComponent,canActivate: [KeycloakGuard]}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes), CommonModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
