import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TipoCorrespondencia } from '../model/tipoCorrespondencia';

@Injectable({
  providedIn: 'root'
})
export class TipoCorrespondenciaService {

  private uri = 'http://'+environment.backendIP+':'+environment.backendPort+environment.backendVersion;

  constructor(private http: HttpClient) { }

  obtenerTiposCorrespondencia(){
    const headers = {'Accept': 'application/json'};
    return this.http.get(this.uri+'/tiposCorrespondencia',{headers: headers});
  }

  createTipoCorrespondencia(tipoCorrespondencia: TipoCorrespondencia): Observable<any>{
    const headers = {'content-type': 'application/json'}
    const body = JSON.stringify(tipoCorrespondencia);
    return this.http.post(this.uri+'/tiposCorrespondencia',body, {headers: headers});
  }

  updateTipoCorrespondencia(tipoCorrespondencia: TipoCorrespondencia): Observable<any>{
    const headers = {'content-type': 'application/json'}
    const body = JSON.stringify(tipoCorrespondencia);
    console.log(body);
    return this.http.put(this.uri+'/tiposCorrespondencia',body, {headers: headers});
  }

}
