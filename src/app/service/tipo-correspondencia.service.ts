import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.local';
import { TipoCorrespondencia } from '../model/tipoCorrespondencia';

@Injectable({
  providedIn: 'root'
})
export class TipoCorrespondenciaService {

  //private url = 'http://'+environment.mogesdocBackendIp+':'+environment.mogesdocBackendPort;

  constructor(private http: HttpClient) { }

  obtenerTiposCorrespondencia(){
    const headers = {'Accept': 'application/json'};
    return this.http.get('/api/Tipo_Correspondencia',{headers: headers});
  }

  createTipoCorrespondencia(tipoCorrespondencia: TipoCorrespondencia): Observable<any>{
    const headers = {'content-type': 'application/json'}
    const body = JSON.stringify(tipoCorrespondencia);
    console.log(body);
    return this.http.post('/api/Tipo_Correspondencia',body, {headers: headers});
  }

  updateTipoCorrespondencia(tipoCorrespondencia: TipoCorrespondencia): Observable<any>{
    const headers = {'content-type': 'application/json'}
    const body = JSON.stringify(tipoCorrespondencia);
    console.log(body);
    return this.http.put('/api/Tipo_Correspondencia',body, {headers: headers});
  }

}
