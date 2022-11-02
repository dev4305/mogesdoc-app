import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { KeycloakAngularModule } from 'keycloak-angular';
import { AppMainComponent } from './app.main.component';
import { KeycloakGuard } from './keycloak.guard';
import { CommonEditorComponent } from './mogesdoc/common-editor/common-editor.component';
import { TipoCorrespondenciaComponent } from './mogesdoc/tipo-correspondencia/tipo-correspondencia.component';
import { TipoPrefijoComponent } from './mogesdoc/tipo-prefijo/tipo-prefijo.component';

const routes: Routes = [
  {
    path: '', component: AppMainComponent,canActivate: [KeycloakGuard],
    children:[
      {path:'mogesdoc/editor', component: CommonEditorComponent},
      {path:'mogesdoc/tipoCorrespondencia', component: TipoCorrespondenciaComponent},
      {path:'mogesdoc/tipoPrefijo', component: TipoPrefijoComponent}
    ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes), CommonModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
