import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { PokemonDetails } from '../models/pokemon-detail.model';
import { DataManagerService } from '../services/data-manager.service';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.page.html',
  styleUrls: ['./pokemon-detail.page.scss'],
})
export class PokemonDetailPage implements OnInit {
  details: PokemonDetails = {} as PokemonDetails;

  constructor(private data: DataManagerService, private route: ActivatedRoute, private alertController: AlertController) {
   }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.data.getPokemonDetail(id).subscribe(res => {
      this.details = res;
      console.log(this.details);
    });
  }

  async addToTeam() {
    const alert = await this.alertController.create({
      header: 'Select Team',
      inputs: [
        {
          label: 'Team1',
          type: 'radio',
          value: 'Team1',
        },
        {
          label: 'Team2',
          type: 'radio',
          value: 'Team2',
        },
        {
          label: 'Team3',
          type: 'radio',
          value: 'Team3',
        },
      ],
      buttons: [
        {
          text: 'OK',
          handler: (data) => {
            console.log(data);
          }
        },
        {
          text: 'Cancel'
        }
      ]
    });
    alert.present();
  }

}
