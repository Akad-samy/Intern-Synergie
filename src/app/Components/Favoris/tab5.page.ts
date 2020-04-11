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

  constructor(
    private router: Router,
    public loadingController: LoadingController,
    public globalService: GlobalService
  ) {}

  ngOnInit() {}

  async ionViewWillEnter() {
    const loading = await this.loadingController.create();
    await loading.present().then(() => {
      this.getStorageData();
    })
  }

  getStorageData() {
    Storage.get({ key: 'favoris' }).then((e) => {
      this.favoris = JSON.parse(e.value);
      console.log('favoris data: ' + e.value);
      if (this.loadingController.create()) {
        this.loadingController.dismiss();
      }
    });
  }

  showProduct(id) {
    this.globalService.codebar = id;
    console.log(this.globalService.codebar);
    this.router.navigateByUrl(`/tabs/tab1`);
  }

  removeProduct(id) {
    Storage.get({ key: 'favoris' }).then((e) => {
      var data = JSON.parse(e.value);
      console.log(data);

      for (var i = 0; i < data.length; i++) {
        var Val = data[i];
        console.error(Val);
        if (Val._id === id) {
          console.log('index is : ' + i);
          data.splice(i, 1);
        }
      }
      console.log(data)
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
    });
  }
}
