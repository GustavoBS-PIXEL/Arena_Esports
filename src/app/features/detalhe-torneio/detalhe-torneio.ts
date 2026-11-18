import { AsyncPipe, CurrencyPipe } from "@angular/common";
import { Component } from "@angular/core";
import { ActivatedRoute, RouterLink } from "@angular/router";
import { catchError, map, of, startWith, switchMap } from "rxjs";
import { TorneiosService } from "../../core/services/torneios.service";
import { Torneio } from "../../core/models/torneio.model";

type EstadoDetalhe =
  | { status: "loading" }
  | { status: "error" }
  | { status: "success"; torneio: Torneio };

@Component({
  selector: "app-detalhe-torneio",
  imports: [AsyncPipe, CurrencyPipe, RouterLink],
  templateUrl: "./detalhe-torneio.html",
  styleUrl: "./detalhe-torneio.css",
})
export class DetalheTorneio {
  readonly estado$;

  constructor(route: ActivatedRoute, torneiosService: TorneiosService) {
    this.estado$ = route.paramMap.pipe(
      switchMap((parametros) => {
        const id = parametros.get("id");
        if (id === null) return of<EstadoDetalhe>({ status: "error" });
        return torneiosService.getById(id).pipe(
          map((torneio): EstadoDetalhe => ({ status: "success", torneio })),
          catchError(() => of<EstadoDetalhe>({ status: "error" })),
          startWith({ status: "loading" } as EstadoDetalhe),
        );
      }),
    );
  }
}
