import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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

  estado: any = null;
  nombre: string = '';
  descripcion: string = '';
  estadoSelected: any;

  eTipoCorrespondencia = new TipoCorrespondencia();

  tipos: any;
  tiposCorrespondencia: TipoCorrespondencia[]=[];
  loading:boolean = true;

  dropdownItems = [
    { name: '-', code: false },
    { name: 'Activo', code: true },
    { name: 'Inactivo', code: false }
  ];

  statuses!: any[];

  constructor(private tipoCorrespondencia: TipoCorrespondenciaService) { }

  ngOnInit(): void {
    this.obtenerListadoTipoCorrespondencia();
    this.statuses = [
      {label: 'Activo', value: true},
      {label: 'Inactivo', value: false}
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
    this.tipoCorrespondencia.createTipoCorrespondencia(tipoC).subscribe(data => {
      let contenido = data;
    });
    window.location.reload();
  }

  clear(table: Table) {
    table.clear();
    this.filter.nativeElement.value = '';
  }

  editTipoCorrespondencia(tipocorres: TipoCorrespondencia){
    this.tipoCorresDialog = true;
    this.eTipoCorrespondencia = {...tipocorres};
    this.eTipoCorrespondencia.estado = this.estadoSelected.code;
  }

  updateTipoCorrespondencia(){
    this.tipoCorrespondencia.updateTipoCorrespondencia(this.eTipoCorrespondencia).subscribe(data =>{});
  }

  eliminarTipoCorrespondencia(){}

}
