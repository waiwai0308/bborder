import { Component,Input,OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @Input() OutData;
  title = 'app';

  ngOnInit(){

  }
}
