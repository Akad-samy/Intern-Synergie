import { Component } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { GlobalService } from 'src/app/service/global.service';
import { Plugins } from '@capacitor/core';
import { LoadingController, AlertController } from '@ionic/angular';
import { BarcodeScannerOptions, BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { Router } from '@angular/router';

const { Storage } = Plugins;
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {
  // codeBar = '3600541982109'; // 3116430208941 // 3045140105502  // 7622210204424
  prod = '';
  inFavoris = false;
  danger = 'var(--ion-color-danger)';
  medium = 'var(--ion-color-medium)';

  constructor(
    private apiService: ApiService,
    public globalService: GlobalService,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private barcodeScanner: BarcodeScanner,
    private router: Router,
  ) {}

  async ionViewWillEnter() {
    const loading = await this.loadingController.create({
      mode: 'ios',
    });
    await loading.present().then(() => {
      this.getProduct();
      this.checkProdInFavoris();
    });
  }

  // get product from codebar

  getProduct() {
    this.apiService.getData(this.globalService.codebar).subscribe(
      async (e) => {
        console.log(e)
        if (e['status_verbose'] === "product not found") { // product not found
          this.router.navigateByUrl(`/tabs/tab1`);
          const alert = await this.alertController.create({
            header: 'Custplace',
            message: 'Produit non trouver! ',
            buttons: ['OK'],
            mode: 'ios',
          });
          await alert.present();
        }
        if(e['code'] !== null) { // a default product with code = null, shows
          this.prod = e['product'];
          this.setStorageData(); // set in History
        }
        this.loadingController.dismiss();
      },
      (err) => {
        console.log(err);
        this.loadingController.dismiss();
      }
    );
  }

  setStorageData() {
    // get data from storage

    Storage.get({ key: 'historique' })
      .then((e) => {
        var data = JSON.parse(e.value);
        if (data === null) { //if no data exist in history
          data = [this.prod];
        } else {
          data.unshift(this.prod);
        }

        // Remove duplicated products

        this.globalService.historique = data.reduce((acc, current) => {
          const x = acc.find((item) => item._id === current._id);
          if (!x) {
            return acc.concat([current]);
          } else {
            return acc;
          }
        }, []);

        // set data to storage

        Storage.set({
          key: 'historique',
          value: JSON.stringify(this.globalService.historique),
        })
          .then((res) => {
            console.log('data stored : ' + res);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
        this.loadingController.dismiss();
      });
  }

  addFavoris() {
    Storage.get({ key: 'favoris' })
      .then((e) => {
        var data = JSON.parse(e.value);
        if (data === null) {
          data = [this.prod];
        } else {
          data.unshift(this.prod);
        }

        // Remove duplicated products

        this.globalService.favoris = data.reduce((acc, current) => {
          const x = acc.find((item) => item._id === current._id);
          if (!x) {
            return acc.concat([current]);
          } else {
            return acc;
          }
        }, []);

        // set data to storage

        Storage.set({
          key: 'favoris',
          value: JSON.stringify(this.globalService.favoris),
        })
          .then((res) => {
            console.log('data stored : ' + res);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
        this.loadingController.dismiss();
      });
    this.inFavoris = true;
  }

  checkProdInFavoris() {
    Storage.get({ key: 'favoris' })
      .then((e) => {
        const data = JSON.parse(e.value);
        if (data == null) {
          return;
        }
        this.inFavoris = data.filter(prod => prod._id === this.globalService.codebar).length > 0;
      })
      .catch((err) => {
        console.log(err);
      })
  }

  searchCodebar() {
    const options: BarcodeScannerOptions = {
      prompt: 'Encadrez un code barres avec le viseur pour le balayer',
    };

    this.barcodeScanner
      .scan(options)
      .then((barcodeData) => {
        this.globalService.codebar = barcodeData.text;
      })
      .catch((err) => {
        console.log('Error', err);
      });
  }
}
