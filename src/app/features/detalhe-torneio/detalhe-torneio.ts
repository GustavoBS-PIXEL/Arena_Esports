import { AsyncPipe, CurrencyPipe } from "@angular/common";
import { Component } from "@angular/core";
import { ActivatedRoute, RouterLink } from "@angular/router";
import { map, of, switchMap } from "rxjs";
import { TorneiosService } from "../../core/services/torneios.service";

@Component({
  selector: "app-detalhe-torneio",
  imports: [AsyncPipe, CurrencyPipe, RouterLink],
  templateUrl: "./detalhe-torneio.html",
  styleUrl: "./detalhe-torneio.css",
})
export class DetalheTorneio {
  readonly torneio$;

  constructor(route: ActivatedRoute, torneiosService: TorneiosService) {
    this.torneio$ = route.paramMap.pipe(
      map((parametros) => parametros.get("id")),
      switchMap((id) => id === null ? of(null) : torneiosService.getById(id)),
    );
  }
}
