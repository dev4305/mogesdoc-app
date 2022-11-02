import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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

  tipoPrefDialog: boolean = false;
  tipoPrefijo: TipoPrefijo = new TipoPrefijo();
  eTipoPrefijo: TipoPrefijo = new TipoPrefijo();

  loading:boolean = true;

  tipoPrefijoDialog: boolean = false;

  tipos: any;
  tiposPrefijo: TipoPrefijo[]=[];

  dropdownItems = [
    {name: '-', code: false},
    {name: 'Activo', code: true},
    {name: 'Inactivo', code: false}
  ];

  statuses!: any[];
  estadoSelected: any;

  constructor(private tipoPrefijoService: TipoPrefijoService) { }

  ngOnInit(): void {
    this.obtenerListadoTipoPrefijo();
    this.statuses = [
      {label: 'Activo', value: true},
      {label: 'Inactivo', value: false}
    ];
  }

  obtenerListadoTipoPrefijo() {
    this.tipoPrefijoService.getAllTipoPrefijo().subscribe((data) => {
      this.loading = false;
      this.tipos = data;
      console.log('data:  ',data);
      for(let i=0; i<this.tipos.length; i++){
        this.tiposPrefijo.push(this.tipos[i]);
      }
    });
  }

  registrarTipoPrefijo() {
    let tipoP = new TipoPrefijo();
    tipoP.nombre = this.tipoPrefijo.nombre;
    tipoP.estado = this.estadoSelected.code;
    this.tipoPrefijoService.createTipoPrefijo(tipoP).subscribe(data => {
    });

  }

  editTipoPrefijo(tipoPref: TipoPrefijo){
    this.tipoPrefijoDialog = true;
    this.eTipoPrefijo = {...tipoPref};
    this.eTipoPrefijo.estado = this.estadoSelected.code;
  }

  updateTipoPrefijo(){
    this.tipoPrefijoService.updateTipoPrefijo(this.eTipoPrefijo).subscribe(data =>{});
  }

  clear(table: Table){
    table.clear();
    this.filter.nativeElement.value = '';
  }

}
