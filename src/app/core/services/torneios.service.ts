import { inject, Injectable } from "@angular/core";
import { map, Observable, of } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Torneio } from "../models/torneio.model";

type FirebaseTorneios = Omit<Torneio, "id"> & { id: unknown };

@Injectable({ providedIn: "root" })
export class TorneiosService {
  private http = inject(HttpClient);
  private apiUrl = "https://api-db-arenaesports-default-rtdb.firebaseio.com/torneios"
  private sufix = ".json"

  getAll(): Observable<Torneio[]> {
    return this.http
    .get<Record<string, FirebaseTorneios> | null>(this.apiUrl + this.sufix)
    .pipe(
      map((response) => {
        if (!response) {
          return [];
        }
        return Object.entries(response).map(([id, torneio]) => {
          const { id: _ignoredId, ...torneioData } = torneio;
          return { id, ...torneioData};
        })
      })
    );

  }

  getById(id: string): Observable<Torneio> {
    return this.http
      .get<FirebaseTorneios | null>(`${this.apiUrl}/${id}${this.sufix}`)
      .pipe(
        map((response) => {
          if (!response) {
            throw new Error(`Conteudo não encontrado!`);
          }
        const { id: _ignoredId, ...torneioData } = response;
        return { id, ...torneioData };
      })
    );
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}${this.sufix}`);
  }
}
