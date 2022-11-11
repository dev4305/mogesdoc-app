import { Component, OnInit } from '@angular/core';
import { AppMainComponent } from './app.main.component';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model!: any[];

    constructor(public app: AppMainComponent) { }

    ngOnInit() {
        this.model = [
            {label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/']},
            {label: 'Editor', icon: 'pi pi-fw pi-id-card', routerLink: ['mogesdoc/editor']},
            {
              label: 'Catálogos', icon: 'pi pi-fw pi-list',
              items:[
                {label: 'Tipo Correspondencia', icon: 'pi pi-fw pi-inbox', routerLink: ['mogesdoc/tipoCorrespondencia']},
                {label: 'Tipo Prefijo', icon: 'pi pi-fw pi-bookmark', routerLink: ['mogesdoc/tipoPrefijo']},
                {
                    label: 'Region', icon:'pi pi-fw pi-map',
                    items:[
                        {label: 'Pais',  icon:'pi pi-fw pi-map', routerLink: ['mogesdoc/region/pais']},
                        {label: 'Departamento',  icon:'pi pi-fw pi-map', routerLink: ['/b']},
                        {label: 'Municipio',  icon:'pi pi-fw pi-map', routerLink: ['/c']}
                    ]
                }
              ]
            }
        ];
    }

    onMenuClick(event: any) {
        this.app.onMenuClick(event);
    }
}
