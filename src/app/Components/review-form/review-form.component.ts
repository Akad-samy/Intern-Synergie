import { ReviewsComponent } from './../reviews/reviews.component';
import { HttpClient } from '@angular/common/http';
import { ApiService } from 'src/app/service/api.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { GlobalService } from 'src/app/service/global.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-review-form',
  templateUrl: './review-form.component.html',
  styleUrls: ['./review-form.component.scss'],
})
export class ReviewFormComponent implements OnInit {
  count;
  reviewForm = this.formBuilder.group({
    last_name: ['', [Validators.required, Validators.maxLength(100)]],
    first_name: ['', [Validators.required, Validators.maxLength(100)]],
    email: [
      '',
      [
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$'),
      ],
    ],
    comment: ['', [Validators.required]],
    rate: [0, [Validators.required]],
  });
  stars = [false, false, false, false, false];
  constructor(
    private modalController: ModalController,
    private formBuilder: FormBuilder,
    private globalService: GlobalService,
    private apiService: ApiService,
    private toast: ToastController
  ) {}

  ngOnInit() {}

  close() {
    this.modalController.dismiss();
  }

  submit() {
    this.reviewForm.value.rate = parseInt(this.count);
    this.apiService.postReview(this.globalService.codebar, this.reviewForm.value).subscribe((e) => {
      console.warn(e)
    });
    // this.reviews.showReviews();
    this.modalController.dismiss();
    this.toast.create({
      message: 'Votre commentaire a été ajouter avec succee !',
      duration: 2000,
      color: "success",
    }).then((toastData) => {
      console.log(toastData);
      toastData.present();
    });
  }

  starmark(index: number) {
    for (let i = 1; i <= 5; i++) {
      this.stars[i - 1] = i <= index;
    }
    this.count = index;
  }
}
