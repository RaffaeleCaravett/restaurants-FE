import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppComponent } from 'src/app/app.component';
import { OfficeComponent } from './office.component';
import { OfficeRoutingModule } from './office-routing.module';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
   OfficeComponent
  ],
  imports: [
    CommonModule,
    OfficeRoutingModule,
    ReactiveFormsModule
  ],
  providers: [

  ],
  bootstrap: [AppComponent]
})
export class OfficeModule { }
