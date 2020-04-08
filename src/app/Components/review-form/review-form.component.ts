import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-review-form',
  templateUrl: './review-form.component.html',
  styleUrls: ['./review-form.component.scss'],
})
export class ReviewFormComponent implements OnInit {

  reviewForm = this.formBuilder.group({
    nom: ["", [Validators.required, Validators.maxLength(100)]],
    email: ["",[Validators.required,Validators.pattern("^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$")]],
    description: ["",[Validators.required]],
    rating: [1]
  });
  
  constructor(
    private modalController: ModalController,
    private formBuilder: FormBuilder
    ) { }

  ngOnInit() {}

  close() {
    this.modalController.dismiss();
  }

  submit() {
    console.log(this.reviewForm.value);
    this.modalController.dismiss(this.reviewForm.value);
  }

}
