import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Headers } from '@angular/http';
@Injectable()
export class OrderService {

  constructor(private http:Http) { }
  
  apiUrl = "http://order.imjwz.com/";

  getOrderList(ID){
    return this.http.get(this.apiUrl + 'api/ORDER_LIST?ORDER_ID=' + ID).map(data=>{
        return data.json();
    });
  }

  getShopInfo(ID){
    return this.http.get(this.apiUrl + 'api/SHOP_INFO_LIST/' + ID).map(data=>{
        return data.json();
    });
  }

  getShopInfoByShopID(ID){
    return this.http.get(this.apiUrl + 'api/SHOP_INFO_LIST?SHOP_ID=' + ID).map(data=>{
        return data.json();
    });
  }

  getShopName(ID){
    return this.http.get(this.apiUrl + 'api/SHOP_LIST/' + ID).map(data=>{
        return data.json();
    });
  }

  getShopMenuType(ID){
    return this.http.get(this.apiUrl + 'api/SHOP_MENU_TYPE?SHOP_ID=' + ID).map(data=>{
        return data.json();
    });
  }

  getShopMenuTypeItem(ID){
    return this.http.get(this.apiUrl + 'api/SHOP_MENU_ITEM?TYPE_ID=' + ID).map(data=>{
        return data.json();
    });
  }


  getAllShop(){
    return this.http.get(this.apiUrl + 'api/SHOP_LIST/').map(data=>{
        return data.json();
    });
  }

  addOrderList(data){
    return this.http.post(this.apiUrl + 'api/ORDER_LIST', data).map(data=>{
        return data.json();
    });

  }

  /** 取的加料 */
  getIngredient(ID){
    return this.http.get(this.apiUrl + 'api/SHOP_MENU_INGREDIENT?SHOP_ID=' + ID).map(data=>{
        return data.json();
    });
  }
  
  /** 冰塊甜度 */
  getAmount(ID,TYPE){
    return this.http.get(this.apiUrl + 'api/SHOP_MENU_AMOUNT?SHOP_ID='+ID+'&TYPE='+TYPE).map(data=>{
        return data.json();
    });
  }
  
}
