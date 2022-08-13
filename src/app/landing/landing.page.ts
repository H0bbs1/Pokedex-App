import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss'],
})
export class LandingPage implements OnInit {

  constructor(private alertController: AlertController) { }

  ngOnInit() {
  }

  async showInfo() {
    const alert = await this.alertController.create({
      header: 'PokeTeams',
      message: 'PokeTeam is an app that lets you create your own teams of Pokemon! Click the Pokeball to start making your teams!',
      buttons: ['OK']
    });
    alert.present();
  }

}
