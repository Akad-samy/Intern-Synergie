import { Component } from '@angular/core';
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner/ngx';
import { GlobalService } from 'src/app/service/global.service';
import { Router } from '@angular/router';
import { Tab1Page } from '../accueil/tab1.page';

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
    private tab1: Tab1Page
  ) {}

  searchCodebar() {
    const options: BarcodeScannerOptions = {
      prompt: 'Encadrez un code barres avec le viseur pour le balayer',
    };

    this.barcodeScanner
      .scan(options)
      .then((barcodeData) => {
        this.globalService.codebar = barcodeData.text;
        console.log('scan: ' + this.globalService.codebar);
        if(this.router.url === "/tabs/tab1") {
          // this.router.navigated = false;
          this.tab1.ngOnInit();
        } else {
          this.router.navigateByUrl(`/tabs/tab1`);
        }
        
      })
      .catch((err) => {
        console.log('Error', err);
      });
  }
}
