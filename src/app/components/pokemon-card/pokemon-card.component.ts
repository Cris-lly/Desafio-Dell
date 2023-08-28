import { Component, Input, OnInit, OnChanges} from '@angular/core';
import { Pokemon } from 'src/app/models/pokemon.model';
import { PokemonService } from 'src/app/services/pokemon.service';
@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.css']
})
export class PokemonCardComponent implements OnInit {
  @Input() listPokemons = [{name: '', url:""},];
  @Input() idPokemon = 1;
  pokemon?: Pokemon;
  constructor(public pokemonService: PokemonService) { }

  ngOnInit(): void {
  }
  ngOnChanges(): void{
    this.getInfoPokemon();
    
  }
  
  getInfoPokemon():void{
    this.pokemonService.loadPokemon(this.idPokemon).subscribe((pokemons) => {   
      this.pokemon = pokemons; 
    }
  );

  }
}
