import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Message } from 'primeng/api';
import { Table } from 'primeng/table';
import { Departamento } from 'src/app/model/departamento';
import { Municipio } from 'src/app/model/municipio';
import { Pais } from 'src/app/model/pais';
import { DepartamentoService } from 'src/app/service/departamento.service';
import { MunicipioService } from 'src/app/service/municipio.service';
import { PaisService } from 'src/app/service/pais.service';

@Component({
  selector: 'app-municipio',
  templateUrl: './municipio.component.html',
  styleUrls: ['./municipio.component.scss']
})
export class MunicipioComponent implements OnInit {

  @ViewChild('filter') filter!: ElementRef;

  loading:boolean = true;
  municipioDialog: boolean = false;

  municipio: Municipio = new Municipio();
  eMunicipio: Municipio = new Municipio();
  ePais: Pais = new Pais();
  eDepto: Departamento = new Departamento();

  dropdownItems = [
    {name: '-', code: 'N'},
    {name: 'Activo', code: 'A'},
    {name: 'Inactivo', code: 'I'}
  ];

  estadoSelected: any;
  registros: any;

  paisSelected!: Pais;
  deptoSelected!: Departamento;

  msgs: Message[] = [];
  paises: Pais[] = [];
  departamentos: Departamento[] = [];

  eDepartamentos: Departamento[] = [];

  municipios: Municipio[] = [];

  constructor(private paisService: PaisService, 
              private departamentoService: DepartamentoService,
              private municipioService: MunicipioService) { }

  ngOnInit(): void {
    this.obtenerPaises();
    this.obtenerMunicipios();
  }

  obtenerMunicipios(){
    let reg: any;
    this.municipioService.getAllMunicipios().subscribe({
      next: (data) => {
        this.loading = false;
        if(null!=data){
          reg = data;
          for(let i=0; i<reg.length; i++){
            this.municipios.push(reg[i]);
          }
        }
      }
    });
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

  obtenerDepartamentos(){
    
    let idPais = 0;
    if(undefined !=this.paisSelected ){
      idPais = this.paisSelected.id
    }else{
      idPais = this.ePais.id;
      this.eDepartamentos = [];
    }
    this.departamentos = [];
    let deptos: any;
    this.departamentoService.getMunicipiosByPais(idPais).subscribe({
      next: (data) => {
        if(null != data){
          deptos = data;
          for(let i=0; i<deptos.length; i++){
            this.departamentos.push(deptos[i]);
            this.eDepartamentos.push(deptos[i]);
          }
        }
      }
    });
  }

  registrarMuni(){
    let muniRegistro = new Municipio();
    muniRegistro.codigo = this.municipio.codigo;
    muniRegistro.nombre = this.municipio.nombre;
    muniRegistro.departamento = this.deptoSelected;
    muniRegistro.estado = this.estadoSelected.code;
    this.municipioService.crearMunicipio(muniRegistro).subscribe({
      complete: () => {
        this.municipios = [];
        window.location.reload();
      },
      error: (e) => {
        this.msgs = [];
        this.msgs.push({ severity: 'error', summary: 'Error en Registro', detail: 'Validar el Contenido del Registro.  '+JSON.stringify(e)});
      }
    });
  }

  editarMunicipio(municipioEditar: Municipio){
    this.eDepartamentos =[];
    this.municipioDialog = true;
    this.ePais = municipioEditar.departamento.pais;
    this.obtenerDepartamentos();
    this.eDepto = municipioEditar.departamento;
    this.eMunicipio = {...municipioEditar};
  }

  updateMunicipio(){
    this.eMunicipio.estado = this.estadoSelected.code;
    this.eMunicipio.departamento = this.eDepto;
    this.municipioService.updateMunicipio(this.eMunicipio).subscribe({
      complete: () =>{
        this.msgs = [];
        this.msgs.push({ severity: 'success', summary: 'Actualización de Registro', detail: 'Registro Actualizado Exitosamente en el Sistema.'});
        this.municipios = [];
        this.municipioDialog = false;
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
