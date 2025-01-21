import { Component} from '@angular/core';
import { MaterialModule } from '../../modulos/material-angular/material.module';
import { FormularioModule } from '../../modulos/formulario/formulario.module';

@Component({
  selector: 'app-iniciar-sesion',
  standalone: true,
  imports: [MaterialModule, FormularioModule ],
  templateUrl: './iniciar-sesion.component.html',
  styleUrl: './iniciar-sesion.component.css'
})
export class IniciarSesionComponent {
  
  contrasenia: string = '';
  correo: string = '';
  enviar() {
    throw new Error('Method not implemented.');
  }

}
