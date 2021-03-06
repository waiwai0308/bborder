import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent{

  @Input() headerID;

  localID;

  constructor() { 
    if(sessionStorage.getItem("keyID")){
      this.localID = sessionStorage.getItem("keyID");
    }
  }

}
