import { Component } from '@angular/core';
import {SharedService} from "./app.shared";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [SharedService]
})
export class AppComponent {
  selectedTab:number=1;
}
