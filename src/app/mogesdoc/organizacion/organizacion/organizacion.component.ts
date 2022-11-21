import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Message } from 'primeng/api';
import { Table } from 'primeng/table';
import { Organizacion } from 'src/app/model/organizacion';
import { OrganizacionService } from 'src/app/service/organizacion.service';

@Component({
  selector: 'app-organizacion',
  templateUrl: './organizacion.component.html',
  styleUrls: ['./organizacion.component.scss']
})
export class OrganizacionComponent implements OnInit {

  @ViewChild('filter') filter!: ElementRef;
  
  loading:boolean = true;
  organizacionDialog: boolean = false;

  organizacion: Organizacion = new Organizacion();
  eOrganizacion: Organizacion = new Organizacion();

  dropdownItems = [
    {name: '-', code: 'N'},
    {name: 'Activo', code: 'A'},
    {name: 'Inactivo', code: 'I'}
  ];

  estadoSelected: any;
  registros: any;

  msgs: Message[] = [];
  organizaciones: Organizacion[]=[];

  constructor(private organizacionService: OrganizacionService) { }

  ngOnInit(): void {
    this.obtenerOrganiaciones();
  }

  obtenerOrganiaciones(){
    this.organizacionService.getAllOrganizaciones().subscribe({
      next: (data) => {
        this.loading = false;
        if(null != data){
          this.registros = data;
          for(let i=0; i<this.registros.length; i++){
            this.organizaciones.push(this.registros[i]);
          }
        }
      }
    });
  }

  registrarOrganizacion(){
    let organizacionRegistro = new Organizacion();
    organizacionRegistro.codigo = this.organizacion.codigo;
    organizacionRegistro.nombre = this.organizacion.nombre;
    organizacionRegistro.url = this.organizacion.url;
    organizacionRegistro.prefijoTelefono = this.organizacion.prefijoTelefono;
    organizacionRegistro.telefono = this.organizacion.telefono;
    organizacionRegistro.estado = this.estadoSelected.code;
    this.organizacionService.createOrganizacion(organizacionRegistro).subscribe({
      complete: () => {
        this.organizaciones = [];
        this.obtenerOrganiaciones();
        window.location.reload();
      },
      error: (e)=>{
        this.msgs = [];
        this.msgs.push({ severity: 'error', summary: 'Error en Registro', detail: 'Validar el Contenido del Registro.' });
      }
    });
  }

  editarOrganizacion(organizacionEditar: Organizacion){
    this.organizacionDialog = true;
    this.eOrganizacion =  {...organizacionEditar};
  }

  updateOrganizacion(){
    this.eOrganizacion.estado = this.estadoSelected.code;
    this.organizacionService.updateOrganizacion(this.eOrganizacion).subscribe({
      complete: () => {
        this.msgs = [];
        this.msgs.push({ severity: 'success', summary: 'Actualización de Registro', detail: 'Registro Actualizado Exitosamente en el Sistema.'});
        this.organizaciones = [];
        this.organizacionDialog = false;
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
