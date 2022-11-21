import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Organizacion } from '../model/organizacion';

@Injectable({
  providedIn: 'root'
})
export class OrganizacionService {

  private uri = 'http://'+environment.backendIP+':'+environment.backendPort+environment.backendVersion;

  constructor(private http: HttpClient) { }

  getAllOrganizaciones(){
    const headers = {'Accept': 'application/json'};
    return this.http.get(this.uri+'/organizaciones',{headers: headers});
  }

  createOrganizacion(organizacion: Organizacion){
    const headers = {'Content-Type': 'application/json'};
    const body = JSON.stringify(organizacion);
    return this.http.post(this.uri+'/organizaciones',body,{headers});
  }

  updateOrganizacion(organizacion: Organizacion){
    const headers = {'Content-Type': 'application/json'};
    const body = JSON.stringify(organizacion);
    return this.http.put(this.uri+'/organizaciones',body,{headers});
  }

}
