import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Unidad } from '../model/unidad';

@Injectable({
  providedIn: 'root'
})
export class UnidadService {

  private uri = 'http://'+environment.backendIP+':'+environment.backendPort+environment.backendVersion;
  
  constructor(private http: HttpClient) { }

  getAllUnidades(){
    const headers = {'Accept': 'application/json'};
    return this.http.get(this.uri+'/unidades',{headers: headers});
  }

  crearUnidad(unidad: Unidad){
    const headers = {'Content-Type': 'application/json'};
    const body = JSON.stringify(unidad);
    return this.http.post(this.uri+'/unidades',body,{headers});
  }

  updateUnidad(unidad: Unidad){
    const headers = {'Content-Type': 'application/json'};
    const body = JSON.stringify(unidad);
    return this.http.put(this.uri+'/unidades',body,{headers});
  }

}
