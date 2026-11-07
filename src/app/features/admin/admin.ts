import { Component, inject } from "@angular/core";
import { Router, RouterLink } from "@angular/router";
import { TorneiosService } from "../../core/services/torneios.service";
import { Torneio } from "../../core/models/torneio.model";


@Component({
  selector: "app-admin",
  imports: [RouterLink],
  templateUrl: "./admin.html",
  styleUrl: "./admin.css",
})
export class Admin {
  private torneioService = inject(TorneiosService);
  private router = inject(Router);

  torneios: Torneio[] = [];
  loading = false;
  errorMessage = "";
  successMessage = "";

  loadTorneios(): void {
    this.loading = true;
    this.errorMessage = "";
    this.torneioService.getAll().subscribe({
      next: (response) => {
        this.torneios = response;
        this.loading = false;
      },
      error: (error) => {
        this.errorMessage = "Erro ao carregar torneios";
        this.loading = false;
      },
    });
  }

  ngInit(): void {
    this.loadTorneios();
  }
  edit(id: string): void {
    this.router.navigate(["/admin/editar"],
       { queryParams: { id } 
      });
  }
  remove(id: string): void {
    const confirmDelete = confirm("Tem certeza que deseja remover este torneio?");
    if (!confirmDelete) {
      return;
    }
    this.torneioService.delete(id).subscribe({
      next: () => {
        this.successMessage = "Torneio removido com sucesso";
        this.loadTorneios();
        setTimeout(() => {
          this.successMessage = "";
        }, 2000);
      },
      error: (error) => {
        this.errorMessage = "Erro ao remover torneio";
      },
    });
  }

}