import { ApiService } from "src/app/service/api.service";
import { ReviewFormComponent } from "./../review-form/review-form.component";
import { Component, OnInit, Input  } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { GlobalService } from "src/app/service/global.service";

@Component({
  selector: "app-reviews",
  templateUrl: "./reviews.component.html",
  styleUrls: ["./reviews.component.scss"],
})
export class ReviewsComponent {
  @Input() id: any
  page = 1;
  maxPage;
  reviews = [];
  skeleton;
  constructor(
    private modalController: ModalController,
    public globalService: GlobalService,
    private apiService: ApiService
  ) {
  }

  ngOnInit() {
    // this.showReviews();
  }
  ngOnChanges() {
    this.reviews = [];
    this.page = 1;
    this.showReviews()
  }

  showReviews() {
    this.skeleton = true
    console.log(this.globalService.codebar)
    this.apiService
      .getReviews(this.globalService.codebar, this.page)
      .subscribe((e) => {
        this.skeleton = false
        this.maxPage = e["pagination"].total_pages;
        console.log(e);
        this.reviews = this.reviews.concat(e["data"]);
      });
  }

  async addReview() {
    const modal = await this.modalController.create({
      component: ReviewFormComponent,
      swipeToClose: true,
    });
    await modal.present();
  }

  nextPage(event) {
    ++this.page;
    console.log(this.page);
    this.showReviews();
    if (this.page === this.maxPage) {
      event.target.disabled = true;
    }
  }
}
