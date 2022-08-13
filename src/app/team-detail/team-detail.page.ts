import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Pokemon } from '../models/pokemon.model';
import { DataManagerService } from '../services/data-manager.service';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-team-detail',
  templateUrl: './team-detail.page.html',
  styleUrls: ['./team-detail.page.scss'],
})
export class TeamDetailPage implements OnInit {
  teamName: string;
  pokemons: Pokemon[];

  constructor(private data: DataManagerService, private route: ActivatedRoute, private storage: StorageService) {
    this.teamName = this.route.snapshot.paramMap.get('name');
    console.log(this.teamName);
    this.storage.getPokemons(this.teamName).then(res => {
      this.pokemons = res;
      //splice to remove
    });
  }

  ngOnInit() {
  }

}
