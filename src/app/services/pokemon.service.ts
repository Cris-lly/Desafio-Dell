import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Pokemon } from '../models/pokemon.model';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private apiUrl = ' https://pokeapi.co/api/v2/';
  constructor(private httpClient: HttpClient) { 
    
  }
  loadAllPokemons():Observable<any> {
    const req = this.httpClient.get<any>(`${this.apiUrl}pokemon?limit=100`);
    return req
  }
  loadPokemon(id:number):Observable<Pokemon> {

    return this.httpClient.get<any>(`${this.apiUrl}pokemon/${id}`).pipe(
      map( Pokemon => {
        return{
          id: Pokemon.id,
          name: Pokemon.name,
          image: Pokemon.sprites.other.dream_world.front_default

        }
      }
      )
    );

  }

  getUrlImage(number:number):Observable<any>{
    const request = this.httpClient.get<any>(`${this.apiUrl}pokemon/${number}`)
    return request
  }
  
}
