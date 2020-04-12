import { Component } from "@angular/core";
import { ApiService } from "src/app/service/api.service";
import { Router } from "@angular/router";
import { GlobalService } from "src/app/service/global.service";
import { LoadingController } from "@ionic/angular";

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
    public loadingController: LoadingController
  ) {}

  ngOnInit() {}

  ionViewWillEnter() {
    
  }
  getProduct() {
    this.apiService.searchProductByName(this.myInput).subscribe(async (e) => {
      const loading = await this.loadingController.create();
      await loading.present().then(() => {
        this.prods = e["products"];
      });
      this.loadingController.dismiss();
    });
  }

  showProduct(id) {
    this.globalService.codebar = id;
    this.router.navigateByUrl(`/tabs/tab1`);
  }
}
