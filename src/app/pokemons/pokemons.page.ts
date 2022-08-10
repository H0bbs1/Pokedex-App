import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../models/pokemon.model';
import { DataManagerService } from '../services/data-manager.service';

@Component({
  selector: 'app-pokemons',
  templateUrl: './pokemons.page.html',
  styleUrls: ['./pokemons.page.scss'],
})
export class PokemonsPage implements OnInit {
  pokemonList: Pokemon[] = [];

  constructor(private data: DataManagerService) {
    this.data.getPokemonList().subscribe(res => {
      this.pokemonList = res;
    });
   }

  ngOnInit() {
  }

}
