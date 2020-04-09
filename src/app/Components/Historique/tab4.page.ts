import { GlobalService } from 'src/app/service/global.service';
import { Component, OnInit } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { Router } from '@angular/router';

const { Storage } = Plugins;

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {
  data = [];

  constructor(public globalService: GlobalService, private router: Router) {}

  ngOnInit() {
    // this.getStorageData();
  }


  ionViewWillEnter() {
    this.getStorageData();
  }

  getStorageData() {
    Storage.get({ key: 'historique' }).then((e) => {
      this.data = JSON.parse(e.value);
      console.log('historique data: ' + e.value);
    });
  }

  clearStorage() {
    localStorage.removeItem('_cap_historique');
    this.getStorageData()
  }

  showProduct(id) {
    this.globalService.codebar = id;
    console.log(this.globalService.codebar)
    this.router.navigateByUrl(`/tabs/tab1`)
  }
}
