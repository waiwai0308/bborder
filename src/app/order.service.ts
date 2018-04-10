import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
 
@Injectable()
export class OrderService {

  constructor(private http:Http) { }

  getOrderList(ID){
    return this.http.get('http://order.imjwz.com/api/ORDER_LIST/' + ID).map(data=>{
        return data.json();
    });
  }

  getShopInfo(ID){
    return this.http.get('http://order.imjwz.com/api/SHOP_INFO_LIST/' + ID).map(data=>{
        return data.json();
    });
  }

  getShopInfoByShopID(ID){
    return this.http.get('http://order.imjwz.com/api/SHOP_INFO_LIST?SHOP_ID=' + ID).map(data=>{
        return data.json();
    });
  }

  getShopName(ID){
    return this.http.get('http://order.imjwz.com/api/SHOP_LIST/' + ID).map(data=>{
        return data.json();
    });
  }

  getShopMenuType(ID){
    return this.http.get('http://order.imjwz.com/api/SHOP_MENU_TYPE?SHOP_ID=' + ID).map(data=>{
        return data.json();
    });
  }

  getShopMenuTypeItem(ID){
    return this.http.get('http://order.imjwz.com/api/SHOP_MENU_ITEM?TYPE_ID=' + ID).map(data=>{
        return data.json();
    });
  }


  getAllShop(){
    return this.http.get('http://order.imjwz.com/api/SHOP_LIST/').map(data=>{
        return data.json();
    });
  }

}
