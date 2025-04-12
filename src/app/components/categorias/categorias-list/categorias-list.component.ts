import { Component, OnInit } from '@angular/core';
import { Categoria } from '../../../models/categoria';
import { CategoriaService } from '../../../services/categoria.service';
import { NgbModal, NgbModalModule, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { CategoriasFormComponent } from '../categorias-form/categorias-form.component';
import { CommonModule } from '@angular/common';
import { SwalService } from '../../../services/swal.service';
import { GlobalHandlerService } from '../../../services/global-handler.service';

@Component({
  selector: 'app-categorias-list',
  standalone: true,
  imports: [CommonModule, NgbModalModule],
  templateUrl: './categorias-list.component.html',
  styleUrls: ['./categorias-list.component.scss']
})
export class CategoriasListComponent implements OnInit {
  categorias: Categoria[] = [];

  constructor(
    private service: CategoriaService,
    private swal: SwalService,
    private handler: GlobalHandlerService,
    private modal: NgbModal
  ) {}

  ngOnInit(): void {
    this.listar();
  }

  listar(): void {
    this.service.findAll().subscribe({
      next: (res) => this.categorias = res,
      error: (err) => this.handler.tratarErro(err)
    });
  }

  abrirModalFormulario(categoria?: Categoria): void {
    const modalRef: NgbModalRef = this.modal.open(CategoriasFormComponent, { size: 'lg' });

    if (categoria) {
      modalRef.componentInstance.categoria = { ...categoria };
    }

    modalRef.closed.subscribe(() => this.listar());
  }

  editar(id: number): void {
    const categoria = this.categorias.find(c => c.id === id);
    if (categoria) {
      this.abrirModalFormulario(categoria);
    }
  }

  deletar(id: number): void {
    this.swal.confirmar('Tem certeza que deseja excluir?').then((res) => {
      if (res.isConfirmed) {
        this.service.deleteById(id).subscribe({
          next: () => {
            this.swal.sucesso('Categoria excluída com sucesso!');
            this.listar();
          },
          error: (err) => this.handler.tratarErro(err)
        });
      }
    });
  }
}
