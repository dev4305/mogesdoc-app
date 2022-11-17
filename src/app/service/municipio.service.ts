import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Municipio } from '../model/municipio';

@Injectable({
  providedIn: 'root'
})
export class MunicipioService {

  private uri = 'http://'+environment.backendIP+':'+environment.backendPort+environment.backendVersion;

  constructor(private http: HttpClient) { }

  getAllMunicipios(){
    const headers = {'Accept': 'application/json'};
    return this.http.get(this.uri+'/municipios',{headers: headers});
  }

  crearMunicipio(municipio: Municipio){
    const headers = {'Content-Type': 'application/json'};
    const body = JSON.stringify(municipio);
    return this.http.post(this.uri+'/municipios',body,{headers});
  }

  updateMunicipio(municipio: Municipio){
    const headers = {'Content-Type': 'application/json'};
    const body = JSON.stringify(municipio);
    return this.http.post(this.uri+'/municipios',body,{headers});
  }

}
