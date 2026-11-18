import { Component, inject } from "@angular/core";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { TorneiosService } from "../../core/services/torneios.service";
@Component({
  selector: "app-manutencao-torneio",
  imports: [ReactiveFormsModule, RouterLink],
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
  premiacao: [0, [Validators.required, Validators.min(0)]],
  limiteParticipantes: [0, [Validators.required, Validators.min(0)]],
  inscricoesAbertas: [false],
  });

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get("id") ?? this.route.snapshot.queryParamMap.get("id");
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
          premiacao: torneio.premiacao,
          limiteParticipantes: torneio.limiteParticipantes,
          inscricoesAbertas: torneio.inscricoesAbertas
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
    this.torneioService.update(this.editingId, torneioData)
    .subscribe({
      next: () => {
        this.loading = false;
        this.sucessMessage = "Torneio atualizado com sucesso!";
        setTimeout(() => {
          this.router.navigate(["/admin"]);
        }, 1000);
      },
      error: () => {
        this.loading = false;
        this.errorMessage = "Erro ao atualizar torneio";
      },
    })
    return;
    }
    this.torneioService.create(torneioData).subscribe({
        next: () => {
          this.loading = false;
          this.sucessMessage = "Torneio criado com sucesso!";
          this.form.reset();
          setTimeout(() => {
            this.router.navigate(["/admin"]);
          }, 1000);
        },
         error: () => {
          this.loading = false;
          this.errorMessage = "Erro ao criar torneio";
        }
    })
}
}


