import { Component } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';


@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  codebar;
  constructor(private barcodeScanner: BarcodeScanner) {}

  searchCodebar() {
    this.barcodeScanner.scan().then(barcodeData => {
      this.codebar = barcodeData.text;
      console.log(this.codebar);
     }).catch(err => {
         console.log('Error', err);
     });
  }

}
