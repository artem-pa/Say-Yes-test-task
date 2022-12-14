import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MainComponent } from './components/main/main.component';
import { CheckboxComponent } from './components/common/checkbox/checkbox.component';
import { SelectComponent } from './components/common/select/select.component';
import { DatepickerComponent } from './components/common/datepicker/datepicker.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    CheckboxComponent,
    SelectComponent,
    DatepickerComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
