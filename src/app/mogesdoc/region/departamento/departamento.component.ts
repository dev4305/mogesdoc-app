import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Message } from 'primeng/api';
import { Table } from 'primeng/table';
import { Departamento } from 'src/app/model/departamento';
import { Pais } from 'src/app/model/pais';
import { DepartamentoService } from 'src/app/service/departamento.service';
import { PaisService } from 'src/app/service/pais.service';

@Component({
  selector: 'app-departamento',
  templateUrl: './departamento.component.html',
  styleUrls: ['./departamento.component.scss']
})
export class DepartamentoComponent implements OnInit {

  @ViewChild('filter') filter!: ElementRef;

  loading:boolean = true;
  departamentoDialog: boolean = false;

  departamento: Departamento = new Departamento();
  eDepartamento: Departamento = new Departamento();

  dropdownItems = [
    {name: '-', code: 'N'},
    {name: 'Activo', code: 'A'},
    {name: 'Inactivo', code: 'I'}
  ];

  estadoSelected: any;
  registros: any;

  paisSelected!: Pais;

  msgs: Message[] = [];
  paises: Pais[] = [];
  departamentos: Departamento[] = [];

  constructor(private paisService: PaisService, 
              private departamentoService: DepartamentoService) { }

  ngOnInit(): void {
    this.obtenerPaises();
    this.obtenerDeptos();
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

  obtenerDeptos(){
    let reg: any;
    this.departamentoService.getAllDepartamentos().subscribe({
      next: (data) => {
        this.loading = false;
        if(null != data){
          reg = data;
          for(let i=0; i<reg.length; i++){
            this.departamentos.push(reg[i]);
          }
        }
      }
    });
  }

  registrarDepto(){
    let deptoRegistro = new Departamento();
    deptoRegistro.codigo = this.departamento.codigo;
    deptoRegistro.nombre = this.departamento.nombre;
    deptoRegistro.estado = this.estadoSelected.code;
    deptoRegistro.pais = this.paisSelected;
    this.departamentoService.crearDepartamento(deptoRegistro).subscribe(
      {
        complete: () => {
          this.departamentos = [];
          //this.obtenerDeptos();
          window.location.reload();
        },
        error: (e) => {
          this.msgs = [];
          this.msgs.push({ severity: 'error', summary: 'Error en Registro', detail: 'Validar el Contenido del Registro.  '+JSON.stringify(e)});
        }
      }
    );
  }

  editarDepartamento(deptoEditar: Departamento){
    this.departamentoDialog = true;
    this.eDepartamento = {...deptoEditar};
  }

  updateDepartamento(){
    this.eDepartamento.estado = this.estadoSelected.code;
    this.departamentoService.updatePais(this.eDepartamento).subscribe(
      {
        complete: () => {
          this.msgs = [];
          this.msgs.push({ severity: 'success', summary: 'Actualización de Registro', detail: 'Registro Actualizado Exitosamente en el Sistema.'});
          this.departamentos = [];
          this.departamentoDialog = false;
          window.location.reload();
        },
        error: (e) => {
          this.msgs = [];
          this.msgs.push({ severity: 'error', summary: 'Error en Registro', detail: 'Validar el Contenido del Registro. '+e.message+'\n'+e.error.error});
        }
      }
    );
  }

  clear(table: Table){
    table.clear();
    this.filter.nativeElement.value = '';
  }

}
