import { Component, inject } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { TorneiosService } from "../../core/services/torneios.service";
@Component({
  selector: "app-manutencao-torneio",
  imports: [RouterLink],
  templateUrl: "./manutencao-torneio.html",
  styleUrl: "./manutencao-torneio.css",
})
export class ManutencaoTorneio {
  private fb = inject(FormBuilder);
  private torneioService = inject(TorneiosService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  editingId: string | null = null;
  loading = false;
  loadingData = false;
  sucessMessage = "";
  errorMessage = "";

  form = this.fb.nonNullable.group({
  nome: ["", [Validators.required]],
  jogo: ["", [Validators.required]],
  plataforma: ["", [Validators.required]],
  data: ["", [Validators.required]],
  premiacao: ["", [Validators.required, Validators.min(0)]],
  limiteParticipantes: ["", [Validators.required, Validators.min(0)]],
  inscricoesAbertas: ["", [Validators.required]],
  });

  ngInit(): void {
    const id = this.route.snapshot.queryParamMap.get("id");
    if (id) {
      this.editingId = id;
      this.loadTorneio(id);
    }
  }

  loadTorneio(id: string): void {
    this.loadingData = true;
    this.torneioService.getById(id).subscribe({
      next: (torneio) => {
        this.form.patchValue({nome: torneio.nome,
          jogo: torneio.jogo,
          plataforma: torneio.plataforma,
          data: torneio.data,
          premiacao: String(torneio.premiacao),
          limiteParticipantes: String(torneio.limiteParticipantes),
          inscricoesAbertas: String(torneio.inscricoesAbertas)
        });
        this.loadingData = false;
      },
      error: (error) => {
        this.errorMessage = "Erro ao carregar torneio" + error.message;
        this.loadingData = false;
      },
    });
  }
  submit(): void {
    this.sucessMessage = "";
    this.errorMessage = "";
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.loading = true;
    const formValue = this.form.getRawValue();
    const torneioData = {
      nome: formValue.nome,
      jogo: formValue.jogo,
      plataforma: formValue.plataforma,
      data: formValue.data,
      premiacao: formValue.premiacao,
      limiteParticipantes: formValue.limiteParticipantes,
      inscricoesAbertas: formValue.inscricoesAbertas,
    };

  if (this.editingId !== null) {
  }
  }
}


