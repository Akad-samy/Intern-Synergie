import { Component } from "@angular/core";
import { ApiService } from "src/app/service/api.service";
import { Router } from "@angular/router";
import { GlobalService } from "src/app/service/global.service";
import { LoadingController, AlertController } from "@ionic/angular";
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from "@angular/animations";

@Component({
  selector: "app-tab2",
  templateUrl: "tab2.page.html",
  styleUrls: ["tab2.page.scss"],
  animations: [
    trigger("itemState", [
      transition("void => *", [
        style({ transform: "translateX(100%)" }),
        animate("500ms ease-out"),
      ]),
      transition("* => void", [
        animate("500ms ease-in", style({ transform: "translateX(-100%)" })),
      ]),
    ]),
  ],
})
export class tab2Page {
  prods = [];
  prod;
  myInput = "";
  pageSize = 10;
  page = 1;
  maxPage;
  skeleton = true;
  image = "";

  constructor(
    private apiService: ApiService,
    public globalService: GlobalService,
    private router: Router,
    public loadingController: LoadingController,
    private alertController: AlertController
  ) {}

  // ngOnChanges() {
  //   this.prods = [];
  //   this.page = 1;
  //   this.getProduct()
  // }

  ngOnInit() {
    this.getProduct();
  }

  ionViewWillEnter() {
    // this.getProduct()
  }

  async getProduct() {
    this.skeleton = true;
    if (this.myInput === undefined || this.myInput.match(".*\b[0-9]\b")) {
      // this.loadingController.dismiss();
      this.skeleton = false;
      const alert = await this.alertController.create({
        header: "Custplace",
        message: "Veuillez entrer le nom d'un produit! ",
        buttons: ["OK"],
        mode: "ios",
      });
      await alert.present();
    } else {
      this.apiService
        .dataByTitle(this.myInput, this.pageSize, this.page)
        .subscribe(
          async (e) => {
            console.log(e);

            this.skeleton = false;

            if (e["status"] === 1) {
              if (e["data"].length > 1) {
                if (e["pagination"].current_page === 1) {
                  this.prods = [];
                }
                this.prods = this.prods.concat(e["data"]);
                this.maxPage = e["pagination"].total_pages;
                console.log(this.prods);
              } else {
                this.prods = [];
                this.prods.push(e["data"])
              }
            } else {
              const alert = await this.alertController.create({
                header: "Custplace",
                message: "Produit non trouver! ",
                buttons: ["OK"],
                mode: "ios",
              });
              await alert.present();
            }
          },
          (err) => {
            console.log(err);
          }
        );
    }
  }

  showProduct(id) {
    this.globalService.codebar = id;
    this.router.navigateByUrl(`/tabs/tab1`);
  }

  nextPage(event) {
    ++this.page;
    console.log(this.page + " produit: " + this.myInput);
    this.getProduct();
    // if (this.page === this.maxPage) {
    //   event.target.disabled = true;
    // }
  }
  onChangeTime() {
    this.page = 1;
    this.pageSize = 10;
  }
}
