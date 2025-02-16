import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CultivoService } from '../services/cultivo.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-cultivo-editar',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './cultivo-editar.component.html',
  styleUrl: './cultivo-editar.component.css'
})
export class CultivoEditarComponent {
  form: FormGroup;
  parcelas: string[] = [];
  cultivoId!: number;
  mensaje: string = '';
  tipoAlerta: string = '';

  constructor(
    private fb: FormBuilder,
    private cultivoService: CultivoService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.form = this.fb.group({
      cultivoId: [{ value: '', disabled: true }, Validators.required],
      nombre: ['', Validators.required],
      cantidad: [0, [Validators.required, Validators.min(1)]],
      descripcion: [''],
      fechaSiembra: ['', Validators.required],
      parcelaExistente: ['']
    });
  }

  ngOnInit(): void {
    this.cultivoId = Number(this.route.snapshot.paramMap.get('id'));
    this.cargarCultivo();
  }

  cargarCultivo() {
    this.cultivoService.obtenerCultivos().subscribe(response => {
      const cultivo = response.cultivos.find((c: any) => c.cultivoId === this.cultivoId);
      if (cultivo) {
        this.form.patchValue({
          cultivoId: cultivo.cultivoId,
          nombre: cultivo.nombreCultivo,
          cantidad: cultivo.cantidad,
          descripcion: cultivo.descripcion,
          fechaSiembra: cultivo.fechaSiembra,
          parcelaExistente: cultivo.nombreParcela
        });
      }
    });
  }

  modificarCultivo() {
    if (this.form.invalid) {
      this.mostrarAlerta('Por favor, rellene todos los campos obligatorios.', 'danger');
      return;
    }
  
    const cultivoEditado = {
      cultivoId: this.cultivoId,
      nombre: this.form.value.nombre,
      cantidad: Number(this.form.value.cantidad),
      descripcion: this.form.value.descripcion,
      fechaSiembra: this.form.value.fechaSiembra,
      parcelaId: { nombre: this.form.value.parcelaExistente }
    };
    
    this.cultivoService.modificarCultivo(cultivoEditado).subscribe({
      next: () => {
        this.mostrarAlerta('Cultivo modificado correctamente.', 'success');
        setTimeout(() => {
          this.router.navigate(['/inicio/usuario']);
        }, 2000);
      },
      error: (error) => {
        this.mostrarAlerta('Error al modificar el cultivo.', 'danger');
      }
    });
  }

  mostrarAlerta(mensaje: string, tipo: string) {
    this.mensaje = mensaje;
    this.tipoAlerta = tipo;
    setTimeout(() => {
      this.mensaje = '';
    }, 3000);
  }

  cancelarEdicion() {
    this.router.navigate(['/inicio/usuario']);
  }
  
  
}
