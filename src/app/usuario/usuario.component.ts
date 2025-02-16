import { Component, OnInit, signal } from '@angular/core';
import { CultivoService } from './services/cultivo.service';
import { RouterLink } from '@angular/router';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-usuario',
  standalone: true,
  imports: [RouterLink, NgFor],
  templateUrl: './usuario.component.html',
  styleUrl: './usuario.component.css'
})
export class UsuarioComponent implements OnInit {

  cultivos = signal<any[]>([]);

  constructor(private cultivoService: CultivoService) { }

  ngOnInit(): void {
    this.cargarCultivos();
  }
  cargarCultivos() {
    this.cultivoService.obtenerCultivos().subscribe((data) => {
      this.cultivos.set(data.cultivos);
    });
  }

  eliminarCultivo(id: number){
    this.cultivoService.eliminarCultivo(id).subscribe((data) => {
      this.cultivos.set(this.cultivos().filter(c => c.cultivoId !== id));
    });
  }

}
