import { Component, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { FormBuilder, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-order-add',
  templateUrl: './order-add.component.html',
  styleUrls: ['./order-add.component.scss']
})
export class OrderAddComponent implements OnInit {
  mytime: Date = new Date();

  title: string;
  shop;

  formData = {
    ID : '',
    EDIT_PW: '',
    NAME : '',
    SHOP : '',
    START_TIME : '',
    END_TIME : '',
    NOTE : ''
  };
  constructor(public bsModalRef: BsModalRef,fb: FormBuilder) { }

  ngOnInit() {
    this.formData.SHOP = this.shop.SHOP.ID;
  }


  submit() {
    console.log(this.mytime);
  }
}
