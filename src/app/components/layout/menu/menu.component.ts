import { LoginService } from './../../../auth/login.service';
import { Component, inject } from '@angular/core';
import { MdbCollapseModule } from 'mdb-angular-ui-kit/collapse';
import { Usuario } from '../../../auth/usuario';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [MdbCollapseModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {

  LoginService = inject(LoginService);
  usuario!: Usuario;

  constructor() {
    this.usuario = this.LoginService.getUserLogado();
  }

}