import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginService } from '../../auth/login.service';
import { Usuario } from '../../auth/usuario';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  LoginService = inject(LoginService);
  usuario!: Usuario;

  constructor() {
    this.usuario = this.LoginService.getUserLogado();
  }
}
