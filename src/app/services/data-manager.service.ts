/* eslint-disable @typescript-eslint/dot-notation */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Move, MoveDetail, PokemonDetails, Stat } from '../models/pokemon-detail.model';
import { Pokemon } from '../models/pokemon.model';

@Injectable({
  providedIn: 'root'
})
export class DataManagerService {
  baseURL = 'https://pokeapi.co/api/v2';
  baseImageURL = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/';

  constructor(private httpClient: HttpClient) { }

  // Returns a list of Pokemon
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

  // Returns the details of a specific Pokemon
  getPokemonDetail(id) {
    const url = `${this.baseURL}/pokemon/${id}`;
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
        moveDetail.url = pokeMoves[i].move.url;

        const urlLength = moveDetail.url.length;
        moveDetail.id = moveDetail.url.slice(urlLength - 4, urlLength - 1); // id of move is at the end of their url value
        moveDetail.id = moveDetail.id.substring(moveDetail.id.indexOf('/') + 1);

        pd.moves.push(moveDetail);
      }

      return pd;
    }));
  }

  // Returns a specific move of a Pokemon
  getMoveDetail(id) {
    const url = `${this.baseURL}/move/${id}`;
    return this.httpClient.get(url).pipe(map(res => {
      const moveDetails = {} as MoveDetail;
      moveDetails.id = res['id'];
      moveDetails.name = res['name'];
      moveDetails.name = moveDetails.name.charAt(0).toUpperCase() + moveDetails.name.slice(1);
      moveDetails.type = res['type'].name;
      moveDetails.type = moveDetails.type.charAt(0).toUpperCase() + moveDetails.type.slice(1);
      moveDetails.power = (res['power'] ? res['power'] : 0);
      moveDetails.pp = res['pp'];
      moveDetails.accuracy = res['accuracy'];

      moveDetails.summary = (res['effect_entries'] ? res['effect_entries'][0].effect : '');
      return moveDetails;
    }));
  }
}
