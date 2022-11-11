import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { TipoPrefijo } from '../model/tipoPrefijo';

@Injectable({
  providedIn: 'root'
})
export class TipoPrefijoService {

  private uri = 'http://'+environment.backendIP+':'+environment.backendPort+environment.backendVersion;

  constructor(private http: HttpClient) { }

  getAllTipoPrefijo() {
    const headers = {'Accept': 'application/json'};
    return this.http.get(this.uri+'/tiposPrefijo',{headers: headers});
  }

  createTipoPrefijo(tipoPrefijo: TipoPrefijo) {
    const headers = {'Content-Type': 'application/json'};
    const body = JSON.stringify(tipoPrefijo);
    return this.http.post(this.uri+'/tiposPrefijo', body, {headers});
  }

  updateTipoPrefijo(tipoPrefijo: TipoPrefijo) {
    const headers = {'Content-Type': 'application/json'};
    const body = JSON.stringify(tipoPrefijo);
    return this.http.put(this.uri+'/tiposPrefijo', body, {headers});
  }

}
