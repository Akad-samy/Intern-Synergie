import { Component } from '@angular/core';
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner/ngx';
import { GlobalService } from 'src/app/service/global.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
})
export class TabsPage {
  constructor(
    private barcodeScanner: BarcodeScanner,
    public globalService: GlobalService,
  ) {}

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
