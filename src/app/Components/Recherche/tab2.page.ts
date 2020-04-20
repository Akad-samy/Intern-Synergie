import { Component } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/service/global.service';
import { LoadingController, AlertController } from '@ionic/angular';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  animations: [
    trigger('itemState', [
        transition('void => *', [
            style({transform: 'translateX(100%)'}),
            animate('500ms ease-out')
        ]),
        transition('* => void', [
            animate('500ms ease-in', style({transform: 'translateX(-100%)'}))
        ])
    ])
]
})

export class tab2Page {
  prods = [];
  myInput = '';
  constructor(
    private apiService: ApiService,
    public globalService: GlobalService,
    private router: Router,
    public loadingController: LoadingController,
    private alertController: AlertController
  ) {}

  async ngOnInit() {
    const loading = await this.loadingController.create({
      mode: 'ios',
    });
    await loading.present().then(() => {
      this.getProduct();
    }).catch((err) => {
      console.log(err)
    });
  }

  ionViewWillEnter() {
    // this.getProduct()
  }

  async getProduct() {
    if (this.myInput === undefined || this.myInput.match('.*\b[0-9]\b')){

      const alert = await this.alertController.create({
        header: 'Custplace',
        message: 'Veuiilez entrer le nom d\'un produit! ',
        buttons: ['OK'],
        mode: 'ios'
      });
      await alert.present();

    } else {
      this.apiService.searchProductByName(this.myInput).subscribe(async (e) => {
          // console.log(e)
          if (e['count'] === 0) {  // product not found
            const alert = await this.alertController.create({
              header: 'Custplace',
              message: 'Produit non trouver! ',
              buttons: ['OK'],
              mode: 'ios'
            });
            await alert.present();
          } else {
            this.prods = e['products'];
          }
          console.log(this.prods)
          this.loadingController.dismiss();
          this.myInput = '';
      }, err => {
        console.log(err);
        this.loadingController.dismiss();
      })
    }
  }

  showProduct(id) {
    this.globalService.codebar = id;
    this.router.navigateByUrl(`/tabs/tab1`);
  }
}
