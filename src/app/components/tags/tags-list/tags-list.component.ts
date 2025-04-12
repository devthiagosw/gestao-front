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
// Import do componente de formulário para tags (assuma que ele foi criado de forma similar a metas-form)
import { TagsFormComponent } from '../tags-form/tags-form.component';

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
  
  // NOVA PROPRIEDADE DE BUSCA
  buscaId: number | null = null;
  tagEncontrada: Tag | null = null;

  constructor(private tagService: TagService) {}

  ngOnInit(): void {
    this.listTags();
  }

  listTags(): void {
    this.tagService.findAll().subscribe({
      next: (data) => this.tags = data,
      error: (err) => console.error('Erro ao carregar tags:', err)
    });
  }

  // NOVO MÉTODO DE BUSCA: findById
  getTagById(): void {
    if (this.buscaId !== null) {
      this.tagService.findById(this.buscaId).subscribe({
        next: (data) => {
          this.tagEncontrada = data;
          console.log('Tag encontrada:', data);
        },
        error: (err) => console.error('Erro ao buscar tag por ID:', err)
      });
    }
  }

  openModal(tag?: Tag): void {
    if(tag) {
      this.tagForm = { ...tag };
    } else {
      this.tagForm = { nome: '' };
    }
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
  }

  handleFormSubmit(tag: Tag): void {
    if(tag.id) {
      this.tagService.update(tag.id, tag).subscribe({
        next: (res) => {
          console.log('Tag atualizada:', res);
          this.listTags();
        },
        error: (err) => console.error('Erro ao atualizar tag:', err)
      });
    } else {
      this.tagService.create(tag).subscribe({
        next: (res) => {
          console.log('Tag criada:', res);
          this.listTags();
        },
        error: (err) => console.error('Erro ao criar tag:', err)
      });
    }
    this.closeModal();
  }

  deleteTag(id: number): void {
    this.tagService.deleteById(id).subscribe({
      next: () => {
        console.log('Tag excluída');
        this.listTags();
      },
      error: (err) => {
        console.error('Erro ao excluir tag:', err);
        alert('Não é possível excluir a Tag, ela está em uso!');
      }
    });
  }
}
