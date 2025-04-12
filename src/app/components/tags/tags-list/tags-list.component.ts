import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tag } from '../../../models/tag';

import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { TagService } from '../../../services/tag.service';
import { TagsFormComponent } from '../tags-form/tags-form.component';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-tags-list',
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
    TagsFormComponent
  ],
  templateUrl: './tags-list.component.html',
  styleUrls: ['./tags-list.component.scss']
})
export class TagsListComponent implements OnInit {
  tags: Tag[] = [];
  displayedColumns: string[] = ['id', 'nome', 'actions'];
  
  tagForm: Tag = { nome: '' };
  showModal: boolean = false;

  buscaId: number | null = null;
  tagEncontrada: Tag | null = null;

  constructor(private tagService: TagService) {}

  ngOnInit(): void {
    this.listTags();
  }

  getErrorMessage(err: any): string {
    if (err.status === 0) {
      return 'Erro de conexão com o servidor.';
    }
  
    // Trata retorno com JSON
    if (err.status === 400 && err.error && typeof err.error === 'object') {
      const errors = Object.values(err.error);
      return errors.length > 0 ? errors.join('\n') : 'Erro de validação.';
    }
  
    // Trata retorno com texto simples
    if (typeof err.error === 'string') {
      return err.error;
    }
  
    return err.message || 'Erro inesperado.';
  }
  

  listTags(): void {
    this.tagService.findAll().subscribe({
      next: (data) => this.tags = data,
      error: (err) => {
        Swal.fire({
          title: 'Erro ao listar tags',
          text: this.getErrorMessage(err),
          icon: 'error'
        });
      }
    });
  }

  getTagById(): void {
    if (this.buscaId !== null) {
      this.tagService.findById(this.buscaId).subscribe({
        next: (data) => {
          this.tagEncontrada = data;
        },
        error: (err) => {
          Swal.fire({
            title: 'Erro ao buscar tag',
            text: this.getErrorMessage(err),
            icon: 'error'
          });
        }
      });
    }
  }

  openModal(tag?: Tag): void {
    this.tagForm = tag ? { ...tag } : { nome: '' };
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
  }

  handleFormSubmit(tag: Tag): void {
    if(tag.id) {
      this.tagService.update(tag.id, tag).subscribe({
        next: () => {
          Swal.fire({
            title: 'Atualizado!',
            text: 'Tag atualizada com sucesso!',
            icon: 'success'
          });
          this.listTags();
        },
        error: (err) => {
          Swal.fire({
            title: 'Erro ao atualizar tag',
            text: this.getErrorMessage(err),
            icon: 'error'
          });
        }
      });
    } else {
      this.tagService.create(tag).subscribe({
        next: () => {
          Swal.fire({
            title: 'Criada!',
            text: 'Tag criada com sucesso!',
            icon: 'success'
          });
          this.listTags();
        },
        error: (err) => {
          Swal.fire({
            title: 'Erro ao criar tag',
            text: this.getErrorMessage(err),
            icon: 'error'
          });
        }
      });
    }

    this.closeModal();
  }

  deleteTag(id: number): void {
    this.tagService.deleteById(id).subscribe({
      next: () => {
        Swal.fire({
          title: 'Tag excluída!',
          text: 'A tag foi removida com sucesso.',
          icon: 'success'
        });
        this.listTags();
      },
      error: (err) => {
        Swal.fire({
          title: 'Erro ao excluir tag',
          text: this.getErrorMessage(err),
          icon: 'error'
        });
      }
    });
  }
}
