import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TipoPrefijo } from '../model/tipoPrefijo';

@Injectable({
  providedIn: 'root'
})
export class TipoPrefijoService {

  constructor(private http: HttpClient) { }

  getAllTipoPrefijo() {
    const headers = {'Accept': 'application/json'};
    //return this.http.get('http://carsma-001-site1.htempurl.com/api/Tipo_Prefijo');
    return this.http.get('');
  }

  createTipoPrefijo(tipoPrefijo: TipoPrefijo) {
    const headers = {'Content-Type': 'application/json'};
    const body = JSON.stringify(tipoPrefijo);
    return this.http.post('/api/Tipo_Prefijo', body, {headers});
  }

  updateTipoPrefijo(tipoPrefijo: TipoPrefijo) {
    const headers = {'Content-Type': 'application/json'};
    const body = JSON.stringify(tipoPrefijo);
    return this.http.put('/api/Tipo_Prefijo', body, {headers});
  }

}
