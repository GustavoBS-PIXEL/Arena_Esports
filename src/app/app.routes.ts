import { Routes } from "@angular/router";
export const routes: Routes = [
  {
    path: "",
    loadComponent: () => import("./features/home/home").then((m) => m.Home),
    title: "Início | EsportArena",
  },
  {
    path: "sobre",
    loadComponent: () => import("./features/sobre/sobre").then((m) => m.Sobre),
    title: "Sobre | EsportArena",
  },
  {
    path: "conteudos",
    loadComponent: () =>
      import("./features/torneios/torneios").then((m) => m.Torneios),
    title: "Conteúdos | EsportArena",
  },
  {
    path: "conteudos/:id",
    loadComponent: () =>
      import("./features/detalhe-torneio/detalhe-torneio").then(
        (m) => m.DetalheTorneio,
      ),
    title: "Detalhes do torneio | EsportArena",
  },
  {
    path: "admin",
    loadComponent: () => import("./features/admin/admin").then((m) => m.Admin),
    title: "Admin | EsportArena",
  },
  {
    path: "admin/form",
    loadComponent: () =>
      import("./features/manutencao-torneio/manutencao-torneio").then(
        (m) => m.ManutencaoTorneio,
      ),
    title: "Novo torneio | EsportArena",
  },
  {
    path: "admin/form/:id",
    loadComponent: () =>
      import("./features/manutencao-torneio/manutencao-torneio").then(
        (m) => m.ManutencaoTorneio,
      ),
    title: "Editar torneio | EsportArena",
  },
  { path: "**", redirectTo: "" },
];
