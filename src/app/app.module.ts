import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module'
import { OrderService } from './order.service';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { OrderSelectComponent } from './order-select/order-select.component';

import { HttpClientModule } from '@angular/common/http'
import { HttpModule } from '@angular/http';
import { OrderShopComponent } from './order-shop/order-shop.component';
import { IndexComponent } from './index/index.component';

import { ModalModule } from 'ngx-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OrderAddComponent } from './order-add/order-add.component';
import { TimepickerModule } from 'ngx-bootstrap';
import {ClipboardModule} from 'ngx-clipboard';
import { OrderStatisticsComponent } from './order-statistics/order-statistics.component';

import { NgZorroAntdModule } from 'ng-zorro-antd';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    OrderSelectComponent,
    OrderShopComponent,
    IndexComponent,
    OrderAddComponent,
    OrderStatisticsComponent
  ],
  imports: [
    HttpModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    ModalModule.forRoot(),
    TimepickerModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ClipboardModule,
    
    NgZorroAntdModule.forRoot()
  ],
  entryComponents: [
    OrderAddComponent
  ],
  providers: [OrderService],
  bootstrap: [AppComponent]
})
export class AppModule { }
