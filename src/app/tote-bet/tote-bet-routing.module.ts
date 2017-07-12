import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BetPanelComponent } from './bet-panel/bet-panel.component';

const routes: Routes = [
  {
    path: 'tote-bet',
    component: BetPanelComponent,
    canActivate: []
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ToteBetRoutingModule { }
