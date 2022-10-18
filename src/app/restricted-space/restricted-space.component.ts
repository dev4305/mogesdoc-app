import { Component, OnInit } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-restricted-space',
  templateUrl: './restricted-space.component.html',
  styleUrls: ['./restricted-space.component.scss']
})
export class RestrictedSpaceComponent implements OnInit {

  constructor(private keycloakService: KeycloakService) { }

  ngOnInit(): void {
  }

  public username(): string{
    return this.keycloakService.getUsername();
  }

  public logOut() {
    this.keycloakService.logout('http://172.21.38.38:9600');
  }

}
