import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokemonDetails } from '../models/pokemon-detail.model';
import { DataManagerService } from '../services/data-manager.service';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.page.html',
  styleUrls: ['./pokemon-detail.page.scss'],
})
export class PokemonDetailPage implements OnInit {
  details: PokemonDetails = {} as PokemonDetails;

  constructor(private data: DataManagerService, private route: ActivatedRoute) {
   }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.data.getPokemonDetail(id).subscribe(res => {
      this.details = res;
      console.log(this.details);
    });
  }

}
