import { GlobalService } from 'src/app/service/global.service';
import { Component, OnInit } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { Router } from '@angular/router';
import { LoadingController, AlertController } from '@ionic/angular';

const { Storage } = Plugins;

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {
  data = [];
  skeleton ;
  image;

  constructor(
    public globalService: GlobalService,
    private router: Router,
    public loadingController: LoadingController,
    public alertController: AlertController
  ) {}

  ngOnInit() {
    this.getStorageData();
  }

  async ionViewWillEnter() {
    // const loading = await this.loadingController.create({
    //   mode: 'ios',
    // });
    // await loading.present().then(() => {
    //   this.getStorageData();
    // });
  }

  getStorageData() {
    this.skeleton = true;
    Storage.get({ key: 'historique' }).then((e) => {
      this.skeleton = false;
      this.data = JSON.parse(e.value);
      this.data.forEach(produit => {
        if(produit.image.startsWith('/')){
          this.image = 'https://degrassi-crown-08212.herokuapp.com/images/products' + produit.image;
        }else {
          this.image = produit.image;
        }
      });
      this.loadingController.dismiss();
    }).catch(err => {
      this.skeleton = false;
      console.log(err);
      this.loadingController.dismiss();
    });
  }

  async clearStorage() {
    const alert = await this.alertController.create({
      header: 'Confirmation!',
      message: 'Etes-vous sûr de vouloir supprimer l\'historique ?',
      buttons: [
        {
          text: 'Non',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          },
        },
        {
          text: 'Oui',
          handler: () => {
            Storage.remove({ key: 'historique' });
            this.getStorageData();
          },
        },
      ],
    });

    await alert.present();
  }

  showProduct(id) {
    this.globalService.codebar = id;
    this.router.navigateByUrl(`/tabs/tab1`);
  }
}
