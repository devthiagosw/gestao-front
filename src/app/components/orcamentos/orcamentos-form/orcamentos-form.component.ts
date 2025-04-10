import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Orcamento } from '../../../models/orcamentos';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-orcamentos-form',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule
  ],
  templateUrl: './orcamentos-form.component.html',
  styleUrls: ['./orcamentos-form.component.scss']
})
export class OrcamentosFormComponent {
  @Input() orcamento!: Orcamento;
  @Output() submitOrcamento = new EventEmitter<Orcamento>();
  @Output() close = new EventEmitter<void>();

  onSubmit(): void {
    this.submitOrcamento.emit(this.orcamento);
  }

  onClose(): void {
    this.close.emit();
  }
}
