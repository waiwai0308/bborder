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
      content: '很抱歉！目前暫不提供線上新增菜單的功能，若您有需要新增菜單可以自行先利用下面excel整理好傳送給webb即可。下載:<a href="http://order.imjwz.com/飲料匯入格式.xlsx">飲料匯入格式</a>'
    },
    {
      active: false,
      disabled: false,
      name: '要如何跟單？',
      content: '直接去統計頁面按下 學我 輸入你是誰跟刪除密碼就可以加訂了！'
    },
    {
      active: false,
      disabled: false,
      name: '為什麼沒有我想要喝的選項？',
      content: '基本上所有飲料選項都是在菜單裡面出現的，如果是隱藏版或客製化飲料，暫時沒有方法可以調整或自行輸入'
    },
    {
      active: false,
      disabled: false,
      name: '為什麼金額統計會不同？',
      content: '基本上是根據店家提供的飲料跟菜單加料的價格下去做統計，每一家飲料店的規格又都不一致，有些店家某些飲品可以免費加料等等...所以系統沒有辦法應應那麼多家不同的客製需求，只能採最大化模式去做統計跟計算'
    },
    {
      active: false,
      disabled: false,
      name: '飲品客製需求該如何處理？',
      content: '基本上就是直接在備註註記了'
    },
    {
      active: false,
      disabled: false,
      name: '甜度跟冰量沒有我要的選項？',
      content: '基本上都是根據店家的菜單上輸入的，如果真的不符合需求，請在備註說明吧'
    },
    {
      active: false,
      disabled: true,
      name: '訂購密碼是什麼？',
      content: '如果你訂購後想要刪除或是後悔訂購，則您需要透過該組密碼來刪除，一來也是為了防止他人誤刪您的訂單'
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
      content: '目前無法透過其他查詢方式，唯獨透過專屬的訂飲料網址時，直接點選上方選單訂購統計，即可查看'
    },
    {
      active: false,
      disabled: false,
      name: '訂購完的訂單要如何處理？',
      content: '基本上就可以不用理他了，下次要訂的時候再開一個新的問卷即可'
    }
  ];

  ngOnInit() {
  }

}
