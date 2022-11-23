import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Area } from '../model/area';

@Injectable({
  providedIn: 'root'
})
export class AreaService {

  private uri = 'http://'+environment.backendIP+':'+environment.backendPort+environment.backendVersion;

  constructor(private http: HttpClient) { }

  getAllAreas(){
    const headers = {'Accept': 'application/json'};
    return this.http.get(this.uri+'/areas',{headers: headers});
  }

  crearArea(area: Area){
    const headers = {'Content-Type': 'application/json'};
    const body = JSON.stringify(area);
    return this.http.post(this.uri+'/areas',body,{headers});
  }

  updateArea(area: Area){
    const headers = {'Content-Type': 'application/json'};
    const body = JSON.stringify(area);
    return this.http.put(this.uri+'/areas',body,{headers});
  }

}
