import { ChangeDetectorRef, Component } from '@angular/core';
import { Form, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CultivoService } from '../services/cultivo.service';
import { Router } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-cultivo-form',
  standalone: true,
  imports: [ReactiveFormsModule, NgFor, NgIf],
  templateUrl: './cultivo-form.component.html',
  styleUrl: './cultivo-form.component.css'
})
export class CultivoFormComponent {

  form: FormGroup;
  parcelas: string[] = [];
  mensaje: string = '';
  tipoAlerta: string = '';

  constructor(
    private fb: FormBuilder,
    private cultivoService: CultivoService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      cantidad: [0, [Validators.required, Validators.min(1)]],
      descripcion: [''],
      fechaSiembra: ['', Validators.required],
      parcelaExistente: [''],
      parcelaNueva: ['']
    });
  }

  ngOnInit(): void {
    this.cargarParcelas();
  }

  cargarParcelas() {
    this.cultivoService.obtenerCultivos().subscribe(response => {
      console.log('[INFO] Datos obtenidos de cultivos-ver:', response);
      if (response.cultivos && Array.isArray(response.cultivos)) {
        const parcelasUnicas = new Set<string>();
        response.cultivos.forEach((cultivo: any) => {
          if (cultivo.nombreParcela && typeof cultivo.nombreParcela === 'string') {
            parcelasUnicas.add(cultivo.nombreParcela);
          }
        });
        this.parcelas = Array.from(parcelasUnicas);
        this.cdr.detectChanges();
      } else {
        console.error('[ERROR] Formato incorrecto en la respuesta de cultivos-ver');
      }
    }, error => {
      console.error('[ERROR] No se pudieron obtener los cultivos:', error);
    });
  }

  bloquearCampoSeleccion() {
    if (this.form.value.parcelaNueva.trim()) {
      this.form.get('parcelaExistente')?.disable();
    } else {
      this.form.get('parcelaExistente')?.enable();
    }
  }

  bloquearCampoEscribir() {
    if (this.form.value.parcelaExistente) {
      this.form.get('parcelaNueva')?.disable();
    } else {
      this.form.get('parcelaNueva')?.enable();
    }
  }

  mostrarAlerta(mensaje: string, tipo: string) {
    this.mensaje = mensaje;
    this.tipoAlerta = tipo;
    setTimeout(() => {
      this.mensaje = '';
    }, 3000);
  }

  registrarCultivo() {
    if (this.form.invalid) {
      this.mostrarAlerta('Por favor, rellene todos los campos obligatorios.', 'danger');
      return;
    }

    const cultivo = {
      nombre: this.form.value.nombre,
      cantidad: Number(this.form.value.cantidad),
      descripcion: this.form.value.descripcion,
      fechaSiembra: this.form.value.fechaSiembra,
      parcelaId: this.form.value.parcelaExistente
        ? { nombre: this.form.value.parcelaExistente }
        : { nombre: this.form.value.parcelaNueva.trim() }
    };

    console.log('[INFO] JSON Enviado:', JSON.stringify(cultivo, null, 2));

    this.cultivoService.registrarCultivo(cultivo).subscribe({
      next: () => {
        this.mostrarAlerta('Cultivo registrado correctamente.', 'success');
        setTimeout(() => {
          this.router.navigate(['/inicio/usuario']);
        }, 2000);
      },
      error: (error) => {
        console.error('[ERROR] Error al registrar cultivo:', error);
        this.mostrarAlerta('Error al registrar el cultivo.', 'danger');
      }
    });
  }
}
