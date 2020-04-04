import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { tab2Page } from './tab2.page';

describe('tab2Page', () => {
  let component: tab2Page;
  let fixture: ComponentFixture<tab2Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [tab2Page],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(tab2Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
