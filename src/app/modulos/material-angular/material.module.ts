import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input'; 
import { MatIconModule } from '@angular/material/icon'; 
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule} from '@angular/material/progress-bar';
import { materialize } from 'rxjs';

const material = [
  MatFormFieldModule,
  MatButtonModule,
  MatIconModule,
  MatInputModule,  
  CommonModule,
  MatCardModule,
  MatProgressBarModule
];

@NgModule({
  imports: [
    material
  ],
  exports: [
    material
  ]
})
export class MaterialModule { }
