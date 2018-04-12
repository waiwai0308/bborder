import { Component, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { OrderService } from '../order.service';
import { FormBuilder, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-order-add',
  templateUrl: './order-add.component.html',
  styleUrls: ['./order-add.component.scss']
})
export class OrderAddComponent implements OnInit {
  ismeridian: boolean = false;

  DISPLAYNAME;
  EDIT_PW;
  NAME;
  SHOP;
  START_TIME: Date = new Date();
  END_TIME: Date = new Date();
  NOTE;


  constructor(private OrderService: OrderService,public bsModalRef: BsModalRef, fb: FormBuilder) { }

  ngOnInit() {

  }

  submit() {
      let formData = {
        'EDIT_PW': this.EDIT_PW,
        'NAME': this.NAME,
        'SHOP': this.SHOP.ID,
        'START_TIME': this.START_TIME,
        'END_TIME': this.END_TIME,
        'STATUS': 'OPEN',
        'NOTE': this.NOTE
      };
      console.log(formData);
      this.OrderService.addOrderList(formData).subscribe((data)=>{
        console.log(data);
      });

  }
}
