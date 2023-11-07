import { Component, Input, OnInit, OnChanges} from '@angular/core';
import { Observable } from 'rxjs';
import { Pokemon } from 'src/app/models/pokemon.model';
import { PokemonService } from 'src/app/services/pokemon.service';
@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.css']
})
export class PokemonCardComponent implements OnInit {
  @Input() listPokemons = [{name: '', url:"", id:0},];
  @Input() idPokemon = 1;
  pokemon?: Pokemon;
  pokemonDescription= ['',]
  constructor(public pokemonService: PokemonService) { }

  ngOnInit(): void {
  }
  ngOnChanges(): void{
    this.getInfoPokemon();
    this.getDescription();
  }
  
  getInfoPokemon():void{
    this.pokemonService.loadPokemon(this.idPokemon).subscribe((pokemons) => {   
      this.pokemon = pokemons;
    }
  );
  }
  getDescription(){
    this.pokemonService.loadDescription(this.idPokemon).subscribe((pokemon) =>{
      this.pokemonDescription = pokemon.flavor_text_entries[6].flavor_text;
    })
  }
  convertToLbs(num: number | undefined):number{
    if(num === undefined){
      return 0
    }
    return parseFloat((num*2.2).toFixed(2))
  }
}
