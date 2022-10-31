import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-common-editor',
  templateUrl: './common-editor.component.html',
  styleUrls: ['./common-editor.component.scss']
})
export class CommonEditorComponent implements OnInit {

  html: string = '';
  
  constructor() { }

  ngOnInit(): void {
  }

  guardarContenido(){
    console.log(this.html);
  }

}
