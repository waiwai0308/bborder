import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  QDrinkId='';
  constructor() { }

  panels = [
    {
      active: false,
      disabled: false,
      name: '要如何新增菜單？',
      content: '很抱歉！目前暫不提供新增菜單的功能，若您有需要新增菜單請洽Webb或來信詢問。'
    },
    {
      active: false,
      disabled: true,
      name: '訂購密碼是什麼？',
      content: '如果你訂購後想要刪除或是後悔訂購，則您需要透過該組密碼來刪除，一來也是為了防止他人誤刪您的訂單。'
    },
    {
      active: false,
      disabled: false,
      name: '要如何新增新的飲料訂購單？',
      content: '直接點選上方的訂購飲料，並選擇要訂購的店家，輸入相關資訊，送出後會獲得一組網址，再將該網址貼給大家，就可以開始訂購了，請注意！該網址只有在當下會提供，離開後並不提供查詢'
    },
    {
      active: false,
      disabled: false,
      name: '要如何知道訂購明細？',
      content: '目前無法透過其他查詢方式，唯獨透過專屬的訂飲料網址時，直接點選上方選單訂購統計，即可查看。'
    }
  ];

  ngOnInit() {
  }

}
