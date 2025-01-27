import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgModel } from '@angular/forms';


const formulario = [
  FormsModule,
  NgModule,
  NgModel
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
