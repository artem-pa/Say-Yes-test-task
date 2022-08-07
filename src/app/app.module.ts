import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MainComponent } from './components/main/main.component';
import { CheckboxComponent } from './components/common/checkbox/checkbox.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    CheckboxComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
