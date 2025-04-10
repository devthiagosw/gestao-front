import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Usuario } from '../../../models/usuario';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card'; // <-- Nova importação
import { UsuariosFormComponent } from '../usuarios-form/usuarios-form.component';
import { UsuarioService } from '../../../services/usuarios.service';
import { StatusUsuario } from '../../../enums';

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
        MatCardModule, // <-- Adicionado
        UsuariosFormComponent,

    ],
    templateUrl: './usuarios-list.component.html',
    styleUrls: ['./usuarios-list.component.scss']
})
export class UsuariosListComponent implements OnInit {
    usuarios: Usuario[] = [];
    usuarioForm: Usuario = {
        nome: '', // Adicionado
        email: '', // Adicionado
        senha: '', // Adicionado
        status: StatusUsuario.ATIVO, // Adicionado
    };
    showModal: boolean = false;
    displayedColumns: string[] = ['id', 'nome', 'email', 'senha', 'status', 'actions']; // <-- Corrigido

    // NOVAS PROPRIEDADES DE BUSCA
    buscaId: number | null = null;
    usuarioId: number | null = null;
    categoriaId: number | null = null;
    usuarioEncontrado: Usuario | null = null;
    usuariosPorNome: Usuario[] = [];

    constructor(private usuarioService: UsuarioService) { }

    ngOnInit(): void {
        this.listUsuarios();
    }

    listUsuarios(): void {
        this.usuarioService.findAll().subscribe({
            next: (data) => this.usuarios = data,
            error: (err) => console.error('Erro:', err)
        });
    }

    // NOVOS MÉTODOS DE BUSCA
    getUsuarioById(): void {
        if (this.buscaId !== null) {
            this.usuarioService.findById(this.buscaId).subscribe({
                next: (data) => {
                    this.usuarioEncontrado = data;
                    console.log('Usuario encontrado:', data);
                },
                error: (err) => console.error('Erro ao buscar usuario por ID:', err)
            });
        }
    }

    searchUsuariosPorNome(): void {
        if (this.usuarioId !== null) {
            this.usuarioService.findByNome(this.usuarioForm.nome).subscribe({
                next: (data) => {
                    this.usuariosPorNome = data;
                    console.log('Usuarios encontrados por Nome:', data);
                },
                error: (err) => console.error('Erro ao buscar usuarios por nome:', err)
            });
        }
    }

    // searchUsuariosPorEmail(): void {
    //     if (this.usuarioId !== null) {
    //         this.usuarioService.findByEmail(this.usuarioForm.email).subscribe({
    //             next: (data) => {
    //                 this.usuariosPorNome = data;
    //                 console.log('Usuarios encontrados por Email:', data);
    //             },
    //             error: (err) => console.error('Erro ao buscar usuarios por email:', err)
    //         });
    //     }
    // }

    openModal(usuario?: Usuario): void {
        if (usuario) {
            this.usuarioForm = { ...usuario };
        } else {
            this.usuarioForm = {
                nome: '', // Adicionado
                email: '', // Adicionado
                senha: '', // Adicionado
                status: StatusUsuario.ATIVO, // Adicionado
            };
        }
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
            next: (res) => {
                console.log('Usuario salvo:', res);
                this.listUsuarios();
            },
            error: (err) => console.error('Erro ao salvar:', err)
        });
    }

    updateUsuario(id: number, usuario: Usuario): void {
        this.usuarioService.update(usuario, id).subscribe({
            next: (res) => {
                console.log('Usuario atualizado:', res);
                this.listUsuarios();
            },
            error: (err) => console.error('Erro ao atualizar:', err)
        });
    }

    deleteUsuario(id: number): void {
        this.usuarioService.deleteById(id).subscribe({
            next: (res) => {
                console.log('Usuario excluído:', res);
                this.listUsuarios();
            },
            error: (err) => console.error('Erro ao excluir:', err)
        });
    }
}
