import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Message } from 'primeng/api';
import { Area } from 'src/app/model/area';
import { Organizacion } from 'src/app/model/organizacion';
import { Unidad } from 'src/app/model/unidad';
import { AreaService } from 'src/app/service/area.service';
import { OrganizacionService } from 'src/app/service/organizacion.service';
import { UnidadService } from 'src/app/service/unidad.service';

@Component({
  selector: 'app-unidad',
  templateUrl: './unidad.component.html',
  styleUrls: ['./unidad.component.scss']
})
export class UnidadComponent implements OnInit {

  @ViewChild('filter') filter!: ElementRef;
  
  loading:boolean = true;
  unidadDialog: boolean = false;

  unidad: Unidad = new Unidad();
  eUnidad: Unidad = new Unidad();
  eOrganizacion: Organizacion = new Organizacion();
  eArea: Area = new Area();

  dropdownItems = [
    {name: '-', code: 'N'},
    {name: 'Activo', code: 'A'},
    {name: 'Inactivo', code: 'I'}
  ];

  estadoSelected: any;
  registros: any;

  organizacionSelected!: Organizacion;
  areaSelected!: Area;

  msgs: Message[] = [];
  organizaciones: Organizacion[] = [];
  areas: Area[]=[];

  eAreas: Area[] = [];

  unidades: Unidad[] = [];

  

  constructor(private organizacionService: OrganizacionService,
              private areaService: AreaService,
              private unidadService: UnidadService) { }

  ngOnInit(): void {
    this.obtenerOrganizaciones();
    this.obtenerUnidades();
  }

  obtenerUnidades(){
    let reg: any;
    this.unidadService.getAllUnidades().subscribe({
      next: (data) => {
        this.loading = false;
        if(null!=data){
          reg = data;
          for(let i=0; i<reg.length; i++){
            this.unidades.push(reg[i]);
          }
        }
      }
    });
  }

  obtenerOrganizaciones(){
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

  obtenerAreas(){
    let idOrganizacion = 0;
    if(undefined != this.organizacionSelected){
      idOrganizacion = this.organizacionSelected.id;
    }else{
      idOrganizacion = this.eOrganizacion.id;
      this.eAreas = [];
    }
    this.areas = [];
    let areasData: any;
    this.areaService.getAreasByOrganizacion(idOrganizacion).subscribe({
      next: (data) => {
        if(null != data){
          areasData = data;
          for(let i=0; i<areasData.length; i++){
            this.areas.push(areasData[i]);
            this.eAreas.push(areasData[i]);
          }
        }
      }
    });
  }

  registrarUnidad(){
    let unidadRegistro = new Unidad();
    unidadRegistro.codigo = this.unidad.codigo;
    unidadRegistro.nombre = this.unidad.nombre;
    unidadRegistro.descripcion = this.unidad.descripcion;
    unidadRegistro.area = this.areaSelected;
    unidadRegistro.estado = this.estadoSelected.code;
    this.unidadService.crearUnidad(unidadRegistro).subscribe({
      complete: () => {
        this.areas = [];
        window.location.reload();
      },
      error: (e) => {
        this.msgs = [];
        this.msgs.push({ severity: 'error', summary: 'Error en Registro', detail: 'Validar el Contenido del Registro.  '+JSON.stringify(e)});
      }
    });
  }

  editarUnidad(unidadEditar: Unidad){
    this.eAreas = [];
    this.unidadDialog = true;
    this.eOrganizacion = unidadEditar.area.organizacion;
    this.obtenerAreas();
    this.eArea = unidadEditar.area;
    this.eUnidad = {...unidadEditar};
  }

  updateUnidad(){
    this.eUnidad.estado = this.estadoSelected.code;
    this.eUnidad.area = this.eArea;
    this.unidadService.updateUnidad(this.eUnidad).subscribe({
      complete: () => {
        this.msgs = [];
        this.msgs.push({ severity: 'success', summary: 'Actualización de Registro', detail: 'Registro Actualizado Exitosamente en el Sistema.'});
        this.unidades = [];
        this.unidadDialog = false;
        window.location.reload();
      },
      error: (e) => {
        this.msgs = [];
        this.msgs.push({ severity: 'error', summary: 'Error en Registro', detail: 'Validar el Contenido del Registro. '+e.message+'\n'+e.error.error});
      }
    });
  }

}
