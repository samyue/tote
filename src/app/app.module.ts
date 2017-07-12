import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ToteBetModule } from './tote-bet/tote-bet.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ToteBetModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
