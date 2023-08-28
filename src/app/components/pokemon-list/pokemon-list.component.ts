import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { PokemonService } from 'src/app/services/pokemon.service';
import { IAppState, modifyValue } from 'src/app/store/app.state';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent implements OnInit {
  listPokemons= [{name: '', url:""},];
  constructor(public pokemonService:PokemonService, private store: Store<{app: IAppState}>) { }
  
  idPokemon$ = this.store.select('app')
  .pipe(
    map(e=> e.idPokemon)
  );

  modifyValue(num: number){
    this.store.dispatch(modifyValue({newValue: num}))
  }
  getPokemonInfo(): void {
    this.pokemonService.loadAllPokemons().subscribe((pokemons) => {
      
      this.listPokemons = pokemons.results; 
    
    }
  );
  }
  
  ngOnInit(): void {
    this.getPokemonInfo();
  }

}
