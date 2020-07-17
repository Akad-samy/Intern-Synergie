import { ReviewsComponent } from "./../reviews/reviews.component";
import { Component } from "@angular/core";
import { ApiService } from "src/app/service/api.service";
import { GlobalService } from "src/app/service/global.service";
import { Plugins } from "@capacitor/core";
import {
  LoadingController,
  AlertController,
  NavController,
} from "@ionic/angular";
import {
  BarcodeScannerOptions,
  BarcodeScanner,
} from "@ionic-native/barcode-scanner/ngx";
import { Router } from "@angular/router";

const { Storage } = Plugins;
@Component({
  selector: "app-tab1",
  templateUrl: "tab1.page.html",
  styleUrls: ["tab1.page.scss"],
})
export class Tab1Page {
  // codeBar = '3600541982109'; // 3116430208941 // 3045140105502  // 7622210204424
  data = "";
  image = "";
  inFavoris = false;
  danger = "var(--ion-color-danger)";
  medium = "var(--ion-color-medium)";
  skeleton;

  constructor(
    private apiService: ApiService,
    public globalService: GlobalService,
    private alertController: AlertController,
    private barcodeScanner: BarcodeScanner,
    private router: Router,
    private navCtrl: NavController
  ) {
  }
  ngOnInit() {
    this.getProduct();
    this.checkProdInFavoris();
  }

  ionViewWillEnter() {
    this.getProduct();
    this.checkProdInFavoris();
  }
  // ionViewDidEnter() {
  //   this.getProduct();
  //   this.checkProdInFavoris();
  //   console.log("code: " + this.globalService.codebar);
  // }

  // get product from codebar

  getProduct() {
    this.skeleton = true;
    this.apiService.dataByBarcode(this.globalService.codebar).subscribe(
      async (e) => {
        console.log('code: ' + this.globalService.codebar)
        this.skeleton = false;
        console.log(e);
        if (e['status'] === 1) {
          // product is found

          this.data = e["data"];

          // if(e['data'].image.startsWith('/')){ // image
          //   this.image = 'https://degrassi-crown-08212.herokuapp.com/images/products' + e['data'].image;
          // }else {
          //   this.image = e['data'].image;
          // }

          this.setStorageData(); // set in History
        } else {
          // product not found
          this.router.navigateByUrl(`/tabs/tab1`);
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
        this.skeleton = false;
      }
    );
  }

  setStorageData() {
    // get data from storage

    Storage.get({ key: "historique" })
      .then((e) => {
        var historique = JSON.parse(e.value);
        if (historique === null) {
          //if no data exist in history
          historique = [this.data];
        } else {
          historique.unshift(this.data);
        }

        // Remove duplicated products

        this.globalService.historique = historique.reduce((acc, current) => {
          const x = acc.find((item) => item.codebar === current.codebar);
          if (!x) {
            return acc.concat([current]);
          } else {
            return acc;
          }
        }, []);

        // set data to storage

        Storage.set({
          key: "historique",
          value: JSON.stringify(this.globalService.historique),
        })
          .then((res) => {
            console.log("data stored : " + res);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  addFavoris() {
    Storage.get({ key: "favoris" })
      .then((e) => {
        var favoris = JSON.parse(e.value);
        if (favoris === null) {
          favoris = [this.data];
        } else {
          favoris.unshift(this.data);
        }
        console.log(favoris);
        // Remove duplicated products

        this.globalService.favoris = favoris.reduce((acc, current) => {
          const x = acc.find((item) => item.codebar === current.codebar);
          if (!x) {
            return acc.concat([current]);
          } else {
            return acc;
          }
        }, []);

        // set data to storage

        Storage.set({
          key: "favoris",
          value: JSON.stringify(this.globalService.favoris),
        })
          .then((res) => {
            console.log("data stored : " + res);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
    this.inFavoris = true;
  }

  checkProdInFavoris() {
    Storage.get({ key: "favoris" })
      .then((e) => {
        const favoris = JSON.parse(e.value);
        if (favoris == null) {
          return;
        }
        this.inFavoris =
          favoris.filter((prod) => prod.codebar === this.globalService.codebar)
            .length > 0;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  searchCodebar() {
    
    this.router.navigateByUrl(`/tabs/tab3`);

    console.log(this.router.url)
    const options: BarcodeScannerOptions = {
      prompt: 'Encadrez un code barres avec le viseur pour le balayer',
    };

    this.barcodeScanner
      .scan(options)
      .then(async (barcodeData) => {
        this.globalService.codebar = barcodeData.text;
        this.router.navigateByUrl(`/tabs/tab1`);

        // if(this.router.url === "/tabs/tab1") {
        //   console.log('Im in .....');
        //   // this.router.navigated = false;;
        // } else {
        //   this.router.navigateByUrl(`/tabs/tab1`);
        // }
      })
      .catch((err) => {
        console.log('Error', err);
      });
  }

}
