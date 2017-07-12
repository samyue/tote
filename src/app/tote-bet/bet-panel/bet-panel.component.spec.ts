import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BetPanelComponent } from './bet-panel.component';
import { SharedModule } from '../../shared/shared.module';
import { DividendService } from '../services/dividend.service';
import { WinCalService } from '../services/win-cal.service';
import { PlaceCalService } from '../services/place-cal.service';
import { ExactaCalService } from '../services/exacta-cal.service';

describe('BetPanelComponent', () => {
  let component: BetPanelComponent;
  let fixture: ComponentFixture<BetPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule
      ],
      declarations: [ BetPanelComponent ],
      providers: [DividendService, WinCalService, PlaceCalService, ExactaCalService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BetPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
