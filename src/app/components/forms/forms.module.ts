import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppComponent } from 'src/app/app.component';
import { FormsComponent } from './forms.component';
import { FormsRoutingModule } from './forms-routing.module';



@NgModule({
  declarations: [
   FormsComponent
  ],
  imports: [
    CommonModule,
    FormsRoutingModule
  ],
  providers: [

  ],
  bootstrap: [AppComponent]
})
export class FormsModule { }
