import { Component, OnInit } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { GlobalService } from 'src/app/service/global.service';

const { Storage } = Plugins;
@Component({
  selector: 'app-tab5',
  templateUrl: './tab5.page.html',
  styleUrls: ['./tab5.page.scss'],
})
export class Tab5Page implements OnInit {
  favoris = [];
  image;
  skeleton

  constructor(
    private router: Router,
    public loadingController: LoadingController,
    public globalService: GlobalService
  ) {}

  ngOnInit() {} 

  async ionViewWillEnter() {
      this.getStorageData();
  }

  getStorageData() {
    Storage.get({ key: 'favoris' }).then((e) => {
      this.favoris = JSON.parse(e.value);

      this.favoris.forEach(produit => {
        if(produit.image.startsWith('/')){
          this.image = 'https://degrassi-crown-08212.herokuapp.com/images/products' + produit.image;
        }else {
          this.image = produit.image;
        }
      });
    });
  }

  showProduct(id) {
    this.globalService.codebar = id;
    this.router.navigateByUrl(`/tabs/tab1`);
  }

  removeProduct(id) {
    Storage.get({ key: 'favoris' }).then((e) => {
      var data = JSON.parse(e.value);

      for (var i = 0; i < data.length; i++) {
        var Val = data[i];

        if (Val.codebar === id) {
          data.splice(i, 1);
        }
      }

      Storage.set({
        key: 'favoris',
        value: JSON.stringify(data),
      })
        .then((res) => {
          console.log('data stored : ' + res);
        })
        .catch((err) => {
          console.log(err);
        });
        this.getStorageData();
    }).catch(err => {
      console.log(err);
    });
  }
}
