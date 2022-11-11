import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Message } from 'primeng/api';
import { Table } from 'primeng/table';
import { TipoCorrespondencia } from 'src/app/model/tipoCorrespondencia';
import { TipoCorrespondenciaService } from 'src/app/service/tipo-correspondencia.service';

@Component({
  selector: 'app-tipo-correspondencia',
  templateUrl: './tipo-correspondencia.component.html',
  styleUrls: ['./tipo-correspondencia.component.scss']
})
export class TipoCorrespondenciaComponent implements OnInit {

  @ViewChild('filter') filter!: ElementRef;

  tipoCorresDialog: boolean = false;

  msgs: Message[] = [];

  estado: any = null;
  nombre: string = '';
  descripcion: string = '';
  estadoSelected: any;

  eTipoCorrespondencia = new TipoCorrespondencia();

  tipos: any;
  tiposCorrespondencia: TipoCorrespondencia[]=[];
  loading:boolean = true;

  dropdownItems = [
    { name: '_', code: 'N' },
    { name: 'Activo', code: 'A' },
    { name: 'Inactivo', code: 'I' }
  ];

  statuses!: any[];

  constructor(private tipoCorrespondencia: TipoCorrespondenciaService) { }

  ngOnInit(): void {
    this.obtenerListadoTipoCorrespondencia();
    this.statuses = [
      {label: 'Activo', value: 'A'},
      {label: 'Inactivo', value: 'I'}
    ];
  }

  obtenerListadoTipoCorrespondencia(){
    this.tipoCorrespondencia.obtenerTiposCorrespondencia().subscribe((data) => {
      this.loading = false;
      this.tipos = data;
      for(let i=0; i<this.tipos.length; i++){
        this.tiposCorrespondencia.push(this.tipos[i]);
      }
    });
  }

  registraTipoCorrespondencia(){
    let tipoC = new TipoCorrespondencia();
    tipoC.estado = this.estado.code;
    tipoC.descripcion = this.descripcion;
    tipoC.nombre = this.nombre;
    this.tipoCorrespondencia.createTipoCorrespondencia(tipoC).subscribe(
      {
        error: (e) => {
          this.msgs = [];
          this.msgs.push({ severity: 'error', summary: 'Error en Registro', detail: 'Validar el Contenido del Registro.' });
        },
        complete: () => {
          this.msgs = [];
          this.msgs.push({ severity: 'success', summary: 'Creación de Registro', detail: 'Registro Creado Exitosamente en el Sistema.' });
          window.location.reload();
        }
      }
    );
  }

  clear(table: Table) {
    table.clear();
    this.filter.nativeElement.value = '';
  }

  editTipoCorrespondencia(tipocorres: TipoCorrespondencia){
    this.estadoSelected.code = tipocorres.estado;
    this.tipoCorresDialog = true;
    this.eTipoCorrespondencia = {...tipocorres};
  }

  updateTipoCorrespondencia(){
    this.eTipoCorrespondencia.estado = this.estadoSelected.code;
    this.tipoCorrespondencia.updateTipoCorrespondencia(this.eTipoCorrespondencia).subscribe({
      next: (v) => {
        this.tipoCorresDialog = false;
        window.location.reload();
      },
      error: (e) => {
        console.log('   ', e);
        this.msgs = [];
        this.msgs.push({ severity: 'error', summary: 'Error en Registro', detail: 'Validar el Contenido del Registro. '+e.message+'\n'+e.error.error});
      },
      complete: () => console.info('complete') 
    });
  }

}
