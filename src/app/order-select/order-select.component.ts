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

  step1 = true;
  step2 = false;

  //問卷資料
  shopInfo;
  questionInfoData;
  menu;
  id;

  //是否自填
  isChooseSelf = false;
  searchOptions;
  selectedMultipleOption = [];


  //冰塊
  optionsICE;
  selectedICEOption="";
  optionsSUGAR;
  selectedSUGAROption="";

  //儲存訂購資訊
  inputWho;
  inputNote;
  inputPW;
  selectItem;

  drinkItem;

  selectSugarDefault = false;

  ngOnInit() {
    this.getQuestionInfo();

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
        this.getIngredientData(this.questionInfoData.SHOP);
        this.getAmountData(this.questionInfoData.SHOP);
      }
    });
  }

  getShopInfo(shopID){
    this.OrderService.getShopInfo(shopID).subscribe((data)=>{
      this.getShopMenuType(data.MENU_ID);
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

  getIngredientData(shopID){
    this.OrderService.getIngredient(shopID).subscribe((data)=>{
      this.searchOptions = data;

    });
  }

  getAmountData(shopID){
    this.OrderService.getAmount(shopID,'ice').subscribe((data)=>{
      this.optionsICE = data;
    });
    this.OrderService.getAmount(shopID,'sugar').subscribe((data)=>{
      this.optionsSUGAR = data;
    });
  }

  //手機板隱藏全部
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
  //選擇飲料
  selectDrinkItem(item,itemSize,itemPrice){
    this.step1 = false;
    this.step2 = true;
    this.drinkItem = item.NAME + "(" + itemSize + ")";
    this.selectItem = item;
    this.selectItem.selectSize = itemSize;
    this.selectItem.selectPrice = itemPrice;
    if(item.SUGAR_DEFAULT){
      this.selectSugarDefault = true;
    }
  }


  //重新選擇飲料
  reOrderDrink(){
    this.step1 = true;
    this.step2 = false;
    this.selectedMultipleOption = [];
    this.selectSugarDefault = false;
    this.selectedICEOption="";
    this.selectedSUGAROption="";
    this.inputNote="";
  }


  // 檢查是否都填寫完畢
  checkOrder(){
    if(!this.selectedICEOption || (!this.selectedSUGAROption && !this.selectSugarDefault) || !this.inputWho || !this.inputPW){
      return true;
    } else {
      return false;
    }
  }

  //訂購飲料
  orderDrink(){

    let totalINGREDIENTPrice = 0;
    let totalINGREDIENTName = "";
    this.selectedMultipleOption.forEach(element => {
      let cutData = element.split(',');
      totalINGREDIENTPrice += parseInt(cutData[1]);
      totalINGREDIENTName += cutData[0] + ',';
    });

    if(this.selectedSUGAROption==''){
      this.selectedSUGAROption = '固定';
    }

    let orderData = {
      "ORDER_ID": this.QDrinkId,
      "NAME": this.inputWho,
      "PRICE": parseInt(this.selectItem.selectPrice) + totalINGREDIENTPrice,
      "NOTE": this.inputNote,
      "EDIT_PW": this.inputPW,
      "ITEM_ID": this.selectItem.ID,
      "SIZE":  this.selectItem.selectSize,
      "ICE": this.selectedICEOption,
      "SUGAR": this.selectedSUGAROption,
      "INGREDIENT": totalINGREDIENTName.substring(0, totalINGREDIENTName.length-1),
      "ITEM_NAME": this.selectItem.NAME
    }
    this.OrderService.addOrderItem(orderData).subscribe((data)=>{
      this.router.navigate(['/result/'+ this.QDrinkId]);
    });
    
  }

}
