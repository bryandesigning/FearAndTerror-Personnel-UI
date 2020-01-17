import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SteamProfileComponent } from './steam-profile.component';

describe('SteamProfileComponent', () => {
  let component: SteamProfileComponent;
  let fixture: ComponentFixture<SteamProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SteamProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SteamProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
