import { Component } from '@angular/core';
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner/ngx';
import { GlobalService } from 'src/app/service/global.service';
import { Router } from '@angular/router';
import { Tab1Page } from '../accueil/tab1.page';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
})
export class TabsPage {
  constructor(
    private barcodeScanner: BarcodeScanner,
    public globalService: GlobalService,
    private router: Router,
    private alertController: AlertController,
    private tab1: Tab1Page
  ) {}

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
