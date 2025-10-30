import { Component, inject } from '@angular/core';
import { Login } from '../../../models/login';
import { FormsModule } from '@angular/forms';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { LoginService } from '../../../auth/login.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, MdbFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  login: Login = new Login();

  showPassword = false; 

  router = inject(Router);
  
  loginService = inject(LoginService);

  constructor() {
    this.loginService.removerToken();
  }

  logar() {
    this.loginService.logar(this.login).subscribe({
      next: token => {
        if (token) {
          this.loginService.addToken(token);
          this.gerarToast().fire({ icon: "success", title: "Seja bem-vindo!" });
          this.router.navigate(['admin/dashboard']);
        } else {
          Swal.fire('Erro ao fazer login!', 'Token não recebido', 'error');
        }
      },
      error: erro => {
        console.error('Erro no login:', erro);
        const mensagem = erro.error?.message || 'Usuário ou senha incorretos!';
        Swal.fire('Erro ao fazer login!', mensagem, 'error');
      }
    });
  }
  
  gerarToast() {
    return Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      }
    });
  }
}