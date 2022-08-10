/* eslint-disable @typescript-eslint/dot-notation */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Move, PokemonDetails, Stat } from '../models/pokemon-detail.model';
import { Pokemon } from '../models/pokemon.model';

@Injectable({
  providedIn: 'root'
})
export class DataManagerService {
  baseURL = 'https://pokeapi.co/api/v2';
  baseImageURL = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/';

  constructor(private httpClient: HttpClient) { }

  getPokemonList(offset = 0) {
    const url = `${this.baseURL}/pokemon?offset=${offset}&limit=151`;
    return this.httpClient.get(url).pipe(map(res => res['results']),
      map(pokemons => pokemons.map((pokemon, index) => {
        const poke = {} as Pokemon;
        poke.id = index + 1 + offset;
        poke.name = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
        poke.url = pokemon.url;
        poke.imageURL = `${this.baseImageURL}${poke.id}.png`;
        return poke;
      }))
    );
  }

  getPokemonDetail(id) {
    const url = `${this.baseURL}/pokemon/${id}`;
    console.log(url);
    return this.httpClient.get(url).pipe(map(res => {
      const pd = {} as PokemonDetails;
      pd.id = res['id'];
      pd.name = res['name'].charAt(0).toUpperCase() + res['name'].slice(1);
      pd.imageURL = res['sprites'].front_default;
      pd.types = res['types'].map(type => type.type.name.charAt(0).toUpperCase() + type.type.name.slice(1));
      pd.abilities = res['abilities'].map(ability => (ability.ability.name.charAt(0).toUpperCase() + ability.ability.name.slice(1)));

      pd.stats = res['stats'].map(stat => {
        const statDetail = {} as Stat;
        statDetail.name = stat.stat.name;
        statDetail.value = stat.base_stat;
        return statDetail;
      });

      pd.moves = [];
      const pokeMoves = res['moves'];
      for (let i = 0; i < 10 && i < pokeMoves.length; i++) {
        const moveDetail = {} as Move;
        moveDetail.name = pokeMoves[i].move.name;
        moveDetail.name = moveDetail.name.charAt(0).toUpperCase() + moveDetail.name.slice(1);
        moveDetail.url = pokeMoves[i].url;
        pd.moves.push(moveDetail);
      }

      // pd.moves = res['moves'].map(move => {
      //   const moveDetail = {} as Move;
      //   moveDetail.name = move.move.name.charAt(0).toUpperCase() + move.move.name.slice(1);
      //   moveDetail.url = move.move.url;
      //   return moveDetail;
      // });

      return pd;
    }));
  }
}
