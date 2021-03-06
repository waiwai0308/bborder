import { Component, OnInit, TemplateRef, Output  } from '@angular/core';
import { OrderService } from '../order.service';

import { OrderAddComponent } from './../order-add/order-add.component';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { NgForm, FormGroup, FormControl, Validators, FormBuilder } from "@angular/forms";

import { Router, ActivatedRoute, Params,NavigationEnd } from '@angular/router';
@Component({
  selector: 'app-order-shop',
  templateUrl: './order-shop.component.html',
  styleUrls: ['./order-shop.component.scss']
})
export class OrderShopComponent implements OnInit {

  QDrinkId='';

  modalRef: BsModalRef;
  modalRef2: BsModalRef;

  orderData: FormGroup;

  shopData;

  selectSHOP;

  DISPLAYNAME;
  
  now = new Date();

  orderURL='';

  navigationSubscription;
  constructor(private OrderService: OrderService,private modalService: BsModalService,private fb: FormBuilder,public router: Router) { 
    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      // If it is a NavigationEnd event re-initalise the component
      if (e instanceof NavigationEnd) {
        this.initialiseInvites();
      }
    });
    this.orderData = this.fb.group({
      EDIT_PW: ['', Validators.required],
      NAME: ['', Validators.required],
      SHOP: [''],
      START_TIME: [new Date(), Validators.required],
      END_TIME: [new Date(this.now.getTime() + (2*1000*60*60)), Validators.required],
      NOTE: [''],
      STATUS : ['OPEN']
    });

  }

  showSuccessed = false;
  showOrderID;

  showSuccess = false;

  initialiseInvites() {

    this.showSuccessed = false;
    this.showSuccess = false;
    this.orderData.value.EDIT_PW = "";
    this.orderData.value.NAME = "";
    this.orderData.value.START_TIME = new Date();
    this.orderData.value.END_TIME = new Date(this.orderData.value.START_TIME.getTime() + (2*1000*60*60));
    this.orderData.value.NOTE = "";
  }

  ngOnDestroy() {
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }
  }

  ngOnInit() {
    this.getAllShop();
  }

  openModalWithComponent(template,name,shop) {
    this.DISPLAYNAME = name + '-' + shop.NAME;
    this.selectSHOP = shop.ID;
    this.modalRef = this.modalService.show(template);
  }

  submit(){

    this.orderData.value.SHOP = this.selectSHOP;
    this.orderData.value.END_TIME = new Date(this.orderData.value.END_TIME.getTime() + (8*1000*60*60));
    this.orderData.value.START_TIME = new Date(this.orderData.value.START_TIME.getTime() + (8*1000*60*60));
    this.OrderService.addOrderList(this.orderData.value).subscribe((data)=>{
    this.showOrderID = data.ID;
    this.orderURL = 'http://order.imjwz.com/order/'+data.ID;
    this.showSuccessed = true;
    });

    this.modalRef.hide();
    this.orderData.value.EDIT_PW = "";
    this.orderData.value.NAME = "";
    this.orderData.value.START_TIME = new Date();
    this.orderData.value.END_TIME = new Date(this.orderData.value.START_TIME.getTime() + (2*1000*60*60));
    this.orderData.value.NOTE = "";


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

  successFun(){
    this.showSuccess = true;
  }

}
