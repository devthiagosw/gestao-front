import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { SwalService } from './swal.service';

@Injectable({ providedIn: 'root' })
export class GlobalHandlerService {
  constructor(private swal: SwalService) {}

  tratarErro(error: any) {
    let msg = 'Erro inesperado';

    if (error instanceof HttpErrorResponse) {
      const body = error.error;

      if (body) {
        // Se for string simples
        if (typeof body === 'string') {
          msg = body;
        }
        // Se for um objeto com campo "message"
        else if (body.message) {
          msg = body.message;
        }
        // Se for um objeto de validação: { campo: "erro", outro: "erro2" }
        else if (typeof body === 'object') {
          // junta todas as mensagens de cada campo
          const msgs = Object.values(body)
            .map(v => String(v))
            .filter(v => v);
          if (msgs.length) {
            msg = msgs.join('\n');
          }
        }
      }
    }

    // Mostra com Swal
    this.swal.erro(msg);

    console.error('Erro tratado:', error);
  }
}