import { Router } from '@angular/router';
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner/ngx';
import { AlertController } from '@ionic/angular';
import { GlobalService } from './../../service/global.service';
import { ApiService } from './../../service/api.service';
import { Component, OnInit } from "@angular/core";
import { Plugins } from "@capacitor/core";

@Component({
  selector: "app-tab5",
  templateUrl: "./tab3.page.html",
  styleUrls: ["./tab3.page.scss"],
})
export class Tab3Page implements OnInit {
  constructor(
    private apiService: ApiService,
    public globalService: GlobalService,
    private alertController: AlertController,
    private barcodeScanner: BarcodeScanner,
    private router: Router
  ) {}

  ngOnInit() {}
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
