import { NgModule } from '@angular/core';
import { ToteBetRoutingModule } from './tote-bet-routing.module';
import { BetPanelComponent } from './bet-panel/bet-panel.component';
import { SharedModule } from '../shared/shared.module';
import { DividendService } from './services/dividend.service';
import { WinCalService } from './services/win-cal.service';
import { PlaceCalService } from './services/place-cal.service';
import { ExactaCalService } from './services/exacta-cal.service';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ToteBetRoutingModule
  ],
  declarations: [BetPanelComponent],
  providers: [
      DividendService,
      WinCalService,
      PlaceCalService,
      ExactaCalService

  ]
})
export class ToteBetModule { }
