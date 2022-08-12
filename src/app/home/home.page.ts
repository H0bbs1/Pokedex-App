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

  constructor(private alertController: AlertController, private storage: StorageService) {
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
            console.log(data[0]);
            const teamName = data[0];
            //this.storage.saveNewTeam(teamName)
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
