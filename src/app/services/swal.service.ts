import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class SwalService {
  sucesso(mensagem: string): void {
    Swal.fire('Sucesso', mensagem, 'success');
  }

  erro(mensagem: string): void {
    Swal.fire('Erro', mensagem, 'error');
  }

  aviso(mensagem: string): void {
    Swal.fire('Aviso', mensagem, 'warning');
  }

  confirmar(mensagem: string = 'Tem certeza?') {
    return Swal.fire({
      title: mensagem,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Cancelar'
    });
  }
}