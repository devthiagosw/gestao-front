import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Tag } from '../../../models/tag';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-tags-form',
  standalone: true,
  imports: [FormsModule, CommonModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIcon],
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
