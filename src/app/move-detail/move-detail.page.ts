import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MoveDetail } from '../models/pokemon-detail.model';
import { DataManagerService } from '../services/data-manager.service';

@Component({
  selector: 'app-move-detail',
  templateUrl: './move-detail.page.html',
  styleUrls: ['./move-detail.page.scss'],
})
export class MoveDetailPage implements OnInit {
  moveID: string;
  moveDetail = {} as MoveDetail;

  constructor(private data: DataManagerService, private route: ActivatedRoute) {
    this.moveID = this.route.snapshot.paramMap.get('id');
    this.data.getMoveDetail(this.moveID).subscribe(res => {
      this.moveDetail = res;
    });
   }

  ngOnInit() {
  }

}
