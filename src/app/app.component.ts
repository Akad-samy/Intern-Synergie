import { Router } from "@angular/router";
import { Component, ViewChildren, QueryList } from "@angular/core";

import { Platform, NavController, IonRouterOutlet, AlertController } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";

@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"],
})
export class AppComponent {
  lastTimeBackPress = 0;
  timePeriodToExit = 2000;
  @ViewChildren(IonRouterOutlet) routerOutlets: QueryList<IonRouterOutlet>;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    private alertController: AlertController
  ) {
    this.initializeApp();
    this.backButtonEvent();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  backButtonEvent() {
    this.platform.ready().then(() => {
      document.addEventListener("backbutton", async() => {
        if (this.router.url != "/tabs/tab1") {
          await this.router.navigate(["/tabs/tab1"]);
        } else if (this.router.url === "/tabs/tab1") {
          if (
            new Date().getTime() - this.lastTimeBackPress >=
            this.timePeriodToExit
          ) {
            this.lastTimeBackPress = new Date().getTime();
            this.presentAlertConfirm();
          } else {
            navigator["app"].exitApp();
          }
        }
      });
    });
    // this.platform.backButton.subscribeWithPriority(0, () => {
    //   this.routerOutlets.forEach(async (outlet: IonRouterOutlet) => {
    //     if (this.router.url != "/tabs/tab1") {
    //       await this.router.navigate(["/tabs/tab1"]);
    //     } else if (this.router.url === "/tabs/tab1") {
    //       if (
    //         new Date().getTime() - this.lastTimeBackPress >=
    //         this.timePeriodToExit
    //       ) {
    //         this.lastTimeBackPress = new Date().getTime();
    //         this.presentAlertConfirm();
    //       } else {
    //         navigator["app"].exitApp();
    //       }
    //     }
    //   });
    // });
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      // header: 'Confirm!',
      message: "Voulez Vous vraiment quitter Custplace ?",
      buttons: [
        {
          text: "Non",
          role: "cancel",
          cssClass: "secondary",
          handler: (blah) => {},
        },
        {
          text: "Oui",
          handler: () => {
            navigator["app"].exitApp();
          },
        },
      ],
    });

    await alert.present();
  }
}
