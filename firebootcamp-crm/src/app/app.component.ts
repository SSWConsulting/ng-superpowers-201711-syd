import { Component } from '@angular/core';
import { environment } from "../environments/environment";
import { OnInit } from '@angular/core';

@Component({
  selector: 'fbc-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'hello Sydney';
  prodMode : boolean;

  onChange() {
    console.log('CHANGED!!');
  }

  ngOnInit(): void {
    this.prodMode = environment.production;
  }
}
