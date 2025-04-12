import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { Tag } from '../../../models/tag';

@Component({
  selector: 'app-tags-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NgbModalModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './tags-form.component.html',
  styleUrls: ['./tags-form.component.scss']
})
export class TagsFormComponent {
  @Input() tag!: Tag;
  @Output() submitTag = new EventEmitter<Tag>();
  @Output() close = new EventEmitter<void>();

  onSubmit(): void {
    this.submitTag.emit(this.tag);
  }

  onClose(): void {
    this.close.emit();
  }
}
