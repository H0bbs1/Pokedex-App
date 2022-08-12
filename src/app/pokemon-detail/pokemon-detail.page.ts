import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { PokemonDetails } from '../models/pokemon-detail.model';
import { Pokemon } from '../models/pokemon.model';
import { DataManagerService } from '../services/data-manager.service';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.page.html',
  styleUrls: ['./pokemon-detail.page.scss'],
})
export class PokemonDetailPage implements OnInit {
  details: PokemonDetails = {} as PokemonDetails;

  constructor(private data: DataManagerService, private route: ActivatedRoute,
    private alertController: AlertController, private storage: StorageService, private toast: ToastController) {
   }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.data.getPokemonDetail(id).subscribe(res => {
      this.details = res;
    });
  }

  async addToTeam() {
    const teamRadio = [];
    let teamNames;
    this.storage.getAllTeamNames().then((res) => {
      teamNames = res;
      for (const team of teamNames) {
        const radioInput = {label: team, type: 'radio', value: team};
        teamRadio.push(radioInput);
      }
      this.createTeamSelectAlert(teamRadio);
    });
  }

  async createTeamSelectAlert(teamInput) {
    const alert = await this.alertController.create({
      header: 'Select Team',
      inputs: teamInput,
      buttons: [
        {
          text: 'OK',
          handler: (teamName) => {
            this.addToStorage(teamName);
            // const chosenPokemon: Pokemon = {id: this.details.id, name: this.details.name, imageURL: this.details.imageURL, url: ''};
            // this.storage.addPokemonToTeam(teamName, chosenPokemon);
            // try {
            //   this.storage.addPokemonToTeam(teamName, chosenPokemon).then(() => {
            //     this.displayAlert('Success', 'Pokemon Added!');
            //   }, (err) => {
            //     console.log(err);
            //     this.displayAlert('Error', err);
            //   });
            // } catch(err: any) {
            //   this.displayAlert('Error', err);
            // }
          }
        },
        {
          text: 'Cancel'
        }
      ]
    });
    alert.present();
  }

  async addToStorage(teamName) {
    const chosenPokemon: Pokemon = {id: this.details.id, name: this.details.name, imageURL: this.details.imageURL, url: ''};
    try {
      await this.storage.addPokemonToTeam(teamName, chosenPokemon);
      this.displayAlert('Success', 'Pokemon Added!');
    } catch(err) {
      this.displayAlert('Error', err.message);
    }
  }

  async displayAlert(headerMsg, msg) {
    const alert = await this.alertController.create({
      header: headerMsg,
      message: msg,
      buttons: ['OK']
    });
    alert.present();
  }

}
