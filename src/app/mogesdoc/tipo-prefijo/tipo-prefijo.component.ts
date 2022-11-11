import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Message } from 'primeng/api';
import { Table } from 'primeng/table';
import { TipoPrefijo } from 'src/app/model/tipoPrefijo';
import { TipoPrefijoService } from 'src/app/service/tipo-prefijo.service';

@Component({
  selector: 'app-tipo-prefijo',
  templateUrl: './tipo-prefijo.component.html',
  styleUrls: ['./tipo-prefijo.component.scss']
})
export class TipoPrefijoComponent implements OnInit {

  @ViewChild('filter') filter!: ElementRef;

  msgs: Message[] = [];

  tipoPrefDialog: boolean = false;
  tipoPrefijo: TipoPrefijo = new TipoPrefijo();
  eTipoPrefijo: TipoPrefijo = new TipoPrefijo();

  loading:boolean = true;

  tipoPrefijoDialog: boolean = false;

  tipos: any;
  tiposPrefijo: TipoPrefijo[]=[];

  dropdownItems = [
    {name: '-', code: 'N'},
    {name: 'Activo', code: 'A'},
    {name: 'Inactivo', code: 'I'}
  ];

  statuses!: any[];
  estadoSelected: any;

  constructor(private tipoPrefijoService: TipoPrefijoService) { }

  ngOnInit(): void {
    this.obtenerListadoTipoPrefijo();
    this.statuses = [
      {label: 'Activo', value: 'A'},
      {label: 'Inactivo', value: 'I'}
    ];
  }

  obtenerListadoTipoPrefijo() {
    this.tipoPrefijoService.getAllTipoPrefijo().subscribe({
      next: data=>{
        this.loading = false;
        if(null!=data){
          this.tipos = data;
          for(let i=0; i<this.tipos.length; i++){
            this.tiposPrefijo.push(this.tipos[i]);
          } 
        }
      }
    });
  }

  registrarTipoPrefijo() {
    let tipoP = new TipoPrefijo();
    tipoP.nombre = this.tipoPrefijo.nombre;
    tipoP.estado = this.estadoSelected.code;
    this.tipoPrefijoService.createTipoPrefijo(tipoP).subscribe({
      complete: () => {
        this.msgs = [];
        this.msgs.push({ severity: 'success', summary: 'Creación de Registro', detail: 'Registro Creado Exitosamente en el Sistema.' });
        this.tiposPrefijo = [];
        this.obtenerListadoTipoPrefijo();
      },
      error: (e) => {
        this.msgs = [];
        this.msgs.push({ severity: 'error', summary: 'Error en Registro', detail: 'Validar el Contenido del Registro.' });
      }
    });

  }

  editTipoPrefijo(tipoPref: TipoPrefijo){
    this.tipoPrefijoDialog = true;
    this.eTipoPrefijo = {...tipoPref};
  }

  updateTipoPrefijo(){
    this.eTipoPrefijo.estado = this.estadoSelected.code;
    this.tipoPrefijoService.updateTipoPrefijo(this.eTipoPrefijo).subscribe({
      complete: () => {
        this.msgs = [];
        this.msgs.push({ severity: 'success', summary: 'Actualización de Registro', detail: 'Registro Actualizado Exitosamente en el Sistema.' });
        this.tiposPrefijo = [];
        this.tipoPrefijoDialog = false;
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
