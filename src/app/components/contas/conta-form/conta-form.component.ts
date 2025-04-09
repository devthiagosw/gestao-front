import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Conta } from '../../../models/conta';
;

@Component({
  selector: 'app-conta-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './conta-form.component.html',
  styleUrls: ['./conta-form.component.scss'],
})
export class ContaFormComponent {
  @Input() conta!: Conta;
  @Output() submitConta = new EventEmitter<Conta>();
  @Output() close = new EventEmitter<void>();

  onSubmit(): void {
    this.submitConta.emit(this.conta);
  }

  onClose(): void {
    this.close.emit();
  }
}

