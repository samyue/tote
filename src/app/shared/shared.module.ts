import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ToteDividendPipe } from './pipes/tote-dividend.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [ToteDividendPipe],
  providers: [CurrencyPipe],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    ToteDividendPipe,
  ]
})
export class SharedModule { }
