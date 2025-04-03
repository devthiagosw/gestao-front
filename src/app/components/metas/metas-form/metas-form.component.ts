import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Meta } from '../../../models/metas';
;

@Component({
  selector: 'app-metas-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './metas-form.component.html',
  styleUrls: ['./metas-form.component.scss']
})
export class MetasFormComponent {
  @Input() meta!: Meta;
  @Output() submitMeta = new EventEmitter<Meta>();
  @Output() close = new EventEmitter<void>();

  onSubmit(): void {
    this.submitMeta.emit(this.meta);
  }

  onClose(): void {
    this.close.emit();
  }
}
