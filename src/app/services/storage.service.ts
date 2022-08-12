import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Pokemon } from '../models/pokemon.model';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  readonly maxTeamSpace: number = 6;

  constructor(private storage: Storage) {
    this.init();
   }

  async init() {
    await this.storage.create();
  }

  async saveNewTeam(teamName: string) {
    const teamPokemons: Pokemon[] = [];
    this.storage?.set(teamName, JSON.stringify(teamPokemons));
  }

  getAllTeamNames() {
    return this.storage.keys();
  }

  deleteTeam(teamKey: string) {
    this.storage.remove(teamKey);
  }

  // Adds Pokemon to existing team
  async addPokemonToTeam(teamKey: string, pokemonValue: Pokemon) {
    console.log('TeamName: ' + teamKey);
    const res = await this.storage.get(teamKey);
    console.log(res);

    const pokemonArray = JSON.parse(res);
    if (pokemonArray.length < 6) {
      console.log('less');
      pokemonArray.push(pokemonValue);
      this.storage?.set(teamKey, JSON.stringify(pokemonArray));
    }
    else {
      throw Error('Team is full');
    }
  }
}
