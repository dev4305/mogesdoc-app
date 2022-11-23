import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Message } from 'primeng/api/message';
import { Table } from 'primeng/table';
import { Area } from 'src/app/model/area';
import { Organizacion } from 'src/app/model/organizacion';
import { AreaService } from 'src/app/service/area.service';
import { OrganizacionService } from 'src/app/service/organizacion.service';

@Component({
  selector: 'app-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.scss']
})
export class AreaComponent implements OnInit {

  @ViewChild('filter') filter!: ElementRef;

  loading:boolean = true;
  areaDialog: boolean = false;

  area: Area = new Area();
  eArea: Area = new Area();

  dropdownItems = [
    {name: '-', code: 'N'},
    {name: 'Activo', code: 'A'},
    {name: 'Inactivo', code: 'I'}
  ];

  estadoSelected: any;
  registros: any;

  organizacionSelected!: Organizacion;

  msgs: Message[] = [];
  organizaciones: Organizacion[]=[];
  areas: Area[] = [];

  constructor(private organizacionService: OrganizacionService,
              private areaService: AreaService) { }

  ngOnInit(): void {
    this.obtenerOrganizaciones();
    this.obtenerAreas();
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
    let reg: any;
    this.areaService.getAllAreas().subscribe({
      next: (data) => {
        this.loading = false;
        if(null != data){
          reg = data;
          for(let i=0; i<reg.length; i++){
            this.areas.push(reg[i]);
          }
        }
      }
    });
  }

  registrarArea(){
    let areaRegistro = new Area();
    areaRegistro.codigo = this.area.codigo;
    areaRegistro.nombre = this.area.nombre;
    areaRegistro.organizacion = this.organizacionSelected;
    this.areaService.crearArea(areaRegistro).subscribe({
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

  editarArea(areaEditar: Area){
    this.areaDialog = true;
    this.eArea = {...areaEditar};
  }

  updateArea(){
    this.areaService.updateArea(this.eArea).subscribe({
      complete: () => {
        this.msgs = [];
        this.msgs.push({ severity: 'success', summary: 'Actualización de Registro', detail: 'Registro Actualizado Exitosamente en el Sistema.'});
        this.areas = [];
        this.areaDialog = false;
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
