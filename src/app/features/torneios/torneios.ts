import { Component, inject, signal } from "@angular/core";
import { CurrencyPipe } from "@angular/common";
import { TorneiosService } from "../../core/services/torneios.service";
import { RouterLink } from "@angular/router";
import { Torneio } from "../../core/models/torneio.model";
@Component({
  selector: "app-torneios",
  templateUrl: "./torneios.html",
  styleUrl: "./torneios.css",
  imports: [RouterLink, CurrencyPipe],
})
export class Torneios {
  private torneioService = inject(TorneiosService);
  torneios = signal<Torneio[]>([]);
  loading = signal(true);
  errorMessage = "";

  loadTorneios(): void {
    this.loading.set(true);
    this.errorMessage = "";
    this.torneioService.getAll().subscribe({
      next: (response) => {
        this.torneios.set(response);
        this.loading.set(false);
      },
      error: (error) => {
        this.errorMessage = "Erro ao carregar torneios";
        this.loading.set(false);
      },
    });
  }

  ngOnInit(): void {
    this.loadTorneios();
  }
}
