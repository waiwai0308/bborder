import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IndexComponent } from './index/index.component';
import { OrderSelectComponent } from './order-select/order-select.component';
import { OrderShopComponent } from './order-shop/order-shop.component';
import { OrderResultComponent } from './order-result/order-result.component';
const routes: Routes = [
  { path: 'shop', component: OrderShopComponent },
  { path: 'result/:id', component: OrderResultComponent },
  { path: 'result', component: OrderResultComponent },
  { path: 'order/:id', component: OrderSelectComponent },
  { path: '', redirectTo: '', pathMatch: 'full', component: IndexComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
