import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ScrollingModule } from '@angular/cdk/scrolling';

import { AppComponent } from './app.component';
import { MainComponent } from './components/main/main.component';
import { CheckboxComponent } from './components/common/checkbox/checkbox.component';
import { SelectComponent } from './components/common/select/select.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    CheckboxComponent,
    SelectComponent,
  ],
  imports: [
    BrowserModule,
    ScrollingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
