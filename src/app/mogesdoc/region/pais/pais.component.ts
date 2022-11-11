import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Message } from 'primeng/api';
import { Table } from 'primeng/table';
import { Pais } from 'src/app/model/pais';
import { PaisService } from 'src/app/service/pais.service';

@Component({
  selector: 'app-pais',
  templateUrl: './pais.component.html',
  styleUrls: ['./pais.component.scss']
})
export class PaisComponent implements OnInit {

  @ViewChild('filter') filter!: ElementRef;
  
  loading:boolean = true;
  paisDialog: boolean = false;

  pais: Pais = new Pais();
  ePais: Pais = new Pais();

  dropdownItems = [
    {name: '-', code: 'N'},
    {name: 'Activo', code: 'A'},
    {name: 'Inactivo', code: 'I'}
  ];

  estadoSelected: any;
  registros: any;

  msgs: Message[] = [];
  paises: Pais[] = [];

  constructor(private paisService: PaisService) { }

  ngOnInit(): void {
    this.obtenerPaises();
  }

  obtenerPaises(){
    this.paisService.getAllPaises().subscribe({
      next: (data) => {
        this.loading = false;
        if(null != data){
          this.registros = data;
          for(let i=0; i<this.registros.length; i++){
            this.paises.push(this.registros[i]);
          } 
        }
      }
    });
  }

  registrarPais() {
    let paisRegistro = new Pais();
    paisRegistro.codigo = this.pais.codigo;
    paisRegistro.nombre = this.pais.nombre;
    paisRegistro.estado = this.estadoSelected.code;
    this.paisService.crearPais(paisRegistro).subscribe({
      complete: () => {
        this.paises = [];
        this.obtenerPaises();
        window.location.reload();
      },
      error: (e) => {
        this.msgs = [];
        this.msgs.push({ severity: 'error', summary: 'Error en Registro', detail: 'Validar el Contenido del Registro.' });
      }
    });
  }

  editPais(paisEditar: Pais){
    this.paisDialog = true;
    this.ePais = {...paisEditar};
  }

  updatePais(){
    this.ePais.estado = this.estadoSelected.code;
    this.paisService.updatePais(this.ePais).subscribe({
      complete: () => {
        this.msgs = [];
        this.msgs.push({ severity: 'success', summary: 'Actualización de Registro', detail: 'Registro Actualizado Exitosamente en el Sistema.'});
        this.paises = [];
        this.paisDialog = false;
        window.location.reload();
      },
      error: (e) => {
        this.msgs = [];
        this.msgs.push({ severity: 'error', summary: 'Error en Registro', detail: 'Validar el Contenido del Registro. '+e.message+'\n'+e.error.error});
      }
    });
  }
  
  clear(table: Table){
    table.clear();
    this.filter.nativeElement.value = '';
  }

}
