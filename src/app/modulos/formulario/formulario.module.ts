import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';


const formulario = [
  FormsModule,
]

@NgModule({
  imports: [
    formulario
  ],
  exports: [
    formulario
  ]
})
export class FormularioModule { }
