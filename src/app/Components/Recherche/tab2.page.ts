import { Component } from "@angular/core";
import { ApiService } from "src/app/service/api.service";
import { Router } from "@angular/router";
import { GlobalService } from "src/app/service/global.service";
import { LoadingController, AlertController } from "@ionic/angular";

@Component({
  selector: "app-tab2",
  templateUrl: "tab2.page.html",
  styleUrls: ["tab2.page.scss"],
})
export class tab2Page {
  prods = [];
  myInput = "";
  constructor(
    private apiService: ApiService,
    public globalService: GlobalService,
    private router: Router,
    public loadingController: LoadingController,
    private alertController: AlertController
  ) {}

  ngOnInit() {}

  ionViewWillEnter() {
  }

  getProduct() {
    this.apiService.searchProductByName(this.myInput).subscribe(async (e) => {
      const loading = await this.loadingController.create({
        mode: 'ios',
      });
      await loading.present().then(async() => {
        console.log(e)
        if (e["count"] === 0) { // product not found
          const alert = await this.alertController.create({
            header: 'Custplace',
            message: 'Produit non trouver! ',
            buttons: ['OK'],
            mode: 'ios'
          });
          await alert.present();
        } else {
          this.prods = e["products"];
        }
      });
      this.loadingController.dismiss();
    }, err => {
      console.log(err);
      this.loadingController.dismiss();
    })
  }

  showProduct(id) {
    this.globalService.codebar = id;
    this.router.navigateByUrl(`/tabs/tab1`);
  }
}
