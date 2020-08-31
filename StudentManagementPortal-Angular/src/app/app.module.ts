import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FormsModule } from '@angular/forms';
import {InputTextModule} from 'primeng/inputtext';
import {TabMenuModule} from 'primeng/tabmenu';
import {Studentservice} from './student.service';
import { HttpClientModule } from '@angular/common/http';
import {TableModule} from 'primeng/table';
import {CardModule} from 'primeng/card';
import {ButtonModule} from 'primeng/button';
import {TabViewModule} from 'primeng/tabview';
import {ToastModule} from 'primeng/toast';
import { MessageService } from 'primeng/api';
import {DropdownModule} from 'primeng/dropdown';
import {FieldsetModule} from 'primeng/fieldset';
import {DialogModule} from 'primeng/dialog';
import { NgxSpinnerModule } from "ngx-spinner";
import { NgxSpinnerService } from "ngx-spinner";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    HttpClientModule,
    FormsModule,
    InputTextModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    TabMenuModule,
    TableModule,
    CardModule,
    ButtonModule,
    TabViewModule,
    ToastModule,
    DropdownModule,
    FieldsetModule,
    DialogModule,
    NgxSpinnerModule
  ],
  providers: [Studentservice, MessageService, NgxSpinnerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
