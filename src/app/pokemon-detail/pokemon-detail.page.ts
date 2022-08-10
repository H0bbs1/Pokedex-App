import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataManagerService } from '../services/data-manager.service';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.page.html',
  styleUrls: ['./pokemon-detail.page.scss'],
})
export class PokemonDetailPage implements OnInit {

  constructor(private data: DataManagerService, private route: ActivatedRoute) {
   }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.data.getPokemonDetail(id).subscribe(res => {
      console.log(res);
    });
  }

}
