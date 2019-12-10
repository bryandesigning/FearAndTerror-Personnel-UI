import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChannelMessageGraphComponent } from './channel-message-graph.component';

describe('ChannelMessageGraphComponent', () => {
  let component: ChannelMessageGraphComponent;
  let fixture: ComponentFixture<ChannelMessageGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChannelMessageGraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChannelMessageGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
