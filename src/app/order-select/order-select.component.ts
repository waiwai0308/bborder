import { Component, OnInit } from '@angular/core';
import { OrderService } from '../order.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

declare let $:any;
@Component({
  selector: 'app-order-select',
  templateUrl: './order-select.component.html',
  styleUrls: ['./order-select.component.scss']
})
export class OrderSelectComponent implements OnInit {


  QDrinkId;
  subscribeQ;

  constructor(private OrderService: OrderService,private route: ActivatedRoute,public router: Router,private activatedRoute:ActivatedRoute) { 
    this.QDrinkId = this.route.snapshot.paramMap.get('id');
    this.subscribeQ =  this.activatedRoute.queryParams.subscribe((params)=>{
      console.log(params,params['keyID']);
});
  }

  //問卷資料
  shopInfo;
  questionInfoData;
  menu;
  id;

  //是否自填
  isChooseSelf = false;
  searchOptions;
  selectedMultipleOption;

  options = [];
  selectedOption;
  ngOnInit() {
    this.getQuestionInfo();
    setTimeout(_ => {
      this.options = [
        { value: 'jack', label: 'Jack' },
        { value: 'lucy', label: 'Lucy' },
        { value: 'disabled', label: 'Disabled', disabled: true }
      ];
      this.selectedOption = this.options[ 0 ];
    }, 100);
    /*模拟服务器异步加载*/
    this.selectedMultipleOption = [ 'tom', 'jack' ];
    setTimeout(_ => {
      this.searchOptions = [
        { value: 'jack', label: '杰克' },
        { value: 'lucy', label: '露西' },
        { value: 'tom', label: '汤姆' }
      ];
    }, 300);
    setTimeout(_ => {
      this.selectedMultipleOption = [ 'tom' ];
    }, 1000);
  }

  chooseSelf(){
    this.isChooseSelf = !this.isChooseSelf;
  }
  

  getQuestionInfo(){
    this.OrderService.getOrderList(this.QDrinkId).subscribe((data)=>{
      if(data.length == 0){
        this.router.navigate(['']);
      }else{
        this.questionInfoData = data[0];
        this.getShopInfo(this.questionInfoData.SHOP);
      }
    });
  }

  getShopInfo(shopID){
    this.OrderService.getShopInfo(shopID).subscribe((data)=>{
      this.getShopMenuType(data.ID);
      this.getShopName(data,data.SHOP_ID);
    });
  }

  getShopName(shopInfo,shopID){
    this.OrderService.getShopName(shopID).subscribe((data)=>{
      this.shopInfo = shopInfo;
      this.shopInfo.SHOP_NAME = data.NAME + "-" + shopInfo.NAME;
    });
  }

  getShopMenuType(shopID){
    this.OrderService.getShopMenuType(shopID).subscribe((data)=>{
      this.menu = data;
      this.getShopMenuTypeItem();
    });
  }

  getShopMenuTypeItem(){
    this.menu.forEach(element => {
      this.OrderService.getShopMenuTypeItem(element.ID).subscribe((data)=>{
        element.ITEM = data;
        delete element.SHOP_ID;
      });
    });
  }

  openMenu(dom){
    if($(window).width() > 767){
      if($(dom).css('display') == 'none'){
        $(dom).removeAttr('style');
        return;
      }else{
        return;
      }
    }
    $(dom).fadeToggle();
  }

  selectDrinkItem(itemID,itemSize,itemName){
    console.log(itemID,itemSize,itemName)
  }

}
