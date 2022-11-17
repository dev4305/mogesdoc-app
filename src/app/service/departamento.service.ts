import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Departamento } from '../model/departamento';

@Injectable({
  providedIn: 'root'
})
export class DepartamentoService {

  private uri = 'http://'+environment.backendIP+':'+environment.backendPort+environment.backendVersion;

  constructor(private http: HttpClient) { }

  getAllDepartamentos(){
    const headers = {'Accept': 'application/json'};
    return this.http.get(this.uri+'/departamentos',{headers: headers});
  }

  getMunicipiosByPais(idPais: number){
    const headers = {'Accept': 'application/json'};
    return this.http.get(this.uri+'/departamentos/findByPais/'+idPais,{headers: headers});
  }

  crearDepartamento(departamento: Departamento){
    const headers = {'Content-Type': 'application/json'};
    const body = JSON.stringify(departamento);
    return this.http.post(this.uri+'/departamentos',body,{headers});
  }

  updatePais(departamento: Departamento){
    const headers = {'Content-Type': 'application/json'};
    const body = JSON.stringify(departamento);
    return this.http.put(this.uri+'/departamentos',body,{headers});
  }

}
