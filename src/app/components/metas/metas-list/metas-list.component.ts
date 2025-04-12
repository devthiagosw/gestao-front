import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Meta } from '../../../models/metas';

import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MetasFormComponent } from '../metas-form/metas-form.component';
import { MetaService } from '../../../services/metas.service';
import { UsuarioService } from '../../../services/usuarios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-metas-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MetasFormComponent
  ],
  templateUrl: './metas-list.component.html',
  styleUrls: ['./metas-list.component.scss']
})
export class MetasListComponent implements OnInit {
  metas: Meta[] = [];
  metaForm: Meta = {
    usuario: { id: 0 },
    descricao: '',
    valorObjetivo: 0,
    valorAtual: 0,
    dataInicio: '',
    dataTermino: '',
    status: ''
  };
  showModal: boolean = false;
  displayedColumns: string[] = ['id', 'descricao', 'valorObjetivo', 'valorAtual', 'dataInicio', 'dataTermino', 'status', 'actions'];

  buscaId: number | null = null;
  usuarioId: number | null = null;
  metaEncontrada: Meta | null = null;
  metasEmAndamento: Meta[] = [];
  usuarios: any[] = [];

  constructor(private metaService: MetaService, private usuarioService: UsuarioService) {}

  ngOnInit(): void {
    this.listMetas();
    this.loadUsuarios();
  }

  getErrorMessage(err: any): string {
    if (err.status === 400 && err.error && typeof err.error === 'object') {
      const errors = Object.values(err.error);
      return errors.length > 0 ? errors.join('\n') : 'Erro de validação.';
    }
    return err.error?.message || err.message || 'Erro inesperado';
  }

  loadUsuarios(): void {
    this.usuarioService.findAll().subscribe({
      next: (data) => this.usuarios = data,
      error: (err) => {
        Swal.fire({
          title: 'Erro ao carregar usuários',
          text: this.getErrorMessage(err),
          icon: 'error'
        });
      }
    });
  }

  listMetas(): void {
    this.metaService.findAll().subscribe({
      next: (data) => this.metas = data,
      error: (err) => {
        Swal.fire({
          title: 'Erro ao listar metas',
          text: this.getErrorMessage(err),
          icon: 'error'
        });
      }
    });
  }

  getMetaById(): void {
    if (this.buscaId !== null) {
      this.metaService.findById(this.buscaId).subscribe({
        next: (data) => this.metaEncontrada = data,
        error: (err) => {
          Swal.fire({
            title: 'Erro ao buscar meta por ID',
            text: this.getErrorMessage(err),
            icon: 'error'
          });
        }
      });
    }
  }

  searchMetasEmAndamento(): void {
    if (this.usuarioId !== null) {
      this.metaService.buscarMetasEmAndamento(this.usuarioId).subscribe({
        next: (data) => this.metasEmAndamento = data,
        error: (err) => {
          Swal.fire({
            title: 'Erro ao buscar metas em andamento',
            text: this.getErrorMessage(err),
            icon: 'error'
          });
        }
      });
    }
  }

  openModal(meta?: Meta): void {
    this.metaForm = meta ? { ...meta } : {
      usuario: { id: 0 },
      descricao: '',
      valorObjetivo: 0,
      valorAtual: 0,
      dataInicio: '',
      dataTermino: '',
      status: ''
    };
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
  }

  handleFormSubmit(meta: Meta): void {
    if (meta.id) {
      this.updateMeta(meta.id, meta);
    } else {
      this.saveMeta(meta);
    }
    this.closeModal();
  }

  saveMeta(meta: Meta): void {
    this.metaService.save(meta).subscribe({
      next: () => {
        Swal.fire({
          title: 'Sucesso',
          text: 'Meta criada com sucesso!',
          icon: 'success'
        });
        this.listMetas();
      },
      error: (err) => {
        Swal.fire({
          title: 'Erro ao salvar',
          text: this.getErrorMessage(err),
          icon: 'error'
        });
      }
    });
  }

  updateMeta(id: number, meta: Meta): void {
    this.metaService.update(meta, id).subscribe({
      next: () => {
        Swal.fire({
          title: 'Atualizado',
          text: 'Meta atualizada com sucesso!',
          icon: 'success'
        });
        this.listMetas();
      },
      error: (err) => {
        Swal.fire({
          title: 'Erro ao atualizar',
          text: this.getErrorMessage(err),
          icon: 'error'
        });
      }
    });
  }

  deleteMeta(id: number): void {
    this.metaService.deleteById(id).subscribe({
      next: () => {
        Swal.fire({
          title: 'Meta excluída',
          text: 'A meta foi removida com sucesso.',
          icon: 'success'
        });
        this.listMetas();
      },
      error: (err) => {
        Swal.fire({
          title: 'Erro ao excluir',
          text: this.getErrorMessage(err),
          icon: 'error'
        });
      }
    });
  }
}
