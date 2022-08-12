import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { DataManagerService } from '../services/data-manager.service';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  teamNames: string[] = [];

  constructor(private alertController: AlertController, private storage: StorageService) {
    this.loadTeamNames();
  }

  loadTeamNames() {
    this.storage.getAllTeamNames().then(res => {
      this.teamNames = res;
      console.log(this.teamNames);
    });
  }

  deleteTeam(team) {
    console.log(team);
    this.storage.deleteTeam(team);
    this.loadTeamNames();
  }

  async addNewTeam() {
    const alert = await this.alertController.create({
      header: 'Enter Team Name',
      inputs: [
        {
          placeholder: 'Team Name...',
          attributes: {
            minlength: 1
          }
        }
      ],
      buttons: [
        {
          text: 'Save',
          handler: (data) => {
            const teamName = data[0];
            this.storage.saveNewTeam(teamName).then(() => {
              this.loadTeamNames();
            });
          }
        },
        {
          text: 'Cancel'
        }
      ]
    });
    await alert.present();
  }

}
