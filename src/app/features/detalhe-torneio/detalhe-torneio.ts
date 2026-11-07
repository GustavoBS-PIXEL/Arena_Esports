import { AsyncPipe, CurrencyPipe } from "@angular/common";
import { Component } from "@angular/core";
import { ActivatedRoute, RouterLink } from "@angular/router";
import { map, switchMap } from "rxjs";
import { TorneiosService } from "../../core/services/torneios.service";

@Component({
  selector: "app-detalhe-torneio",
  imports: [AsyncPipe, CurrencyPipe, RouterLink],
  templateUrl: "./detalhe-torneio.html",
  styleUrl: "./detalhe-torneio.css",
})
export class DetalheTorneio {
  readonly conteudo$;

  constructor(route: ActivatedRoute, torneiosService: TorneiosService) {
    this.conteudo$ = route.paramMap.pipe(
      map((parametros) => parametros.get("id")),
      switchMap((id) => torneiosService.getById(id)),
    );
  }
}
