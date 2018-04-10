import { Component, OnInit, TemplateRef  } from '@angular/core';
import { OrderService } from '../order.service';

import { OrderAddComponent } from './../order-add/order-add.component';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';



@Component({
  selector: 'app-order-shop',
  templateUrl: './order-shop.component.html',
  styleUrls: ['./order-shop.component.scss']
})
export class OrderShopComponent implements OnInit {

  bsModalRef: BsModalRef;
  constructor(private OrderService: OrderService,private modalService: BsModalService) { }

  shopData;

  selectSHOP;


  ngOnInit() {
    this.getAllShop();
  }

  openModalWithComponent(NAME, shop) {
    const initialState = {
      shop: {
        NAME: NAME + "-" + shop.NAME,
        SHOP: shop
      },
      title: 'Modal with component'
    };
    this.bsModalRef = this.modalService.show(OrderAddComponent, {initialState});
  }

  getAllShop(){
    this.OrderService.getAllShop().subscribe((data)=>{
      this.shopData = data;
      this.getShopBranches();
    });
  }
  getShopBranches(){
    this.shopData.forEach(element => {
      this.OrderService.getShopInfoByShopID(element.ID).subscribe((data)=>{
        element.SHOP_BRANCHES = data;
      });
    });
  }

}
