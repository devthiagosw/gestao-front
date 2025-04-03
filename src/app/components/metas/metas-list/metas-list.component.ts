import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Meta } from '../../../models/metas';


@Component({
  selector: 'app-metas-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './metas-list.component.html',
  styleUrls: ['./metas-list.component.scss']
})
export class MetasListComponent {
  @Input() metas: Meta[] = [];
  @Output() edit = new EventEmitter<Meta>();
  @Output() delete = new EventEmitter<number>();
}
