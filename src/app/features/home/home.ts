import { AsyncPipe } from "@angular/common";
import { Component } from "@angular/core";
import { RouterLink } from "@angular/router";
import { map } from "rxjs";
import {TorneiosService } from "../../core/services/torneios.service";

@Component({
  selector: "app-home",
  imports: [RouterLink, AsyncPipe],
  templateUrl: "./home.html",
  styleUrl: "./home.css",
})
export class Home {
  readonly conteudosDestaque$;

  constructor(torneioService: TorneiosService) {
    this.conteudosDestaque$ = torneioService
      .getAll()
      .pipe(map((torneios) => torneios.slice(0, 10)));
  }

  moverCarrossel(trilho: HTMLElement, direcao: number): void {
    trilho.scrollBy({ left: direcao * 340, behavior: "smooth" });
  }
}
