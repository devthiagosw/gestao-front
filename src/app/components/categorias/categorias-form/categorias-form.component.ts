import { UsuarioService } from './../../../services/usuarios.service';
import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Categoria } from '../../../models/categoria';
import { CategoriaService } from '../../../services/categoria.service';
import { TipoCategoria } from '../../../enums/tipo-categoria';
import { Usuario } from '../../../models/usuario';



import { NgbModal, NgbModalRef, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { GlobalHandlerService } from '../../../services/global-handler.service';
import { SwalService } from '../../../services/swal.service';

@Component({
  selector: 'app-categoria-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, NgbModalModule],
  templateUrl: './categorias-form.component.html',
  styleUrls: ['./categorias-form.component.scss']
})
export class CategoriasFormComponent implements OnInit {
  @Input() categoria = new Categoria(); // Recebe a categoria para edição
  form: FormGroup;
  tipos = Object.values(TipoCategoria);
  usuarios: Usuario[] = [];
  modalRef?: NgbModalRef;

  constructor(
    private fb: FormBuilder,
    private service: CategoriaService,
    private UsuarioService: UsuarioService,
    private swal: SwalService,
    private handler: GlobalHandlerService,
    private modalService: NgbModal // ✅ injetado aqui!
  ) {
    this.form = this.fb.group({
      nomeCategoria: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      tipo: [null, Validators.required],
      icone: ['']
    });
  }

  ngOnInit(): void {
    this.carregarUsuarios();

    if (this.categoria?.id) {
      this.form.patchValue(this.categoria); // Preenche o form na edição
    }
  }

  carregarUsuarios(): void {
    this.UsuarioService.findAll().subscribe({
      next: (res) => this.usuarios = res,
      error: (err) => this.handler.tratarErro(err)
    });
  }
  

  abrirModalUsuario(template: any): void {
    this.modalRef = this.modalService.open(template, { size: 'md' });
  }

  selecionarUsuario(usuario: Usuario): void {
    this.categoria.usuario = usuario;
    this.modalRef?.close();
  }

  salvarOuAtualizar(): void {
    if (this.form.invalid || !this.categoria.usuario?.id) {
      this.swal.aviso('Preencha todos os campos corretamente.');
      return;
    }

    Object.assign(this.categoria, this.form.value);

    const request = this.categoria.id
      ? this.service.update(this.categoria)
      : this.service.save(this.categoria);

    request.subscribe({
      next: () => this.swal.sucesso('Categoria salva com sucesso!'),
      error: (err) => this.handler.tratarErro(err)
    });
  }
}
