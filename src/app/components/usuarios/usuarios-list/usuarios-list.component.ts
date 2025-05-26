import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Usuario } from '../../../models/usuario';

import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';

import { UsuariosFormComponent } from '../usuarios-form/usuarios-form.component';
import { UsuarioService } from '../../../services/usuarios.service';
import { StatusUsuario } from '../../../enums';
import { GlobalHandlerService } from '../../../services/global-handler.service';
import { SwalService } from '../../../services/swal.service';

@Component({
  selector: 'app-usuarios-list',
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
    UsuariosFormComponent
  ],
  templateUrl: './usuarios-list.component.html',
  styleUrls: ['./usuarios-list.component.scss']
})
export class UsuariosListComponent implements OnInit {
  usuarios: Usuario[] = [];
  usuarioForm: Usuario = this.novoUsuario();
  showModal: boolean = false;
  displayedColumns: string[] = ['id', 'nome', 'email', 'senha', 'status', 'role', 'actions'];

  buscaId: number | null = null;
  usuarioId: number | null = null;
  categoriaId: number | null = null;
  usuarioEncontrado: Usuario | null = null;
  usuariosPorNome: Usuario[] = [];

  constructor(
    private usuarioService: UsuarioService,
    private handler: GlobalHandlerService,
    private swal: SwalService
  ) {}

  ngOnInit(): void {
    this.listUsuarios();
  }

  private novoUsuario(): Usuario {
    return {
      nome: '',
      email: '',
      senha: '',
      status: StatusUsuario.ATIVO
    };
  }

  listUsuarios(): void {
    this.usuarioService.findAll().subscribe({
      next: (data) => this.usuarios = data,
      error: (err) => this.handler.tratarErro(err)
    });
  }

  getUsuarioById(): void {
    if (this.buscaId !== null) {
      this.usuarioService.findById(this.buscaId).subscribe({
        next: (data) => this.usuarioEncontrado = data,
        error: (err) => this.handler.tratarErro(err)
      });
    }
  }

  searchUsuariosPorNome(): void {
    if (this.usuarioId !== null) {
      this.usuarioService.findByNome(this.usuarioForm.nome).subscribe({
        next: (data) => this.usuariosPorNome = data,
        error: (err) => this.handler.tratarErro(err)
      });
    }
  }

  openModal(usuario?: Usuario): void {
    this.usuarioForm = usuario ? { ...usuario } : this.novoUsuario();
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
  }

  handleFormSubmit(usuario: Usuario): void {
    if (usuario.id) {
      this.updateUsuario(usuario.id, usuario);
    } else {
      this.saveUsuario(usuario);
    }
    this.closeModal();
  }

  saveUsuario(usuario: Usuario): void {
    this.usuarioService.save(usuario).subscribe({
      next: () => {
        this.swal.sucesso('Usuário cadastrado com sucesso!');
        this.listUsuarios();
      },
      error: (err) => this.handler.tratarErro(err)
    });
  }

  updateUsuario(id: number, usuario: Usuario): void {
    this.usuarioService.update(usuario, id).subscribe({
      next: () => {
        this.swal.sucesso('Usuário atualizado com sucesso!');
        this.listUsuarios();
      },
      error: (err) => this.handler.tratarErro(err)
    });
  }

  deleteUsuario(id: number): void {
    this.swal.confirmar('Tem certeza que deseja excluir este usuário?').then((res) => {
      if (res.isConfirmed) {
        this.usuarioService.deleteById(id).subscribe({
          next: () => {
            this.swal.sucesso('Usuário excluído com sucesso!');
            this.listUsuarios();
          },
          error: (err) => this.handler.tratarErro(err)
        });
      }
    });
  }
}
