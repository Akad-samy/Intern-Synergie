import { Component, AfterViewInit, ElementRef, Renderer2 } from '@angular/core';
import { GestureController } from '@ionic/angular';
import { Gesture, GestureConfig } from '@ionic/core';
import { GlobalService } from 'src/app/service/global.service';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss'],
})
export class ReviewsComponent implements AfterViewInit {
  constructor(
    private gestureCtrl: GestureController,
    private element: ElementRef,
    private renderer: Renderer2,
    private gService: GlobalService,
  ) {}

  async ngAfterViewInit() {
    const options: GestureConfig = {
      el: this.element.nativeElement,
      direction: 'y',
      gestureName: 'swipe-up',
      onStart: () => {
        this.renderer.setStyle(
          this.element.nativeElement,
          'transition',
          'none'
        );
      },
      onMove: (ev) => {
        if (ev.deltaY < 0) {
          this.renderer.setStyle(
            this.element.nativeElement,
            'transform',
            `translateY(${ev.deltaY}px)`
          );
        }
      },
      onEnd: (ev) => {
        this.gService.hideImgs = true;

        console.log(this.gService.hideImgs)

        this.renderer.setStyle(
          this.element.nativeElement,
          'transition',
          '0.3s ease-out'
        );

        if (ev.deltaY < -200) {
          this.renderer.setStyle(
            this.element.nativeElement,
            'transform',
            `translateY(-200px)`
          );
        } else {
          this.renderer.setStyle(
            this.element.nativeElement,
            'transform',
            `translateY(0px)`
          );
        }
      },
    };

    const gesture = await this.gestureCtrl.create(options);
    gesture.enable();
  }
}
