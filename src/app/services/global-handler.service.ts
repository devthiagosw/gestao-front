import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { SwalService } from './swal.service';

@Injectable({ providedIn: 'root' })
export class GlobalHandlerService {

  constructor(private swal: SwalService) {}

  tratarErro(error: any) {
    let msg = 'Erro inesperado';

    // Se for erro do backend (HttpErrorResponse)
    if (error instanceof HttpErrorResponse) {
      msg = error.error?.message || error.error || error.message || 'Erro ao se comunicar com o servidor';
    }

    // Mostra com Swal
    this.swal.erro(msg);

    // (Opcional) Também joga no console para desenvolvedores
    console.error('Erro tratado:', error);
  }
}