import { ReviewFormComponent } from './../review-form/review-form.component';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { GlobalService } from 'src/app/service/global.service';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss'],
})
export class ReviewsComponent {
  constructor(
    private modalController: ModalController,
    public globalService: GlobalService
  ) {}

  ngOnInit() {
    console.log(this.globalService.productReviews);
  }

  async addReview() {
    const modal = await this.modalController.create({
      component: ReviewFormComponent,
      swipeToClose: true,
    });
    await modal.present();
    console.log(this.globalService.productReviews);
  }
}
