import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VoiceActivityTableComponent } from './voice-activity-table.component';

describe('VoiceActivityTableComponent', () => {
  let component: VoiceActivityTableComponent;
  let fixture: ComponentFixture<VoiceActivityTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VoiceActivityTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VoiceActivityTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
