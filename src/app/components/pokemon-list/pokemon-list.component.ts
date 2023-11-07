import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { PokemonService } from 'src/app/services/pokemon.service';
import { IAppState, modifyValue } from 'src/app/store/app.state';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css'],
})
export class PokemonListComponent implements OnInit {
  listPokemons = [{ name: '', url: '', id: 0 }];
  listTypes = [{name:'', url:'', id:0}]
  imagePokemon = [''];
  selectOption: string = '';
  searchText: string = '';
  searchNumber: number | undefined
  constructor(
    public pokemonService: PokemonService,
    private store: Store<{ app: IAppState }>
  ) {}

  idPokemon$ = this.store.select('app').pipe(map((e) => e.idPokemon));

  modifyValue(num: number) {
    this.store.dispatch(modifyValue({ newValue: num }));
  }
  getPokemonInfo(): void {
    this.pokemonService.loadAllPokemons().subscribe((pokemons) => {
      pokemons.results.forEach((pokemon: any, i: number) => {
        this.listPokemons.push({
          name: pokemon.name,
          url: pokemon.url,
          id: i + 1,
        });
      });
      this.listPokemons = this.removeElementById(0, this.listPokemons);
    });
  }
  filteredItems(selectType: string): { name: string; url: string; id: number }[] {
    if(selectType == 'name'){
      return this.listPokemons.filter((item) =>
        item.name.toLowerCase().includes(this.searchText.toLowerCase())
      );
    }else if(selectType == 'number'){
      return this.listPokemons.filter((item) =>
        item.id == this.searchNumber
      );
    }else{
      return this.listPokemons
    }
  }

  removeElementById(idToRemove: number, lista: {name:string, url:string, id:number}[]): {name:string, url:string, id:number}[] {
    return lista.filter(
      (obj) => obj.id !== idToRemove
    );
  }
  ngOnInit(): void {
    this.getPokemonInfo();
  }
}
