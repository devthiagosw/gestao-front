import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Meta } from '../../../models/metas';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-metas-form',
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
