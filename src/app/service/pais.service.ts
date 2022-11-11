import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Pais } from '../model/pais';

@Injectable({
  providedIn: 'root'
})
export class PaisService {

  private uri = 'http://'+environment.backendIP+':'+environment.backendPort+environment.backendVersion;

  constructor(private http: HttpClient) { }

  getAllPaises(){
    const headers = {'Accept': 'application/json'};
    return this.http.get(this.uri+'/paises',{headers: headers});
  }

  crearPais(pais: Pais){
    const headers = {'Content-Type': 'application/json'};
    const body = JSON.stringify(pais);
    return this.http.post(this.uri+'/paises',body,{headers});
  }

  updatePais(pais: Pais){
    const headers = {'Content-Type': 'application/json'};
    const body = JSON.stringify(pais);
    return this.http.put(this.uri+'/paises',body,{headers});
  }

}
