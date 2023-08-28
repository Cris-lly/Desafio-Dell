import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Pokemon } from '../models/pokemon.model';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private apiUrl = ' https://pokeapi.co/api/v2/';
  constructor(private httpClient: HttpClient) {}
  loadAllPokemons(): Observable<any> {
    const req = this.httpClient.get<any>(`${this.apiUrl}pokemon?limit=50`);
    return req;
  }
  loadPokemon(id: number): Observable<Pokemon> {
    return this.httpClient.get<any>(`${this.apiUrl}pokemon/${id}`).pipe(
      map((Pokemon) => {
        return {
          id: Pokemon.id,
          name: Pokemon.name,
          image: Pokemon.sprites.other.dream_world.front_default,
          icon: Pokemon.sprites.front_default,
          type: Pokemon.types.map((type: any) => {
            return type.type.name;
          }),
          height: Pokemon.height,
          weight: Pokemon.weight,
        };
      })
    );
  }

  loadDescription(id: number): Observable<any> {
    const req = this.httpClient.get<any>(`${this.apiUrl}pokemon-species/${id}`);
    return req;
  }

  showImage(id:number):string{
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
  }
  renamePokemonNumber(number: number, size = 3):string{
    let renameNumber = String(number);
    while(renameNumber.length < (size || 2)){
      renameNumber = '0' + renameNumber;
    }
    return renameNumber
  }
}
