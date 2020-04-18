import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { GlobalService } from 'src/app/service/global.service';

@Component({
  selector: 'app-review-form',
  templateUrl: './review-form.component.html',
  styleUrls: ['./review-form.component.scss'],
})
export class ReviewFormComponent implements OnInit {
  count;
  reviewForm = this.formBuilder.group({
    nom: ['', [Validators.required, Validators.maxLength(100)]],
    email: [
      '',
      [
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$'),
      ],
    ],
    description: ['', [Validators.required]],
    rating: [0, [Validators.required]],
  });
  stars = [false, false, false, false, false];
  constructor(
    private modalController: ModalController,
    private formBuilder: FormBuilder,
    private globalService: GlobalService
  ) {}

  ngOnInit() {}

  close() {
    this.modalController.dismiss();
  }

  submit() {
    // console.log(this.reviewForm.value);
    this.reviewForm.value.rating = parseInt(this.count);
    this.globalService.productReviews.unshift(this.reviewForm.value);

    this.globalService.moyenneScore = Number(
      (
        this.globalService.productReviews.reduce(
          (prev, curr) => prev + curr.rating,
          0
        ) / this.globalService.productReviews.length
      ).toFixed(1)
    );
    this.modalController.dismiss();
  }

  starmark(index: number) {
    for (let i = 1; i <= 5; i++) {
      this.stars[i - 1] = i <= index;
    }
    this.count = index;
  }
}
