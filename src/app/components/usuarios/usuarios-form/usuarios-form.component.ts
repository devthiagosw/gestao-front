import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Usuario } from '../../../models/usuario';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';

@Component({
    selector: 'app-usuarios-form',
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
    templateUrl: './usuarios-form.component.html',
    styleUrls: ['./usuarios-form.component.scss']
})
export class UsuariosFormComponent {
    @Input() usuario!: Usuario;
    @Output() submitUsuario = new EventEmitter<Usuario>();
    @Output() close = new EventEmitter<void>();

    onSubmit(): void {
        this.submitUsuario.emit(this.usuario);
    }

    onClose(): void {
        this.close.emit();
    }


}
